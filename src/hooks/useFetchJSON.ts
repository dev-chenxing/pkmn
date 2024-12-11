import { ref, watch } from "vue";

type FetchJSONResponse<T> =
  | { type: "pending" }
  | { type: "loading" }
  | { type: "done"; data: T };

export function useFetchJSON<T = unknown>(url: string): FetchJSONResponse<T> {
  const state = ref<FetchJSONResponse<T>>({
    type: "pending",
  });
  const attemptTime = ref(Date.now());

  watch([url, attemptTime], () => {
    async function load() {
      try {
        const resp = await fetch(url);
        const data: T = await resp.json();
        state.value = { type: "done", data }
      } catch (err) {

        console.warn(`Failed to download ${url}`, err);
        const retryDelay = 60 * 1000;
        // Retry every minute until the JSON finishes downloading
        setTimeout(() => {
          attemptTime.value = Date.now()
        }, retryDelay);
      }
    }
    if (url) {
      load();
    } else {
      state.value = { type: "pending" }
    }
  });

  return state.value as FetchJSONResponse<T>;
}
