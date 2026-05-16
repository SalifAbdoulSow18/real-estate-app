<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>🏠 ImmoApp Sénégal</h1>
        <p>La référence de l'immobilier au Sénégal</p>
        <p class="subtitle">Achetez, vendez ou louez votre bien en toute confiance</p>
        <router-link to="/properties" class="cta-btn">
          Découvrir nos biens →
        </router-link>
      </div>
    </div>
    
    <div class="stats">
      <div class="stat-item">
        <div class="stat-number">{{ propertiesStore.allProperties.length }}+</div>
        <div class="stat-label">Biens disponibles</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">6</div>
        <div class="stat-label">Villes couvertes</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">24/7</div>
        <div class="stat-label">Service client</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">98%</div>
        <div class="stat-label">Satisfaction client</div>
      </div>
    </div>
    
    <div class="container">
      <div class="section-header">
        <h2>🔥 Biens à la une</h2>
        <p>Découvrez nos meilleures offres du moment</p>
      </div>
      
      <PropertyList :properties="featuredProperties" />
      
      <div class="see-all">
        <router-link to="/properties" class="see-all-btn">
          Voir tous nos biens →
        </router-link>
      </div>
    </div>
    
    <div class="features-section">
      <div class="container">
        <h2>Pourquoi choisir ImmoApp ?</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">🔒</div>
            <h3>Sécurisé</h3>
            <p>Transactions sécurisées et transparentes</p>
          </div>
          <div class="feature">
            <div class="feature-icon">⚡</div>
            <h3>Rapide</h3>
            <p>Trouvez votre bien en quelques clics</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🤝</div>
            <h3>Fiable</h3>
            <p>Des professionnels à votre service</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📍</div>
            <h3>Local</h3>
            <p>Expertise du marché sénégalais</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePropertiesStore } from '@/stores/properties'
import PropertyList from '@/components/PropertyList.vue'

const propertiesStore = usePropertiesStore()
const featuredProperties = computed(() => propertiesStore.featuredProperties)
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%);
  color: white;
  text-align: center;
  padding: 100px 20px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=600') center/cover;
  opacity: 0.1;
  pointer-events: none;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 56px;
  margin-bottom: 20px;
  font-weight: bold;
}

.hero p {
  font-size: 20px;
  margin-bottom: 10px;
  opacity: 0.95;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 30px;
}

.cta-btn {
  display: inline-block;
  background: white;
  color: #42b983;
  padding: 14px 35px;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  margin-top: 20px;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  padding: 40px 20px;
  background: white;
  margin-top: -30px;
  position: relative;
  z-index: 2;
  border-radius: 20px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: bold;
  color: #42b983;
}

.stat-label {
  color: #666;
  margin-top: 5px;
}

.container {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 36px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.section-header p {
  color: #666;
  font-size: 18px;
}

.see-all {
  text-align: center;
  margin-top: 40px;
}

.see-all-btn {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 12px 30px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.2s;
}

.see-all-btn:hover {
  background: #359268;
  transform: translateX(5px);
}

.features-section {
  background: white;
  padding: 60px 0;
  margin-top: 40px;
}

.features-section h2 {
  text-align: center;
  font-size: 36px;
  color: #2c3e50;
  margin-bottom: 50px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  text-align: center;
}

.feature {
  padding: 30px;
  transition: transform 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.feature p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 36px;
  }
  
  .hero p {
    font-size: 16px;
  }
  
  .stats {
    gap: 30px;
    margin: -20px 20px 0;
    flex-wrap: wrap;
  }
  
  .stat-number {
    font-size: 28px;
  }
  
  .section-header h2 {
    font-size: 28px;
  }
  
  .features-grid {
    gap: 20px;
  }
}
</style>