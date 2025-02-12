<script setup>
defineProps(['align']);
</script>

<template>
  <div
    class="flex w-full flex-col"
    :class="align ? 'items-' + align : 'items-center'"
  >
    <slot />
  </div>
</template>
