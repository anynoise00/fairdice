<script setup>
import { computed, watch } from 'vue';
import CenteredContainer from './VerticalContainer.vue';

const props = defineProps(['count', 'sides']);
const emit = defineEmits(['minimumReached']);

const minMult = 5;
const betterMult = 10;

const minRolls = computed(() => {
  return sides * minMult;
});

const rollsRemaining = computed(() => {
  return props.sides * minMult - props.count;
});

watch(rollsRemaining, (num) => {
  if (num <= 0) {
    emit('minimumReached');
  }
});
</script>

<template>
  <CenteredContainer>
    <p class="text-xl font-bold dark:text-white">
      You have rolled {{ count ? count : 0 }} times
    </p>
    <p class="text-md max-w-96 text-center">
      a <span class="font-bold">minimum of {{ sides * minMult }} rolls</span> is
      necessary, but rolling
      <span class="font-bold"> {{ sides * betterMult }} or more times </span>
      gives more accurate results
    </p>
  </CenteredContainer>
</template>
