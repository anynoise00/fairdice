<script setup>
import { computed, watch } from 'vue';
import VContainer from './VerticalContainer.vue';

const props = defineProps(['totalRolls', 'sides']);
const emit = defineEmits(['tallyDone']);

const minMult = 5;
const betterMult = 10;

const rollsRemaining = computed(() => {
  const remaining = props.sides
    ? props.sides * betterMult - props.totalRolls
    : NaN;
  return remaining;
});

watch(rollsRemaining, (num) => {
  if (num <= 0) {
    emit('tallyDone');
  }
});
</script>

<template>
  <VContainer>
    <p class="text-xl font-bold dark:text-white">
      You have rolled {{ totalRolls ? totalRolls : 0 }}
      {{ totalRolls > 1 ? 'times' : 'time' }}
    </p>
    <p class="text-md max-w-96 text-center">
      a <span class="font-bold">minimum of {{ sides * minMult }} rolls</span> is
      necessary, but rolling
      <span class="font-bold"> {{ sides * betterMult }} or more times </span>
      gives more accurate results
    </p>
  </VContainer>
</template>
