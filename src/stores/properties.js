import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { propertiesData } from '@/data/properties'

export const usePropertiesStore = defineStore('properties', () => {
  // State
  const allProperties = ref(propertiesData)
  const selectedProperty = ref(null)
  const filters = ref({
    city: '',
    minPrice: null,
    maxPrice: null,
    bedrooms: null
  })

  // Getters
  const featuredProperties = computed(() => {
    return allProperties.value.filter(p => p.featured)
  })

  const filteredProperties = computed(() => {
    let result = allProperties.value

    if (filters.value.city) {
      result = result.filter(p => 
        p.city.toLowerCase().includes(filters.value.city.toLowerCase())
      )
    }

    if (filters.value.minPrice) {
      result = result.filter(p => p.price >= filters.value.minPrice)
    }

    if (filters.value.maxPrice) {
      result = result.filter(p => p.price <= filters.value.maxPrice)
    }

    if (filters.value.bedrooms) {
      result = result.filter(p => p.bedrooms >= filters.value.bedrooms)
    }

    return result
  })

  const propertiesCount = computed(() => filteredProperties.value.length)

  // Actions
  function getPropertyById(id) {
    selectedProperty.value = allProperties.value.find(p => p.id === id)
    return selectedProperty.value
  }

  function setFilter(key, value) {
    filters.value[key] = value
  }

  function resetFilters() {
    filters.value = {
      city: '',
      minPrice: null,
      maxPrice: null,
      bedrooms: null
    }
  }

  return {
    allProperties,
    selectedProperty,
    filters,
    featuredProperties,
    filteredProperties,
    propertiesCount,
    getPropertyById,
    setFilter,
    resetFilters
  }
})