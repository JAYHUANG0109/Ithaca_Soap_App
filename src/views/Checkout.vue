<script setup>
import { ref, computed } from 'vue'
import {
  BContainer, BRow, BCol, BCard, BCardTitle, BCardText,
  BFormInput, BFormGroup, BButton
} from 'bootstrap-vue-next'
import { useRouter } from 'vue-router'
import { useCart } from '@/cart.js'

const router = useRouter()
const { items, total, openCart, confirmCart } = useCart()

const formattedTotal = computed(() => total.value.toFixed(2))

const name = ref('')
const address = ref('')
const email = ref('')


function placeOrder() {
  items.value.splice(0)
  confirmCart()
  router.push({
    name: 'confirmation',
    query: {
      name: name.value,
      address: address.value,
      email: email.value
    }
  })
}
</script>

<template>
  <BContainer class="py-2">
    <h3 class="mb-4 text-center">Checkout</h3>

    <BCard class="mb-4">
      <BCardTitle class="px-3 pt-3">Order Summary</BCardTitle>
      <BCardText class="px-3">
        <ul class="list-unstyled mb-0">
          <li v-for="(item, i) in items" :key="i" class="d-flex justify-content-between mb-1">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.quantity * item.variant.price).toFixed(2) }}</span>
          </li>
        </ul>
      </BCardText>
      <hr class="my-0" />
      <div class="d-flex justify-content-between px-3 py-2 fw-bold">
        <span>Total:</span>
        <span>${{ formattedTotal }}</span>
      </div>
    </BCard>

    <BCard class="p-3">
      <BCardTitle class="mb-3">Shipping Details</BCardTitle>

      <BFormGroup label="Full Name">
        <BFormInput v-model="name" placeholder="Enter your full name" />
      </BFormGroup>

      <BFormGroup label="Shipping Address" class="mt-3">
        <BFormInput v-model="address" placeholder="Enter your address" />
      </BFormGroup>

      <BFormGroup label="Email Address" class="mt-3">
        <BFormInput v-model="email" type="email" placeholder="Enter your email" />
      </BFormGroup>

      <div class="text-end mt-4">
        <BButton variant="success" class="w-100" :disabled="!name || !address || !email" @click="placeOrder">
          Place Order
        </BButton>
      </div>
    </BCard>
  </BContainer>
</template>

<style scoped>
ul {
  padding-left: 0;
}
</style>
