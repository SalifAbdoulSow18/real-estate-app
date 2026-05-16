<template>
  <div class="detail-page" v-if="property">
    <div class="container">
      <!-- Galerie d'images -->
      <div class="gallery-section">
        <div class="main-image">
          <img :src="currentImage" :alt="property.title">
          <div class="gallery-nav" v-if="property.images && property.images.length > 1">
            <button @click="prevImage" class="nav-btn prev">❮</button>
            <button @click="nextImage" class="nav-btn next">❯</button>
          </div>
        </div>
        <div class="thumbnails" v-if="property.images && property.images.length > 1">
          <div 
            v-for="(img, index) in property.images" 
            :key="index"
            class="thumbnail"
            :class="{ active: currentImage === img }"
            @click="currentImage = img"
          >
            <img :src="img" :alt="`Photo ${index + 1}`">
          </div>
        </div>
      </div>
      
      <div class="detail-content">
        <div class="detail-info">
          <div class="header">
            <h1>{{ property.title }}</h1>
            <button 
              @click="toggleFavorite"
              class="favorite-action"
              :class="{ active: isFav }"
            >
              {{ isFav ? '❤️ Retirer des favoris' : '🤍 Ajouter aux favoris' }}
            </button>
          </div>
          
          <p class="price">{{ formatPrice(property.price) }}</p>
          <p class="location">
            📍 {{ property.address }}
          </p>
          
          <div class="features-detail">
            <div class="feature-card">
              <span class="feature-icon">🏠</span>
              <div>
                <strong>Type de bien</strong>
                <span>{{ getTypeLabel(property.type) }}</span>
              </div>
            </div>
            <div class="feature-card" v-if="property.bedrooms > 0">
              <span class="feature-icon">🛏️</span>
              <div>
                <strong>Chambres</strong>
                <span>{{ property.bedrooms }}</span>
              </div>
            </div>
            <div class="feature-card" v-if="property.bathrooms > 0">
              <span class="feature-icon">🛁</span>
              <div>
                <strong>Salles de bain</strong>
                <span>{{ property.bathrooms }}</span>
              </div>
            </div>
            <div class="feature-card">
              <span class="feature-icon">📐</span>
              <div>
                <strong>Surface</strong>
                <span>{{ property.area }} m²</span>
              </div>
            </div>
            <div class="feature-card">
              <span class="feature-icon">📍</span>
              <div>
                <strong>Quartier</strong>
                <span>{{ property.quartier }}</span>
              </div>
            </div>
            <div class="feature-card">
              <span class="feature-icon">🏙️</span>
              <div>
                <strong>Ville</strong>
                <span>{{ property.city }}</span>
              </div>
            </div>
          </div>
          
          <div class="description">
            <h3>📝 Description détaillée</h3>
            <p>{{ property.description }}</p>
          </div>
          
          <div class="contact-section">
            <h3>📞 Intéressé par ce bien ?</h3>
            <p>Contactez notre agence pour une visite</p>
            <div class="contact-buttons">
              <a href="tel:+221784203878" class="contact-btn phone">
                📱 Appeler : 78 420 38 78
              </a>
              <a href="https://wa.me/221784203878" class="contact-btn whatsapp">
                💬 WhatsApp
              </a>
              <a href="mailto:abdoulsalifsow06@gmail.com" class="contact-btn email">
                ✉️ Email
              </a>
            </div>
          </div>
          
          <div class="actions">
            <router-link to="/properties" class="back-btn">
              ← Retour à la liste des biens
            </router-link>
            <button class="share-btn" @click="shareProperty">
              📤 Partager ce bien
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="loading">
    <div class="spinner"></div>
    <p>Chargement du bien...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePropertiesStore } from '@/stores/properties'
import { useFavoritesStore } from '@/stores/favorites'

const route = useRoute()
const propertiesStore = usePropertiesStore()
const favoritesStore = useFavoritesStore()

const property = computed(() => propertiesStore.selectedProperty)
const isFav = computed(() => favoritesStore.isFavorite(route.params.id))

// Gestion de la galerie
const currentImage = ref('')

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(price)
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

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(property.value.id)
}

const prevImage = () => {
  if (property.value.images) {
    const currentIndex = property.value.images.indexOf(currentImage.value)
    const prevIndex = currentIndex === 0 ? property.value.images.length - 1 : currentIndex - 1
    currentImage.value = property.value.images[prevIndex]
  }
}

const nextImage = () => {
  if (property.value.images) {
    const currentIndex = property.value.images.indexOf(currentImage.value)
    const nextIndex = currentIndex === property.value.images.length - 1 ? 0 : currentIndex + 1
    currentImage.value = property.value.images[nextIndex]
  }
}

const shareProperty = () => {
  if (navigator.share) {
    navigator.share({
      title: property.value.title,
      text: property.value.description,
      url: window.location.href
    })
  } else {
    alert('Copiez le lien pour partager : ' + window.location.href)
  }
}

onMounted(() => {
  const id = parseInt(route.params.id)
  propertiesStore.getPropertyById(id)
  if (property.value && property.value.images) {
    currentImage.value = property.value.images[0]
  }
})
</script>

<style scoped>
.detail-page {
  padding: 40px 0;
  background: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Galerie */
.gallery-section {
  margin-bottom: 30px;
}

.main-image {
  position: relative;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.nav-btn {
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: rgba(0,0,0,0.8);
  transform: scale(1.1);
}

.thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  overflow-x: auto;
  padding: 5px;
}

.thumbnail {
  width: 80px;
  height: 60px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail.active {
  border: 2px solid #42b983;
  transform: scale(1.05);
}

/* Contenu */
.detail-content {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.detail-info {
  padding: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 32px;
  color: #2c3e50;
  margin: 0;
}

.favorite-action {
  background: white;
  border: 2px solid #ff4757;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
  color: #ff4757;
  font-weight: 500;
}

.favorite-action.active {
  background: #ff4757;
  color: white;
}

.price {
  font-size: 40px;
  font-weight: bold;
  color: #42b983;
  margin: 20px 0;
}

.location {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.features-detail {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 32px;
}

.feature-card div {
  display: flex;
  flex-direction: column;
}

.feature-card strong {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.feature-card span:last-child {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.description {
  margin: 30px 0;
}

.description h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.description p {
  line-height: 1.8;
  color: #666;
  font-size: 16px;
}

.contact-section {
  margin: 40px 0;
  padding: 30px;
  background: linear-gradient(135deg, #42b983 0%, #359268 100%);
  border-radius: 12px;
  color: white;
}

.contact-section h3 {
  margin-bottom: 10px;
  font-size: 24px;
}

.contact-section p {
  margin-bottom: 20px;
  opacity: 0.9;
}

.contact-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.contact-btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.contact-btn:hover {
  transform: translateY(-2px);
}

.phone {
  background: white;
  color: #42b983;
}

.whatsapp {
  background: #25D366;
  color: white;
}

.email {
  background: #3498db;
  color: white;
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.back-btn {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.back-btn:hover {
  color: #359268;
}

.share-btn {
  background: none;
  border: 1px solid #42b983;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  color: #42b983;
  font-weight: 500;
  transition: all 0.2s;
}

.share-btn:hover {
  background: #42b983;
  color: white;
}

.loading {
  text-align: center;
  padding: 100px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .main-image {
    height: 300px;
  }
  
  .detail-info {
    padding: 20px;
  }
  
  .header h1 {
    font-size: 24px;
  }
  
  .price {
    font-size: 28px;
  }
  
  .features-detail {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
    gap: 15px;
  }
  
  .thumbnails {
    gap: 5px;
  }
  
  .thumbnail {
    width: 60px;
    height: 45px;
  }
}
</style>