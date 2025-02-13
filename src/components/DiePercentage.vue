<script setup>
import VContainer from './VerticalContainer.vue';

const props = defineProps(['rolls', 'totalRolls', 'sides']);

function calcRollPercentage(numRolls) {
  const percentage = Math.round((numRolls / props.totalRolls) * 1000) / 10;
  return percentage ? percentage : 0;
}
</script>

<template>
  <VContainer>
    <h3 class="pt-4 text-xl font-bold">Rolls Percentage</h3>

    <p v-if="sides" v-for="i in sides">
      <span class="font-bold">{{ i }}</span> was rolled
      <span class="font-bold"
        >{{ rolls[i] }} {{ rolls[i] !== 1 ? 'times' : 'time' }}</span
      >
      ({{ calcRollPercentage(rolls[i]) }}%)
    </p>
    <p v-else>-</p>
  </VContainer>
</template>
