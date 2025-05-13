<template>
  <BContainer fluid class="search-container">
    <BRow class="align-items-center mt-3 mb-3">
      <BCol class="d-flex align-items-center gap-2">
        <!-- wrap input in a relative container -->
        <div class="search-container flex-grow-1">
          <BFormInput
            v-model="inputValue"
            :placeholder="placeholder"
            @keyup.enter="onSearch"
          />
          <!-- absolutely positioned clear button -->
          <BButton
            variant="link"
            class="clear-btn"
            @click="onClear"
          >
          <!-- Source: https://www.flaticon.com/free-icon/delete_12168607?term=delete&page=1&position=1&origin=search&related_id=12168607 -->
            <img :src="trash" alt="Clear" width="25" height="25"/>
          </BButton>
        </div>

        <!-- magnifier outside the box -->
        <BButton variant="link" class="search-btn" @click="onSearch">
        <!-- Source: https://www.flaticon.com/free-icon/magnifying-glass_151773?term=magnifying+glass&page=1&position=14&origin=search&related_id=151773 -->
          <img :src="magnify" alt="Search" width="25" height="25"/>
        </BButton>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
import { computed } from 'vue'
import { BContainer, BRow, BCol, BFormInput, BButton } from 'bootstrap-vue-next'

import magnify from '../assets/magnifying-glass.png'
import trash    from '../assets/delete.png'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue','search'])

const inputValue = computed({
  get:  () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

function onSearch() {
  emit('search')
  emit('update:modelValue', '') // <-- this clears the input after search
}

function onClear() {
  emit('update:modelValue','')
  emit('search')
}
</script>

<style scoped>
.search-container {
  position: relative;
}

.clear-btn {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  padding: 0.25rem;
  z-index: 2;
}

.search-btn {
  padding: 0.25rem;
}
</style>
