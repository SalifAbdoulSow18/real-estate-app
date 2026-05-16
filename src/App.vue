<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          🏠 ImmoApp Sénégal
        </router-link>
        
        <div class="nav-links">
          <router-link to="/">Accueil</router-link>
          <router-link to="/properties">Propriétés</router-link>
          <div class="favorites-badge">
            <router-link to="/favorites">
              ❤️ Favoris
              <span class="badge" v-if="favoritesCount > 0">
                {{ favoritesCount }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    
    <router-view />
    
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>ImmoApp Sénégal</h4>
          <p>Votre partenaire immobilier de confiance</p>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <p>📞 78 420 38 78</p>
          <p>✉️ abdoulsalifsow06@gmail.com</p>
        </div>
        <div class="footer-section">
          <h4>Suivez-nous</h4>
          <p>Facebook | Instagram | LinkedIn</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 ImmoApp Sénégal. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from './stores/favorites'

const favoritesStore = useFavoritesStore()
const favoritesCount = computed(() => favoritesStore.favoritesCount)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
}

.navbar {
  background: #2c3e50;
  color: white;
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: opacity 0.2s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.favorites-badge {
  position: relative;
}

.badge {
  position: absolute;
  top: -10px;
  right: -20px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
}

.footer {
  background: #2c3e50;
  color: white;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.footer-section h4 {
  margin-bottom: 15px;
  font-size: 18px;
}

.footer-section p {
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
}

.footer-bottom {
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
  font-size: 14px;
}
</style>