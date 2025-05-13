<script setup>
import { useCart } from '@/cart.js'
import {
   BContainer,
   BRow,
   BCol,
   BCard,
   BCardTitle,
   BButton,
   BFormInput,
   BFormGroup
 } from 'bootstrap-vue-next'

const { items, updateQuantity, removeItem, total } = useCart()
</script>

<template>
  <BContainer fluid class="py-4">
    <h3 class="mb-4">Your Cart</h3>

    <BRow v-if="items.length">
      <BCol v-for="item in items" :key="item.id + '-' + item.variant.size" cols="12" class="mb-3">
        <BCard>
          <BRow class="align-items-center">
            <!-- thumbnail -->
            <BCol cols="3">
              <img
                :src="`${baseDir}images/${item.images[0]}`"
                class="img-fluid rounded"
                alt="thumb"
              />
            </BCol>

            <!-- name / controls -->
            <BCol cols="6">
              <BCardTitle>{{ item.name }}</BCardTitle>
              <small>Size: {{ item.variant.size }} | ${{ item.variant.price.toFixed(2) }}</small>
            </BCol>

            <BCol cols="3">
              <BFormGroup label="Quantity" class="mb-0">
                <div class="d-flex justify-content-end align-items-center">
                  <BButton variant="outline-secondary" @click="updateQuantity(item, item.quantity - 1)">−</BButton>
                  <BFormInput
                    type="number"
                    v-model.number="item.quantity"
                    @change="updateQuantity(item, item.quantity)"
                    class="mx-2"
                    :min="1"
                    style="width:4rem;"
                  />
                  <BButton variant="outline-secondary" @click="updateQuantity(item, item.quantity + 1)">+</BButton>
                </div>
              </BFormGroup>
            </BCol>

            <!-- remove -->
            <BCol cols="12" class="text-end mt-2">
              <BButton variant="danger" size="sm" @click="removeItem(item)">
                Remove
              </BButton>
            </BCol>
          </BRow>
        </BCard>
      </BCol>

      <!-- total + checkout -->
      <BCol cols="12" class="text-end">
        <h5>Total: ${{ total.toFixed(2) }}</h5>
        <BButton variant="primary">Proceed to Checkout</BButton>
      </BCol>
    </BRow>

    <div v-else class="text-center text-muted py-5">
      Your cart is empty.
    </div>
  </BContainer>
</template>

<style scoped>
img {
  max-height: 80px;
}
</style>
