<script setup>
import { BContainer, BRow, BCol, BCard, BButton, BCardText, BCardTitle } from 'bootstrap-vue-next'
import Search from '@/components/search.vue'
import CartIcon from '@/components/CartIcon.vue'

const baseDir = import.meta.env.BASE_URL
</script>

<template>
  <BContainer class="p-3 pb-5">
    <BRow class="mb-3">
      <BCol cols="12">
        <BCard class="bg-light-subtle px-1 py-4 rounded">
          <BRow class="mb-3">
            <BCol cols="12" class="text-center">
              <BCardTitle class="fw-bold">
                This Week: 🧼 Buy 2, Get 1 Free
              </BCardTitle>
              <BCardText class="small text-muted">
                Every bar is handmade with care and keeps one plastic bottle out of the landfill. Suds with a cause.
              </BCardText>
              <BButton :to="{ name: 'products', query: { category: 'Bar Soap' } }" variant="secondary">
                → Browse Bar Soaps
              </BButton>
            </BCol>
          </BRow>

          <BRow class="gx-3 gy-3">
            <!-- Favorites -->
            <BCol cols="6">
              <BCard tag="router-link" :to="{ name: 'products', query: { category: 'Favorites' } }" class="text-center h-100 text-decoration-none" body-class="d-flex flex-column justify-content-center">
                <BCardTitle class="fw-semibold">❤️ Refill on Your Favorites</BCardTitle>
                <BCardText class="small text-muted">
                  Quick restocks of your most-loved soaps and past orders. One tap to refill your faves.
                </BCardText>
              </BCard>
            </BCol>

            <!-- Best Sellers -->
            <BCol cols="6">
              <BCard tag="router-link" :to="'/products'" class="text-center h-100 text-decoration-none" body-class="d-flex flex-column justify-content-center">
                <BCardTitle class="fw-semibold">⭐ Shop Our Best Sellers</BCardTitle>
                <BCardText class="small text-muted">
                  Our most-loved soaps, scrubs, and bundles — always in high demand and never in stock for long.
                </BCardText>
              </BCard>
            </BCol>

            <!-- Shop All Products button -->
            <BCol cols="12" class="text-center mt-2">
              <BButton :to="'/products'" variant="primary" class="fw-semibold w-100 mt-2">
                Shop All Products 🛍️
              </BButton>
            </BCol>
          </BRow>
        </BCard>
      </BCol>
    </BRow>

    <!-- Mission Statement -->
    <BCard class="text-center py-2 mb-3">
      <BCardText class="small text-muted mb-1">
        “One date, one batch of soap, and one wild ride.”
      </BCardText>
      <BCardText class="small text-muted">
        – Wendy & Andy, Co-Founders
      </BCardText>
    </BCard>

    <!-- Demos & About -->
    <BRow class="mb-4">
      <BCol>
        <BCard tag="router-link" :to="'/demos'" class="text-center h-100 text-decoration-none" body-class="d-flex flex-column justify-content-center">
          <BCardTitle class="fw-semibold">🎥 NEW: How-To Demos</BCardTitle>
          <BCardText class="small text-muted">
            Ever wondered how to use our concentrates? Quick video guides.
          </BCardText>
        </BCard>
      </BCol>

      <BCol>
        <BCard tag="router-link" :to="'/about'" class="text-center h-100 text-decoration-none" body-class="d-flex flex-column justify-content-center">
          <BCardTitle class="fw-semibold">ℹ️ About Us</BCardTitle>
          <BCardText class="small text-muted">
            Store-bought soap isn’t made like this. Learn why Ithaca Soap uses real ingredients — and real care.
          </BCardText>
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
</template>
