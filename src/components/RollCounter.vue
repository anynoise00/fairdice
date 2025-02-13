<script setup>
import { computed, watch } from 'vue';
import VContainer from './VerticalContainer.vue';

const props = defineProps(['rolls', 'totalRolls', 'sides']);
const emit = defineEmits(['tallyDone']);

const minMult = 5;
const betterMult = 10;

const rollsRemaining = computed(() => {
  return props.sides * betterMult - props.totalRolls;
});

watch(rollsRemaining, (num) => {
  if (num <= 0) {
    emit('tallyDone');
  }
});

function calcRollPercentage(numRolls) {
  const percentage = Math.round((numRolls / props.totalRolls) * 1000) / 10;
  return percentage ? percentage : 0;
}
</script>

<template>
  <VContainer>
    <p class="text-xl font-bold dark:text-white">
      You have rolled {{ totalRolls ? totalRolls : 0 }} times
    </p>
    <p class="text-md max-w-96 text-center">
      a <span class="font-bold">minimum of {{ sides * minMult }} rolls</span> is
      necessary, but rolling
      <span class="font-bold"> {{ sides * betterMult }} or more times </span>
      gives more accurate results
    </p>

    <VContainer v-if="totalRolls > 0">
      <h3 class="pt-8 text-xl font-bold">Total Rolls</h3>
      <p class="pb-2">From a total of {{ totalRolls }} rolls</p>

      <p v-for="(roll, index) in rolls">
        <span class="font-bold">{{ index }}</span> was rolled
        <span class="font-bold">{{ roll }} times</span> ({{
          calcRollPercentage(roll, totalRolls)
        }}%)
      </p>
    </VContainer>
  </VContainer>
</template>
