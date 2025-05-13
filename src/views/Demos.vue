<script setup>
import {
  BContainer, BRow, BCol, BCard, BCardBody, BCardText, BCardTitle,
  BCardImg, BCarousel, BCarouselSlide
} from 'bootstrap-vue-next'
import { ref } from 'vue'

const baseDir = import.meta.env.BASE_URL

const tabs = ref([
  {
    title: 'Cat litter box',
    thumb: 'litter-box.png',
    images: ['cat1.png', 'cat2.png', 'cat3.png', 'cat4.png', 'cat5.png'],
    steps: '1. Scoop out solid trash\n2. Sprinkle soap granules\n3. Rinse tray with warm water',
    measurements: 'Heavy load: 2 tbsp\nMedium load: 1 tbsp\nLight load: 1/2 tbsp'
    // Thumb Image Source: https://www.flaticon.com/free-icon/litter-box_1687142?term=cat+litter+box&page=1&position=1&origin=tag&related_id=1687142
    // Carousel Image Source: https://ithacasoap.com/
  },
  {
    title: 'Laundry',
    thumb: 'washing-machine.png',
    images: ['laundry1.png', 'laundry2.png', 'laundry3.png', 'laundry4.png', 'laundry5.png'],
    steps: '1. Separate colors\n2. Add soap into dispenser\n3. Choose wash cycle',
    measurements: 'Heavy load: 3 tbsp\nMedium load: 2 tbsp\nLight load: 1 tbsp'
    // Thumb Image Source: https://www.flaticon.com/free-icon/washing-machine_2969204?term=laundry&page=1&position=8&origin=tag&related_id=2969204
    // Carousel Image Source: https://ithacasoap.com/
  },
  {
    title: 'Bathroom',
    thumb: 'public-toilet.png',
    images: ['bathroom1.png', 'bathroom2.png', 'bathroom3.png', 'bathroom4.png', 'bathroom5.png'],
    steps: '1. Spray on surfaces\n2. Scrub with sponge\n3. Rinse with water',
    measurements: 'Heavy load: 5 sprays\nMedium load: 3 sprays\nLight load: 1 spray'
    // Thumb Image Source: https://www.flaticon.com/free-icon/public-toilet_3289742?term=bathroom&page=1&position=7&origin=tag&related_id=3289742
    // Carousel Image Source: https://ithacasoap.com/
  },
  {
    title: 'Dishes',
    thumb: 'dishes.png',
    video: 'videos/dishwash.mov',
    steps: '1. Wet sponge\n2. Add soap\n3. Scrub and rinse',
    measurements: 'Heavy load: Full pump\nMedium load: Half pump\nLight load: Few drops'
    // Thumb Image Source: https://www.flaticon.com/free-icon/dishes_3939913?term=washing+dishes&page=1&position=12&origin=search&related_id=3939913
    // Video Source: https://ithacasoap.com/
  }
])

const activeTab = ref(0)
</script>

<template>
  <BContainer class="pb-5 py-4">


    <!-- Tab Selectors -->
    <BRow class="justify-content-center mb-3">
      <BCol v-for="(tab, index) in tabs" :key="index" cols="3" class="text-center">
        <img :src="`${baseDir}images/${tab.thumb}`" alt="Tab Image" class="rounded mb-1 border" style="cursor: pointer; width: 80px; height: 80px; object-fit: cover;" :class="{ 'border-primary border-3': activeTab === index }" @click="activeTab = index" />
        <div class="fw-semibold" style="font-size: 0.85rem;">{{ tab.title }}</div>
      </BCol>
    </BRow>

    <!-- Media (Carousel or Video) -->
    <BCard class="mb-4">
      <BCardBody>
        <div class="text-center">
          <div class="border rounded" style="max-height: 400px; overflow: hidden;">
            <video v-if="tabs[activeTab].video" :src="`${baseDir}${tabs[activeTab].video}`" controls autoplay muted style="width: 100%; max-height: 400px; object-fit: cover;"></video>
            <BCarousel v-else :interval="0" controls indicators>
              <BCarouselSlide v-for="(img, i) in tabs[activeTab].images" :key="i" :img-src="`${baseDir}images/${img}`" :alt="`${tabs[activeTab].title} Image ${i + 1}`" style="object-fit: cover;" />
            </BCarousel>
          </div>
        </div>
      </BCardBody>
    </BCard>

    <!-- Steps & Measurements Vertical -->
    <div class="mb-4">
      <BCard class="mb-3">
        <BCardBody>
          <BCardTitle class="fw-semibold" style="font-size: 1.1rem;">🧼 Steps</BCardTitle>
          <BCardText class="text-muted" style="white-space: pre-line; font-size: 1rem;">
            {{ tabs[activeTab].steps }}
          </BCardText>
        </BCardBody>
      </BCard>
      <BCard>
        <BCardBody>
          <BCardTitle class="fw-semibold" style="font-size: 1.1rem;">📏 Measurements</BCardTitle>
          <BCardText class="text-muted" style="white-space: pre-line; font-size: 1rem;">
            {{ tabs[activeTab].measurements }}
          </BCardText>
        </BCardBody>
      </BCard>
    </div>


    <!-- Reviews Section -->
    <BCard class="mb-3">
      <BCardBody>
        <BCardTitle class="fw-bold">🗣️ Product reviews</BCardTitle>

        <BCard class="mb-3">
          <BRow class="g-0">
            <BCol cols="3" class="d-flex align-items-center">
              <BCardImg :src="`${baseDir}images/alice-placeholder.jpg`" alt="Alice" class="img-fluid" />
              <!-- Image Source: https://depositphotos.com/vectors/female-placeholder.html -->
            </BCol>
            <BCol cols="9">
              <BCardBody>
                <BCardText class="small">
                  <strong>Alice:</strong> I use this soap for my cat's litterbox and it works so well. No harsh chemicals, just clean and fresh.
                </BCardText>
              </BCardBody>
            </BCol>
          </BRow>
        </BCard>

        <BCard>
          <BRow class="g-0">
            <BCol cols="3" class="d-flex align-items-center">
              <BCardImg :src="`${baseDir}images/brian-placeholder.jpg`" alt="Brian" class="img-fluid" />
              <!-- Image Source: https://www.istockphoto.com/vector/male-default-avatar-profile-icon-man-face-silhouette-person-placeholder-vector-gm1223477625-359404026 -->
            </BCol>
            <BCol cols="9">
              <BCardBody>
                <BCardText class="small">
                  <strong>Brian:</strong> I’m obsessed. I’ve never seen my bathroom shine like this before. A must-have for eco-conscious cleaning!
                </BCardText>
              </BCardBody>
            </BCol>
          </BRow>
        </BCard>
      </BCardBody>
    </BCard>
  </BContainer>
</template>

<!-- Sources: Bootstrap Docs: https://getbootstrap.com/docs/5.3/utilities/sizing/ | ChatGPT: https://openai.com/chatgpt -->
