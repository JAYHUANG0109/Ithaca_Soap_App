<script setup>
import { RouterView, useRouter, useRoute } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { BContainer, BButton } from 'bootstrap-vue-next'
import BottomNav from './components/BottomNav.vue'
import CartIcon from './components/CartIcon.vue'
import CartModal from './components/CartModal.vue'
import Search from './components/search.vue'


const headerRef = ref(null)
const headerHeight = ref(0)

function updateHeader() {
  headerHeight.value = headerRef.value?.offsetHeight || 0
}

function handleResize() {
  updateHeader()
}

onMounted(async () => {
  await nextTick()
  updateHeader()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const router = useRouter()
const route = useRoute()

const goBack = () => {
  router.back()
}

const cartModalRef = ref(null)
const openCartModal = () => {
  cartModalRef.value?.open()
}
const enteredTerm = ref('')

function onSearch() {
  const q = enteredTerm.value.trim()
  router.push({ name: 'products', query: { q } })
}
</script>

<template>
  <div class="app-wrapper">
    <!-- Header -->
    <div ref="headerRef" class="fixed-top bg-white shadow-sm" style="z-index: 1040; width: 100%;">
      <div class="d-flex justify-content-between align-items-center px-3 py-2">
        <div>
          <BButton v-if="route.name === 'individual'" variant="link" @click="goBack" class="p-0 me-3">
            <img src="@/assets/left-arrow.png" alt="Back" class="img-fluid" style="max-width: 24px;" />
          </BButton>
        </div>
        <Search v-model="enteredTerm" placeholder="Search for Products" @search="onSearch" />
        <CartIcon @click="openCartModal" />
      </div>
    </div>

    <!-- Spacer for header -->
    <div :style="{ height: headerHeight + 'px' }"></div>

    <!-- Main content -->
    <BContainer fluid class="flex-grow-1 px-3 pb-5">
      <RouterView />
    </BContainer>

    <!-- Bottom navigation -->
    <BottomNav />

    <!-- Cart modal -->
    <CartModal ref="cartModalRef" />
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #f8f9fa;
}

/* Optional media tweaks */
@media (max-width: 375px) {
  .px-3 {
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
  }

  .icon-img {
    width: 22px;
    height: 22px;
  }

  .icon-label-wrapper {
    width: 56px;
    font-size: 0.7rem;
  }
}
</style>
