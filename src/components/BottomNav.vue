<script setup>
import { BNavbar, BNavbarNav, BNavItem } from 'bootstrap-vue-next'
import home from '../assets/home.png'
import catalog from '../assets/catalog.png'
import demos from '../assets/demo-icon.png'
import about from '../assets/about-icon.png'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <BNavbar fixed="bottom" type="light" variant="light" class="bottom-nav">
    <BNavbarNav class="w-100 d-flex justify-content-evenly text-center">
      <BNavItem :to="'/'">
        <div :class="{ 'icon-label-wrapper': true, 'active-tab': route.path === '/' }">
          <img :src="home" alt="Home" class="icon-img" />
          <p>Home</p>
        </div>
      </BNavItem>

      <BNavItem :to="'/products'">
        <div :class="{ 'icon-label-wrapper': true, 'active-tab': route.path === '/products' }">
          <img :src="catalog" alt="Catalog" class="icon-img" />
          <p>Products</p>
        </div>
      </BNavItem>

      <BNavItem :to="'/demos'">
        <div :class="{ 'icon-label-wrapper': true, 'active-tab': route.path === '/demos' }">
          <img :src="demos" alt="Demos" class="icon-img" />
          <p>Demos</p>
        </div>
      </BNavItem>

      <BNavItem :to="'/about'">
        <div :class="{ 'icon-label-wrapper': true, 'active-tab': route.path === '/about' }">
          <img :src="about" alt="About" class="icon-img" />
          <p>About</p>
        </div>
      </BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>

<style scoped>
.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  border-top: 1px solid #dee2e6;
  z-index: 1050;
}

.icon-label-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 6px;
  font-size: 0.75rem;
  width: 64px;
}

.icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.active-tab p {
  color: #0d6efd;
  font-weight: bold;
}

.active-tab img {
  filter: brightness(0) saturate(100%) invert(26%) sepia(94%) saturate(6581%) hue-rotate(202deg) brightness(95%) contrast(101%);
}
</style>
