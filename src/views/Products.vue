<template>
  <BContainer fluid class="p-3 pb-5">
    <!-- Action buttons row -->
    <BRow class="mb-4 justify-content-between">
      <!-- “All” resets -->
      <BCol cols="4">
        <BButton class="w-100" variant="outline-primary" @click="resetAll">
          All 🌐
        </BButton>
      </BCol>

      <!-- Sort -->
      <BCol cols="4">
        <BDropdown toggle-class="w-100" text="Sort ↕️" variant="outline-secondary">
          <BDropdownItem @click="sortOrder = 'asc'">Price: Low → High</BDropdownItem>
          <BDropdownItem @click="sortOrder = 'desc'">Price: High → Low</BDropdownItem>
        </BDropdown>
      </BCol>

      <!-- Filter (includes Favorites) -->
      <BCol cols="4">
        <BDropdown toggle-class="w-100" text="Filter 🔽" variant="outline-secondary">
          <BDropdownItem v-for="cat in categories" :key="cat" @click="setCategory(cat)">
            {{ cat }}
          </BDropdownItem>
        </BDropdown>
      </BCol>
    </BRow>
    <BRow class="mb-3" v-if="lastSearchTerm">
      <BCol cols="12">
        <p class="text-muted">
          Showing results for "<strong>{{ lastSearchTerm }}</strong>"
          <BButton variant="link" size="sm" class="align-baseline text-decoration-none p-0 ps-2" @click="resetAll">
            Clear
          </BButton>
        </p>
      </BCol>
    </BRow>
    <!-- show grid if we have products-->
    <BRow v-if="displayedProducts.length">
      <BCol v-for="p in displayedProducts" :key="p.id" cols="6">
        <div class="position-relative overflow-visible mb-4">
          <!-- Bookmark toggle -->
          <!-- Source: https://www.flaticon.com/free-icon/bookmark_102279?term=save&page=1&position=5&origin=tag&related_id=102279 -->
          <!-- Source: https://www.flaticon.com/free-icon/save-instagram_5662990?term=save&page=1&position=3&origin=tag&related_id=5662990 -->
          <img :src="isFavorite(p.id) ? saveSolid : saveBlank" class="position-absolute" @click.stop="toggleFavorite(p.id)" alt="save" style="bottom: 1rem; right: 1rem; width: 24px; height: 24px; z-index: 1000;" />

          <!-- Product card -->
          <BCard @click="goDetail(p.id)" style="cursor:pointer">
            <!-- Source: https://ithacasoap.com/ -->
            <img v-if="p.images && p.images.length" :src="`${baseDir}images/${p.images[0]}`" alt="product thumbnail" class="w-100" style="height: 200px; object-fit: cover;" />
            <BCardBody>
              <BCardTitle class="fs-6">{{ p.name }}</BCardTitle>
              <small class="text-muted">
                Starting from ${{Math.min(...p.variants.map(v => v.price)).toFixed(2)}}
              </small>
            </BCardBody>
          </BCard>
        </div>
      </BCol>
    </BRow>
    <!-- …otherwise show a friendly no-results message -->
    <BRow v-else class="justify-content-center">
      <BCol cols="12" class="text-center">
        <p class="text-muted my-5">No results found.</p>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  BContainer,
  BRow,
  BCol,
  BButton,
  BDropdown,
  BDropdownItem,
  BCard,
  BCardBody,
  BCardTitle
} from 'bootstrap-vue-next'
import data from '../fixtures.json'
import saveBlank from '../assets/save-blank.png'
import saveSolid from '../assets/save-solid.png'
import { useFavorites } from '@/useFavorites.js'

// — router & search sync —
const route = useRoute()
const router = useRouter()

const { favorites, toggleFavorite, isFavorite } = useFavorites()

const base = import.meta.env.BASE_URL

const enteredTerm = ref(route.query.q || '')
const searchTerm = ref(enteredTerm.value.trim().toLowerCase())

const lastSearchTerm = ref(route.query.q?.trim() || '')

const selectedCategory = ref(route.query.category || 'All')

watch(
  () => route.query.category,
  cat => {
    selectedCategory.value = cat || 'All'
  }
)

watch(
  () => route.query.q,
  q => {
    const t = q || ''
    enteredTerm.value = t
    searchTerm.value = t.trim().toLowerCase()
    lastSearchTerm.value = t.trim()
  }
)

function onSearch() {
  const trimmed = enteredTerm.value.trim()
  router.replace({ query: { ...route.query, q: trimmed } })
  lastSearchTerm.value = trimmed
}

function setCategory(cat) {
  const category = (cat === 'All') ? undefined : cat
  router.push({
    name: 'products',
    query: {
      ...(route.query.q ? { q: route.query.q } : {}),
      ...(category ? { category } : {})
    }
  })
}


const sortOrder = ref(null)

function resetAll() {
  router.push({ name: 'products' })
  lastSearchTerm.value = ''
}

function goDetail(id) {
  router.push({
    name: 'individual',
    params: { id },
    query: { ...route.query }
  })
}

const categories = computed(() =>
  ['All', 'Favorites', ...new Set(data.products.map(p => p.category))]
)

const displayedProducts = computed(() => {
  let list = [...data.products]

  if (selectedCategory.value === 'Favorites') {
    list = list.filter(p => favorites.value.includes(p.id))
  } else if (selectedCategory.value !== 'All') {
    list = list.filter(p => p.category === selectedCategory.value)
  }

  if (searchTerm.value) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(searchTerm.value)
    )
  }

  if (sortOrder.value === 'asc') {
    list.sort((a, b) =>
      Math.min(...a.variants.map(v => v.price)) -
      Math.min(...b.variants.map(v => v.price))
    )
  } else if (sortOrder.value === 'desc') {
    list.sort((a, b) =>
      Math.min(...b.variants.map(v => v.price)) -
      Math.min(...a.variants.map(v => v.price))
    )
  }


  return list
})

</script>


<style scoped>
.favorite-icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  z-index: 1;
}

:deep(.dropdown-menu) {
  z-index: 3000 !important;
}

.overflow-visible {
  overflow: visible !important;
}
</style>
