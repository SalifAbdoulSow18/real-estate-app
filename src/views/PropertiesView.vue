<template>
  <div class="properties-page">
    <div class="container">
      <h1>Nos propriétés</h1>
      <p class="count">{{ propertiesStore.propertiesCount }} bien(s) trouvé(s)</p>
      
      <PropertyFilter />
      <PropertyList :properties="propertiesStore.filteredProperties" />
    </div>
  </div>
</template>

<script setup>
import { usePropertiesStore } from '@/stores/properties'
import PropertyFilter from '@/components/PropertyFilter.vue'
import PropertyList from '@/components/PropertyList.vue'

const propertiesStore = usePropertiesStore()
</script>

<style scoped>
.properties-page {
  min-height: 100vh;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 36px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.count {
  color: #666;
  margin-bottom: 20px;
}
</style>