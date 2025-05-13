<template>
  <BContainer fluid class="py-4 pb-5">
    <div v-if="product">

      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1 class="m-0">{{ product.name }}</h1>
        <img
          :src="isFavorite(product.id) ? saveSolid : saveBlank"
          class="favorite-icon"
          @click.stop="toggleFavorite(product.id)"
          alt="save"
          width="24" height="24"
        />
      </div>
      <BRow>
        <!-- image / carousel column -->
        <BCol cols="12" md="6" class="mb-4 mx-auto">
          <BCarousel
            :interval="0"
            controls
            indicators
            img-width=100
            img-height=auto
            justify-content="center"
          >
          <!-- Source: https://ithacasoap.com/ -->
            <BCarouselSlide
              v-for="(img, i) in product.images"
              :key="i"
              :img-src="`${baseDir}images/${img}`"
              alt="Product Image"
              style="object-fit: cover;"
            />
          </BCarousel>
        </BCol>


        <!-- details column -->
        <div class="d-flex mb-4 align-items-center flex-nowrap gap-3">
          <!-- size selector flex-grows to fill space -->
          <div class="flex-grow-1">
            <b-form-group label="Size / Variant" class="mb-0">
              <b-form-select v-model="selectedVariant" :options="variantOptions" />
            </b-form-group>
          </div>

          <!-- quantity stays its natural width -->
          <div>
            <b-form-group label="Quantity" class="mb-0 text-left">
              <div class="d-flex align-items-center">
                <BButton variant="outline-secondary" @click="decrementQty">−</BButton>
                <b-form-input
                  type="number"
                  v-model.number="quantity"
                  class="mx-2"
                  :min="1"
                  style="width: 4rem;"
                />
                <BButton variant="outline-secondary" @click="incrementQty">+</BButton>
              </div>
            </b-form-group>
          </div>
        </div>

        <BRow class="align-items-center">
          <BCol cols="8" class="text-right">
            <BButton class="fw-semibold w-100 mt-2" variant="primary" @click="addToCartHandler">Add to Cart 🛒</BButton>
          </BCol>
          <BCol cols="4" class="text-center">
            <h4 class="mb-0">${{ displayPrice.toFixed(2) }}</h4>
          </BCol>
        </BRow>
        <BRow class="mt-4">
          <BCol cols="12">
            <!-- full-width header toggle -->
            <div
              class="d-flex justify-content-between align-items-center border-bottom py-2"
              style="cursor: pointer;"
              @click="showDesc = !showDesc"
            >
              <strong>Details ℹ️</strong>
              <!-- Source: https://www.flaticon.com/free-icon/up-arrow_271239?term=up+arrow&page=1&position=20&origin=tag&related_id=271239 -->
              <!-- Source: https://www.flaticon.com/free-icon/down-arrow_271210?term=down+arrow&page=1&position=35&origin=tag&related_id=271210 -->
              <img
                :src="showDesc ? upArrow : downArrow"
                alt="Toggle details"
                width="24" height="24"
              />
            </div>
            <!-- Source: https://ithacasoap.com/ -->
            <BCollapse v-model="showDesc" class="mt-3">
              <div class="product-description" v-html="htmlDescription"></div>
            </BCollapse>
          </BCol>
          <div class="mt-3 d-flex justify-content-end">
            <BButton
              variant="outline-secondary"
              class="border-0 p-0"
              @click="sharePage"
            >
              <!-- Source: https://www.flaticon.com/free-icon/share_4855052?term=share&page=1&position=7&origin=tag&related_id=4855052 -->
              <img src="@/assets/share.png" alt="Share" width="24" height="24" />
            </BButton>
          </div>
        </BRow>
      </BRow>
    </div>

    <div v-else class="text-center py-5">Loading…</div>
  </BContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import MarkdownIt from 'markdown-it'
import {
  BContainer,
  BRow,
  BCol,
  BCarousel,
  BCarouselSlide,
  BFormGroup,
  BFormSelect,
  BButton,
  BFormInput,
  BCollapse
} from 'bootstrap-vue-next'

import data from '../fixtures.json'
import { useCart } from '@/cart.js'

import downArrow from '@/assets/down-arrow.png'
import upArrow   from '@/assets/up-arrow.png'

import saveBlank from '@/assets/save-blank.png'
import saveSolid from '@/assets/save-solid.png'
import { useFavorites } from '@/useFavorites.js'

const { isFavorite, toggleFavorite } = useFavorites()

const showDesc = ref(false)

const { addToCart, openCart } = useCart()

const md = new MarkdownIt()

marked.use({
  renderer: new marked.Renderer({
    link(href, title, text) {
      if (href === '/demos') {
        return `<a href="/demos">${text}</a>`
      }
      if (href === '/about'){
        return `<a href="/about">${text}</a>`
      }
      if (href.startsWith('/')){
        return `<a href="${href}" data-int-link>${text}</a>`
      }
      return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`
    }
  })
})

const route = useRoute()
const router = useRouter()
const productId = Number(route.params.id)
const base = import.meta.env.BASE_URL

const product = ref(null)
onMounted(() => {
  const id = Number(route.params.id)
  product.value = data.products.find(p => p.id === id)
  if (!product.value) router.replace({ name: 'home' })
})

const htmlDescription = computed(() =>
  product.value?.description
    ? marked(product.value.description)
    : ''
)

const variants = computed(() => product.value?.variants || [])
const variantOptions = computed(() =>
  variants.value.map(v => ({
    value: v,
    text: `${v.size} – $${v.price.toFixed(2)}`
  }))
)

const selectedVariant = ref(null)
onMounted(() => {
  if (variants.value.length) selectedVariant.value = variants.value[0]
})

const quantity = ref(1)
function incrementQty() {
  quantity.value++
}
function decrementQty() {
  if (quantity.value > 1) quantity.value--
}

const minPrice = computed(() =>
  Math.min(...variants.value.map(v => v.price))
)
const displayPrice = computed(() =>
  (selectedVariant.value?.price || minPrice.value) * quantity.value
)

const hasMultipleImages = computed(() =>
  Array.isArray(product.value?.images) && product.value.images.length > 1
)

function goBack() {
  router.back()
}

function addToCartHandler() {
  addToCart(product.value, selectedVariant.value, quantity.value)
  openCart()
}



function sharePage() {
  const shareData = {
    title: product.value.name,
    text: product.value.description.split('\n')[0],
    url: window.location.href
  }
  if (navigator.share) {
    navigator.share(shareData).catch(err => console.error('Share failed:', err))
  } else {
    window.prompt('Copy this link to share:', window.location.href)
  }
}
</script>

<style scoped>
.lead {
  font-size: 1.25rem;
}


input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  text-align: center;
}

.d-flex.flex-nowrap > div:last-child {
  flex-shrink: 1;
  min-width: 4rem;
}
</style>
