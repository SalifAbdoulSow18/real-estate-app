import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])

  const isFavorite = computed(() => {
    return (propertyId) => favorites.value.includes(propertyId)
  })

  const favoritesCount = computed(() => favorites.value.length)

  function addToFavorites(propertyId) {
    if (!favorites.value.includes(propertyId)) {
      favorites.value.push(propertyId)
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }
  }

  function removeFromFavorites(propertyId) {
    favorites.value = favorites.value.filter(id => id !== propertyId)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function toggleFavorite(propertyId) {
    if (isFavorite.value(propertyId)) {
      removeFromFavorites(propertyId)
    } else {
      addToFavorites(propertyId)
    }
  }

  function loadFavorites() {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      favorites.value = JSON.parse(saved)
    }
  }

  loadFavorites()

  return {
    favorites,
    favoritesCount,
    isFavorite,
    toggleFavorite
  }
})