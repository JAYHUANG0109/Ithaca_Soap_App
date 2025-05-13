import { ref, watch } from 'vue'

const STORAGE_KEY = 'favorites'

// initialize from localStorage (or empty array)
const favorites = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

// whenever favorites change, write back to localStorage
watch(favorites, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })

export function useFavorites() {
  // returns the reactive favorites list + toggler
  function toggleFavorite(id) {
    const i = favorites.value.indexOf(id)
    if (i === -1) favorites.value.push(id)
    else favorites.value.splice(i, 1)
  }
  function isFavorite(id) {
    return favorites.value.includes(id)
  }
  return { favorites, toggleFavorite, isFavorite }
}
