export const PokeTypes = {
  'normal': {
    label: 'NORMAL',
    color: '#A8A878'
  },
  'fighting': {
    label: 'FIGHT',
    color: '#C03028'
  },
  'flying': {
    label: 'FLYING',
    color: '#A890F0'
  },
  'poison': {
    label: 'POISON',
    color: '#A040A0'
  },
  'ground': {
    label: 'GROUND',
    color: '#E0C068'
  },
  'rock': {
    label: 'ROCK',
    color: '#B8A038'
  },
  'bug': {
    label: 'BUG',
    color: '#A8B820'
  },
  'ghost': {
    label: 'GHOST',
    color: '#705898'
  },
  'steel': {
    label: 'STEEL',
    color: '#B8B8D0'
  },
  // 'mystery': {
  //   label: '???',
  //   color: "#68A090"
  // },
  'fire': {
    label: 'FIRE',
    color: '#F08030'
  },
  'water': {
    label: 'WATER',
    color: '#6890F0'
  },
  'grass': {
    label: 'GRASS',
    color: '#78C850'
  },
  'electric': {
    label: 'ELECTR',
    color: '#F8D030'
  },
  'psychic': {
    label: 'PSYCHC',
    color: '#F85888'
  },
  'ice': {
    label: 'ICE',
    color: '#98D8D8'
  },
  'dragon': {
    label: 'DRAGON',
    color: '#7038F8'
  },
  'dark': {
    label: 'DARK',
    color: '#705848'
  }
}

const PokeTypeMul = {
  NoEffect: 0,
  NotEffective: 0.5,
  SuperEffective: 2
}

export const PokeTypeEffectives = {
  'normal': {
    'rock': PokeTypeMul.NotEffective,
    'steel': PokeTypeMul.NotEffective,
    'ghost': PokeTypeMul.NoEffect
  },
  'fire': {
    'fire': PokeTypeMul.NotEffective,
    'water': PokeTypeMul.NotEffective,
    'grass': PokeTypeMul.SuperEffective,
    'ice': PokeTypeMul.SuperEffective,
    'bug': PokeTypeMul.SuperEffective,
    'rock': PokeTypeMul.NotEffective,
    'dragon': PokeTypeMul.NotEffective,
    'steel': PokeTypeMul.SuperEffective,
  },
  'water': {
    'fire': PokeTypeMul.SuperEffective,
    'water': PokeTypeMul.NotEffective,
    'grass': PokeTypeMul.NotEffective,
    'ground': PokeTypeMul.SuperEffective,
    'rock': PokeTypeMul.SuperEffective,
    'dragon': PokeTypeMul.NotEffective,
  },
  'electric': {
    'water': PokeTypeMul.SuperEffective,
    'electric': PokeTypeMul.NotEffective,
    'grass': PokeTypeMul.NotEffective,
    'ground': PokeTypeMul.NoEffect,
    'flying': PokeTypeMul.SuperEffective,
    'dragon': PokeTypeMul.NotEffective,
  },
  'grass': {
    'fire': PokeTypeMul.NotEffective,
    'water': PokeTypeMul.SuperEffective,
    'grass': PokeTypeMul.NotEffective,
    'poison': PokeTypeMul.NotEffective,
    'ground': PokeTypeMul.SuperEffective,
    'flying': PokeTypeMul.NotEffective,
    'bug': PokeTypeMul.NotEffective,
    'rock': PokeTypeMul.SuperEffective,
    'dragon': PokeTypeMul.NotEffective,
    'steel': PokeTypeMul.NotEffective,
  },
  'ice': {
    'water': PokeTypeMul.NotEffective,
    'grass': PokeTypeMul.SuperEffective,
    'ice': PokeTypeMul.NotEffective,
    'ground': PokeTypeMul.SuperEffective,
    'flying': PokeTypeMul.SuperEffective,
    'dragon': PokeTypeMul.SuperEffective,
    'steel': PokeTypeMul.NotEffective,
    'fire': PokeTypeMul.NotEffective,
  },
  'fighting': {
    'normal': PokeTypeMul.SuperEffective,
    'ice': PokeTypeMul.SuperEffective,
    'poison': PokeTypeMul.NotEffective,
    'flying': PokeTypeMul.NotEffective,
    'psychic': PokeTypeMul.NotEffective,
    'bug': PokeTypeMul.NotEffective,
    'rock': PokeTypeMul.SuperEffective,
    'dark': PokeTypeMul.SuperEffective,
    'steel': PokeTypeMul.SuperEffective,
    'ghost': PokeTypeMul.NoEffect
  },
  'poison': {
    'grass': PokeTypeMul.SuperEffective,
    'poison': PokeTypeMul.NotEffective,
    'ground': PokeTypeMul.NotEffective,
    'rock': PokeTypeMul.NotEffective,
    'ghost': PokeTypeMul.NotEffective,
    'steel': PokeTypeMul.NoEffect
  },
  'ground': {
    'fire': PokeTypeMul.SuperEffective,
    'electric': PokeTypeMul.SuperEffective,
    'grass': PokeTypeMul.NotEffective,
    'poison': PokeTypeMul.SuperEffective,
    'flying': PokeTypeMul.NoEffect,
    'bug': PokeTypeMul.NotEffective,
    'rock': PokeTypeMul.SuperEffective,
    'steel': PokeTypeMul.SuperEffective
  },
  'flying': {
    'electric': PokeTypeMul.NotEffective,
    'grass': PokeTypeMul.SuperEffective,
    'fighting': PokeTypeMul.SuperEffective,
    'bug': PokeTypeMul.SuperEffective,
    'rock': PokeTypeMul.NotEffective,
    'steel': PokeTypeMul.NotEffective
  },
  'psychic': {
    'fighting': PokeTypeMul.SuperEffective,
    'poison': PokeTypeMul.SuperEffective,
    'psychic': PokeTypeMul.NotEffective,
    'dark': PokeTypeMul.NoEffect,
    'steel': PokeTypeMul.NotEffective
  },
  'bug': {
    'fire': PokeTypeMul.NotEffective,
    'grass': PokeTypeMul.SuperEffective,
    'fighting': PokeTypeMul.NotEffective,
    'poison': PokeTypeMul.NotEffective,
    'flying': PokeTypeMul.NotEffective,
    'psychic': PokeTypeMul.SuperEffective,
    'ghost': PokeTypeMul.NotEffective,
    'dark': PokeTypeMul.SuperEffective,
    'steel': PokeTypeMul.NotEffective
  },
  'rock': {
    'fire': PokeTypeMul.SuperEffective,
    'ice': PokeTypeMul.SuperEffective,
    'fighting': PokeTypeMul.NotEffective,
    'ground': PokeTypeMul.NotEffective,
    'flying': PokeTypeMul.SuperEffective,
    'bug': PokeTypeMul.SuperEffective,
    'steel': PokeTypeMul.NotEffective
  },
  'ghost': {
    'normal': PokeTypeMul.NoEffect,
    'psychic': PokeTypeMul.SuperEffective,
    'dark': PokeTypeMul.NotEffective,
    'steel': PokeTypeMul.NotEffective,
    'ghost': PokeTypeMul.SuperEffective
  },
  'dragon': {
    'dragon': PokeTypeMul.SuperEffective,
    'steel': PokeTypeMul.NotEffective,
  },
  'dark': {
    'fighting': PokeTypeMul.NotEffective,
    'psychic': PokeTypeMul.SuperEffective,
    'ghost': PokeTypeMul.SuperEffective,
    'dark': PokeTypeMul.NotEffective,
    'steel': PokeTypeMul.NotEffective,
  },
  'steel': {
    'fire': PokeTypeMul.NotEffective,
    'water': PokeTypeMul.NotEffective,
    'electric': PokeTypeMul.NotEffective,
    'ice': PokeTypeMul.SuperEffective,
    'rock': PokeTypeMul.SuperEffective,
    'steel': PokeTypeMul.NotEffective,
  }
}
