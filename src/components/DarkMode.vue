<script setup>
import { useDark, useToggle } from '@vueuse/core';
import BaseButton from './BaseButton.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <BaseButton @click="toggleDark()" class="px-2">
    {{ isDark ? 'Light' : 'Dark' }} Mode</BaseButton
  >
</template>
