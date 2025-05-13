import { reactive, computed } from 'vue'

const stored = localStorage.getItem('cart')
const state = reactive({
  items: stored ? JSON.parse(stored) : [],
  showCart: false
})

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(state.items))
}

export function useCart() {
  function addToCart(product, variant, qty) {
    const existing = state.items.find(
      i => i.id === product.id && i.variant.size === variant.size
    )
    if (existing) {
      existing.quantity += qty
    } else {
      state.items.push({
        id: product.id,
        name: product.name,
        image: product.images[0],
        variant,
        quantity: qty
      })
    }
    saveCart()
  }

  function updateQuantity(item, qty) {
    const i = state.items.find(
      x => x.id === item.id && x.variant.size === item.variant.size
    )
    if (i) {
      i.quantity = Math.max(1, qty)
      saveCart()
    }
  }

  function removeItem(item) {
    const idx = state.items.findIndex(
      x => x.id === item.id && x.variant.size === item.variant.size
    )
    if (idx >= 0) {
      state.items.splice(idx, 1)
      saveCart()
    }
  }

  function openCart() {
    state.showCart = true
  }

  function cancelCart() {
    state.showCart = false
  }

  function confirmCart() {
    // Optionally keep this if you want to hook into a final confirmation
    state.showCart = false
    saveCart()
  }

  const items = computed(() => state.items)

  const total = computed(() =>
    state.items.reduce((sum, i) => sum + i.variant.price * i.quantity, 0)
  )

  const showCart = computed({
    get: () => state.showCart,
    set: v => { state.showCart = v }
  })

  return {
    items,
    total,
    addToCart,
    updateQuantity,
    removeItem,
    openCart,
    cancelCart,
    confirmCart,
    showCart
  }
}
