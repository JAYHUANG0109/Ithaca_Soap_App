<script setup>
import Search from '@/components/search.vue'
import CartIcon from '@/components/CartIcon.vue'
import { BContainer, BRow, BCol, BCard, BButton, BCardText, BCardTitle } from 'bootstrap-vue-next'
</script>

<template>
 <BRow class="align-items-center mb-3">
      <BCol>
        <Search v-model="enteredTerm" placeholder="Search for Products" @search="onSearch" />
      </BCol>
      <BCol cols="auto">
        <CartIcon />
      </BCol>

    </BRow>
</template>
