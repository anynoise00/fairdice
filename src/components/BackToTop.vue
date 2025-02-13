<script setup>
import { useRouter } from 'vue-router';
import { useWindowScroll } from '@vueuse/core';
import { computed } from 'vue';

import BaseButton from './BaseButton.vue';

const router = useRouter();
const { _, y } = useWindowScroll();

const minScroll = 16;
const enabled = computed(() => {
  return y.value > minScroll;
});
</script>

<template>
  <button
    v-if="enabled"
    @click="router.push('')"
    class="fixed right-2 bottom-2 h-10 w-10 min-w-min cursor-pointer rounded-2xl bg-black p-2 transition-opacity duration-900 ease-in-out md:h-12 md:w-12 dark:bg-white"
  >
    <svg
      class="h-full w-full fill-white dark:fill-black"
      style="vertical-align: middle; overflow: hidden"
      viewBox="0 0 1024 1024"
    >
      <path
        d="M491.42 412.298c7.887 12.378 6.427 28.995-4.381 39.803L204.196 734.944l-90.51-90.51c-12.496-12.497-12.496-32.758 0-45.255L396.53 316.337l.265.265 89.974-89.975c12.497-12.496 32.758-12.496 45.255 0l395.98 395.98-90.51 90.51c-12.497 12.497-32.758 12.497-45.255 0L491.42 412.297z"
      />
    </svg>
  </button>
</template>
