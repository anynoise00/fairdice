<script setup>
import { useDark, useToggle } from '@vueuse/core';
import BaseButton from './BaseButton.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <BaseButton @click="toggleDark()" class="rounded-full px-6 py-1">
    {{ isDark ? 'Light' : 'Dark' }}</BaseButton
  >
</template>
