<template>
  <div class="property-card">
    <div class="property-image">
      <img :src="property.image" :alt="property.title" loading="lazy">
      <button 
        class="favorite-btn"
        @click="toggleFavorite"
        :class="{ 'favorite-active': isFav }"
      >
        {{ isFav ? '❤️' : '🤍' }}
      </button>
      <div class="badges">
        <span v-if="property.featured" class="featured-badge">
          ⭐ À la une
        </span>
        <span class="type-badge">{{ getTypeIcon(property.type) }} {{ getTypeLabel(property.type) }}</span>
      </div>
      <div class="image-overlay">
        <span class="view-gallery">🔍 Voir les photos</span>
      </div>
    </div>
    
    <div class="property-info">
      <h3>{{ property.title }}</h3>
      <p class="price">{{ formatPrice(property.price) }}</p>
      <p class="location">
        📍 {{ property.quartier }}, {{ property.city }}
      </p>
      
      <div class="features">
        <div class="feature-item" v-if="property.bedrooms > 0">
          <span class="feature-icon">🛏️</span>
          <span>{{ property.bedrooms }} ch.</span>
        </div>
        <div class="feature-item" v-if="property.bathrooms > 0">
          <span class="feature-icon">🛁</span>
          <span>{{ property.bathrooms }} sdb</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">📐</span>
          <span>{{ property.area }} m²</span>
        </div>
      </div>
      
      <p class="description">{{ truncateText(property.description, 85) }}</p>
      
      <router-link 
        :to="`/property/${property.id}`"
        class="details-btn"
      >
        Voir les détails →
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

const favoritesStore = useFavoritesStore()
const isFav = computed(() => favoritesStore.isFavorite(props.property.id))

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const getTypeIcon = (type) => {
  const icons = {
    appartement: '🏢',
    villa: '🏠',
    terrain: '🌳',
    studio: '🏠',
    duplex: '🏘️',
    maison: '🏡',
    commercial: '🏪'
  }
  return icons[type] || '🏠'
}

const getTypeLabel = (type) => {
  const labels = {
    appartement: 'Appartement',
    villa: 'Villa',
    terrain: 'Terrain',
    studio: 'Studio',
    duplex: 'Duplex',
    maison: 'Maison',
    commercial: 'Commercial'
  }
  return labels[type] || type
}

const truncateText = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.property.id)
}
</script>

<style scoped>
.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.property-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  cursor: pointer;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.property-card:hover .property-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  padding: 15px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.property-card:hover .image-overlay {
  transform: translateY(0);
}

.view-gallery {
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.favorite-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: all 0.2s;
  z-index: 2;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-active {
  background: #ff4757;
  color: white;
}

.badges {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  gap: 8px;
  z-index: 2;
}

.featured-badge {
  background: #ffd700;
  color: #333;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.type-badge {
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  backdrop-filter: blur(5px);
}

.property-info {
  padding: 20px;
}

.property-info h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #2c3e50;
  font-weight: 600;
  line-height: 1.4;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
  margin: 10px 0;
}

.location {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.features {
  display: flex;
  gap: 20px;
  margin: 15px 0;
  padding: 12px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 14px;
}

.feature-icon {
  font-size: 16px;
}

.description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 0;
}

.details-btn {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 15px;
  width: 100%;
  text-align: center;
  transition: all 0.2s;
  font-weight: 500;
}

.details-btn:hover {
  background: #359268;
  transform: translateX(5px);
}

/* Mode sombre */
.dark .property-card {
  background: #2c3e50;
}

.dark .property-info h3 {
  color: white;
}

.dark .location,
.dark .features,
.dark .description {
  color: #bdc3c7;
}

.dark .features {
  border-color: #34495e;
}
</style>