<script setup>
import { computed, onMounted, nextTick } from 'vue'
import {
  BContainer, BCard, BCardBody,
  BCardTitle, BCardText, BButton
} from 'bootstrap-vue-next'
import { useRouter, useRoute } from 'vue-router'
import { useCart } from '@/cart.js'

const router = useRouter()
const route = useRoute()
const { items, total, clearCart } = useCart()

const name = computed(() => route.query.name || '')
const address = computed(() => route.query.address || '')
const email = computed(() => route.query.email || '')

function continueShopping() {
  router.push('/products').then(() => {
    router.go(0)
  })
}

onMounted(async () => {
  clearCart()
  await nextTick()
})
</script>

<template>
  <BContainer class="py-3 d-flex justify-content-center">
    <BCard style="max-width: 500px; width: 100%;" class="shadow-sm">
      <BCardBody>
        <div class="text-center" style="font-size: 3rem;">🎉</div>
        <BCardTitle class="my-3 text-center">
          Thank You for Your Order, {{ name }}!
        </BCardTitle>

        <BCardText class="mb-4">
          We’ve received your order and it’s being processed.
          A confirmation has been sent to <strong>{{ email }}</strong> with
          shipping to <strong>{{ address }}</strong>.
        </BCardText>

        <BCardText class="fw-bold mb-2">Order Details:</BCardText>
        <ul class="list-unstyled mb-3">
          <li v-for="(item, i) in items" :key="i" class="d-flex justify-content-between">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.quantity * item.variant.price).toFixed(2) }}</span>
          </li>
        </ul>
        <div class="d-flex justify-content-between fw-bold mb-4">
          <span>Total:</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>

        <div class="text-center">
          <BButton variant="primary" @click="continueShopping">
            Continue Shopping
          </BButton>
        </div>
      </BCardBody>
    </BCard>
  </BContainer>
</template>

<style scoped>
ul {
  padding-left: 0;
}
</style>
