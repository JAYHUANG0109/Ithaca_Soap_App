import { ref, watch } from 'vue'

let installId = localStorage.getItem('installId')
if (!installId) {
  installId = Math.random().toString(36).slice(2)
  localStorage.setItem('installId', installId)
}

const STORAGE_KEY = `favorites_${installId}`

const favorites = ref(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
)

watch(
  favorites,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true }
)

export function useFavorites() {
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
