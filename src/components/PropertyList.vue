<template>
  <div v-if="properties.length === 0" class="empty-state">
    <p>Aucune propriété trouvée</p>
  </div>
  
  <div v-else class="property-grid">
    <PropertyCard
      v-for="property in properties"
      :key="property.id"
      :property="property"
    />
  </div>
</template>

<script setup>
import PropertyCard from './PropertyCard.vue'

defineProps({
  properties: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.empty-state {
  text-align: center;
  padding: 50px;
  color: #666;
}
</style>