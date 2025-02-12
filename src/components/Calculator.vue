<script setup>
import { computed } from 'vue';
import VContainer from './VerticalContainer.vue';
import chisqTable from '../assets/chisquare-table.json';

const props = defineProps(['rolls', 'sides']);

const rollCount = computed(() => {
  const count = Array(props.sides).fill(0);

  props.rolls?.forEach((r) => {
    count[r - 1]++;
  });

  return count;
});
const signifiance = computed(() => {
  const df = props.sides - 1;
  const sig = [0, 0];

  sig[0] = chisqTable[df]?.min;
  sig[1] = chisqTable[df]?.max;

  return sig;
});

const chiSquared = computed(() => {
  const expectedValue = props.rolls.length / props.sides;
  const roundedChiSqrt =
    Math.round(calcChiSquared(expectedValue) * 1000) / 1000;

  return roundedChiSqrt;
});

function calcChiSquared(eValue) {
  let chiSqrd = NaN;

  rollCount.value.forEach((r) => {
    const value = Math.pow(r - eValue, 2) / eValue;
    chiSqrd = chiSqrd ? chiSqrd + value : value;
  });

  return chiSqrd;
}

function calcRollPercentage(numOfRolls, totalRolls) {
  return Math.round((numOfRolls / totalRolls) * 1000) / 10;
}
</script>

<template>
  <VContainer class="gap-8">
    <VContainer>
      <h3 class="text-xl font-bold">Fairness</h3>
      <p v-if="!(chiSquared >= 0)">-</p>
      <p v-else-if="chiSquared < signifiance[0]">Pretty fair</p>
      <p
        v-else-if="chiSquared >= signifiance[0] && chiSquared <= signifiance[1]"
      >
        Inconclusive, please add more rolls
      </p>
      <p v-else>Looks biased</p>
    </VContainer>

    <VContainer v-if="chiSquared >= 0" class="max-w-96">
      <h3 class="text-xl font-bold">Chi-Squared</h3>
      <p class="pb-4">The Chi-Squared is {{ chiSquared }}</p>

      <p v-if="chiSquared < signifiance[0]" class="text-center">
        which is less than {{ signifiance[0] }}, that means that your dice is
        inside the acceptable margin of probability error (5%)
      </p>
      <p
        v-else-if="chiSquared >= signifiance[0] && chiSquared <= signifiance[1]"
        class="text-center"
      >
        which is between {{ signifiance[0] }} and {{ signifiance[1] }}, and is
        an inconclusive result, more data may be needed
      </p>
      <p v-else class="text-center">
        which is higher than {{ signifiance[1] }}, so it is extremely below the
        acceptable margin of probability error (below 1%)
      </p>

      <a
        href="https://en.wikipedia.org/wiki/Chi-squared_test"
        class="visited:text-primary-200 dark:visited:text-secondary-100 pt-4 font-bold"
      >
        What is the Chi-Squared test?
      </a>
    </VContainer>

    <VContainer>
      <h3 class="text-xl font-bold">Total Rolls</h3>
      <p>From a total of {{ rolls.length }} rolls</p>

      <p v-for="(r, index) in rollCount">
        Your dice <span class="font-bold">rolled {{ index + 1 }}</span> a total
        of <span class="font-bold">{{ r }} times</span> ({{
          calcRollPercentage(r, rolls.length)
        }}%)
      </p>
    </VContainer>
  </VContainer>
</template>
