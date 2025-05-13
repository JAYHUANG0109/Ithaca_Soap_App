<script setup>
import { BButton } from 'bootstrap-vue-next'
import cartIcon from '@/assets/cart.png'
import { computed } from 'vue'
import { useCart } from '@/cart.js'

const { items, openCart } = useCart()
const count = computed(() => {
  const list = items.value || []
  return list.reduce((sum, i) => sum + i.quantity, 0)
})
</script>

<template>
  <BButton variant="link" class="position-relative p-0" @click="openCart">
  <!-- Source: https://www.flaticon.com/free-icon/shopping-cart_3144456?term=shopping+cart&page=1&position=1&origin=search&related_id=3144456 -->
    <img :src="cartIcon" alt="Cart" width="35" />
    <span v-if="count" class="badge bg-primary position-absolute top-0 start-100 translate-middle">
      {{ count }}
    </span>
  </BButton>
</template>

<style scoped>
.badge { font-size: .7rem; }
</style>
