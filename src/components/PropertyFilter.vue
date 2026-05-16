<template>
  <div class="filters">
    <div class="filter-group">
      <label>Ville</label>
      <input 
        type="text"
        v-model="localCity"
        placeholder="Rechercher une ville..."
        @input="applyFilters"
      >
    </div>
    
    <div class="filter-group">
      <label>Prix min (FCFA)</label>
      <input 
        type="number"
        v-model="localMinPrice"
        placeholder="Minimum"
        @input="applyFilters"
      >
    </div>
    
    <div class="filter-group">
      <label>Prix max (FCFA)</label>
      <input 
        type="number"
        v-model="localMaxPrice"
        placeholder="Maximum"
        @input="applyFilters"
      >
    </div>
    
    <div class="filter-group">
      <label>Chambres</label>
      <select v-model="localBedrooms" @change="applyFilters">
        <option :value="null">Tous</option>
        <option :value="1">1+</option>
        <option :value="2">2+</option>
        <option :value="3">3+</option>
        <option :value="4">4+</option>
      </select>
    </div>
    
    <button @click="clearFilters" class="clear-btn">
      Effacer les filtres
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePropertiesStore } from '@/stores/properties'

const propertiesStore = usePropertiesStore()

const localCity = ref(propertiesStore.filters.city)
const localMinPrice = ref(propertiesStore.filters.minPrice)
const localMaxPrice = ref(propertiesStore.filters.maxPrice)
const localBedrooms = ref(propertiesStore.filters.bedrooms)

const applyFilters = () => {
  propertiesStore.setFilter('city', localCity.value)
  propertiesStore.setFilter('minPrice', localMinPrice.value)
  propertiesStore.setFilter('maxPrice', localMaxPrice.value)
  propertiesStore.setFilter('bedrooms', localBedrooms.value)
}

const clearFilters = () => {
  localCity.value = ''
  localMinPrice.value = null
  localMaxPrice.value = null
  localBedrooms.value = null
  propertiesStore.resetFilters()
}
</script>

<style scoped>
.filters {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: flex-end;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.filter-group {
  flex: 1;
  min-width: 150px;
}

.filter-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
}

.filter-group input,
.filter-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.clear-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  height: 38px;
}

.clear-btn:hover {
  background: #c82333;
}
</style>