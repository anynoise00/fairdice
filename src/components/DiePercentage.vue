<script setup>
import VContainer from './VerticalContainer.vue';

const props = defineProps(['rolls', 'totalRolls']);

function calcRollPercentage(numRolls) {
  const percentage = Math.round((numRolls / props.totalRolls) * 1000) / 10;
  return percentage ? percentage : 0;
}
</script>

<template>
  <VContainer v-if="totalRolls > 0">
    <h3 class="pt-8 text-xl font-bold">Total Rolls</h3>
    <p class="pb-2">From a total of {{ totalRolls }} rolls</p>

    <p v-for="(r, i) in rolls">
      <span class="font-bold">{{ i }}</span> was rolled
      <span class="font-bold">{{ r }} times</span> ({{
        calcRollPercentage(r)
      }}%)
    </p>
  </VContainer>
</template>
