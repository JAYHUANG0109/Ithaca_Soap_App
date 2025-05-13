<template>
  <BModal v-model="showCart" title="Your Cart" @cancel="cancelCart" hide-footer size="lg" dialog-class="cart-modal-dialog" content-class="cart-modal-content" body-class="cart-modal-body">
    <template #default>
      <div v-if="items.length">
        <div v-for="item in items" :key="item.id + '-' + item.variant.size" class="mb-3 position-relative">
          <img :src="isFavorite(item.id) ? saveSolid : saveBlank" class="favorite-icon" @click.stop="toggleFavorite(item.id)" alt="save" />

          <BCard class="pe-4">
            <BRow class="align-items-center g-2">
              <BCol cols="4" xs="4">
                <img :src="baseDir + 'images/' + item.image" class="img-fluid rounded" alt="thumb" />
              </BCol>

              <BCol cols="8" xs="8">
                <BCardTitle class="fs-6 mb-1">{{ item.name }}</BCardTitle>
                <small>
                  Size: {{ item.variant.size }} | ${{ item.variant.price.toFixed(2) }}
                </small>

                <BFormGroup label="Quantity" class="mt-2 mb-0">
                  <div class="d-flex align-items-center">
                    <BButton size="sm" variant="outline-secondary" @click="updateQuantity(item, item.quantity - 1)">−</BButton>
                    <BFormInput type="number" v-model.number="item.quantity" @change="updateQuantity(item, item.quantity)" :min="1" class="mx-2 quantity-input" style="width: 3rem;" />
                    <BButton size="sm" variant="outline-secondary" @click="updateQuantity(item, item.quantity + 1)">+</BButton>
                  </div>
                </BFormGroup>

                <div class="d-flex justify-content-end align-items-center mt-2">
                  <BButton variant="transparent" size="sm" @click="removeItem(item)">
                    <img src="@/assets/remove.png" alt="remove" width="24" />
                  </BButton>
                </div>
              </BCol>
            </BRow>
          </BCard>
        </div>

        <div class="text-end mt-4">
          <h5>Total: ${{ total.toFixed(2) }}</h5>
        </div>
      </div>

      <div v-else class="text-center text-muted py-5">
        Your cart is empty.
      </div>
    </template>

    <template #footer>
      <div class="w-100 d-flex justify-content-between align-items-center">
        <BButton variant="outline-secondary" @click="continueShopping" class="me-3">
          Continue Shopping
        </BButton>
        <BButton variant="primary" @click="proceed">
          Proceed to Checkout
        </BButton>
      </div>
    </template>
  </BModal>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import {
  BModal,
  BRow,
  BCol,
  BCard,
  BCardTitle,
  BButton,
  BFormInput,
  BFormGroup
} from 'bootstrap-vue-next'
import { useCart } from '@/cart.js'
import { useFavorites } from '@/useFavorites.js'
import saveBlank from '@/assets/save-blank.png'
import saveSolid from '@/assets/save-solid.png'

const {
  items,
  total,
  showCart,
  updateQuantity,
  removeItem,
  cancelCart,
  confirmCart
} = useCart()

const { toggleFavorite, isFavorite } = useFavorites()

const router = useRouter()
const route = useRoute()
const baseDir = import.meta.env.BASE_URL

function proceed() {
  confirmCart()
  router.push({ name: 'checkout' })
}

function continueShopping() {
  confirmCart()
  if (!route.path.startsWith('/products')) {
    router.push({ name: 'products' })
  }
}
</script>

<style scoped>
img {
  max-height: 80px;
}

.favorite-icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 5;
}

.cart-modal-dialog {
  max-width: 95vw;
  margin-top: 4vh;
  margin-bottom: env(safe-area-inset-bottom, 2vh);
}

.cart-modal-content {
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cart-modal-body {
  overflow-y: auto;
  padding-bottom: env(safe-area-inset-bottom, 1rem);
}

/* Extra safety on tiny devices */
@media (max-width: 375px) {
  .cart-modal-dialog {
    margin-top: 2vh;
  }

  .favorite-icon {
    width: 20px;
    height: 20px;
  }

  .cart-modal-body {
    padding: 0.5rem 1rem;
  }
}

input[type="number"] {
  -moz-appearance: textfield;
  /* Firefox */
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  display: none;
  /* Chrome, Safari */
  margin: 0;
}
.quantity-input {
  text-align: center;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

</style>
