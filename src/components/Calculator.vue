<script setup>
import { computed } from 'vue';
import VContainer from './VerticalContainer.vue';
import chisqTable from '../assets/chisquare-table.json';

const props = defineProps(['rolls', 'totalRolls', 'sides', 'tallyDone']);

const signifiance = computed(() => {
  const df = props.sides - 1;
  const sig = [0, 0];

  sig[0] = chisqTable[df]?.min;
  sig[1] = chisqTable[df]?.max;

  return sig;
});

const chiSquared = computed(() => {
  const expectedValue = props.totalRolls / props.sides;
  const roundedChiSqrt =
    Math.round(calcChiSquared(expectedValue) * 1000) / 1000;

  return roundedChiSqrt;
});

function calcChiSquared(eValue) {
  let chiSqrd = NaN;

  if (props.rolls) {
    Object.values(props.rolls).forEach((r) => {
      const value = Math.pow(r - eValue, 2) / eValue;
      chiSqrd = chiSqrd ? chiSqrd + value : value;
    });
  }

  return chiSqrd;
}
</script>

<template>
  <VContainer
    class="w-full gap-8 overflow-hidden pt-2 transition-all duration-500"
    :class="tallyDone ? 'h-72' : 'h-0'"
    v-if="tallyDone"
  >
    <VContainer class="p-4 text-2xl">
      <h3 class="text-3xl font-bold">Dice Fairness</h3>
      <p v-if="!(chiSquared >= 0)">-</p>
      <p v-else-if="chiSquared < signifiance[0]">Pretty fair</p>
      <p
        v-else-if="chiSquared >= signifiance[0] && chiSquared <= signifiance[1]"
      >
        Inconclusive
      </p>
      <p v-else>Looks biased</p>
    </VContainer>

    <VContainer class="flex w-full">
      <h3 class="text-2xl font-bold">Chi-Squared</h3>
      <p v-if="!Number.isNaN(chiSquared)" class="pb-4">
        The Chi-Squared is {{ chiSquared }}
      </p>
      <p v-else>-</p>

      <div
        class="flex overflow-hidden pt-2 transition-all duration-500"
        :class="totalRolls > 0 ? 'h-20' : 'h-0'"
        v-if="chiSquared >= 0"
      >
        <p v-if="chiSquared < signifiance[0]" class="text-center">
          which is less than {{ signifiance[0] }}, that means that your dice is
          inside the acceptable margin of probability error (5%)
        </p>
        <p
          v-else-if="
            chiSquared >= signifiance[0] && chiSquared <= signifiance[1]
          "
          class="text-center"
        >
          which is between {{ signifiance[0] }} and {{ signifiance[1] }}, and is
          an inconclusive result,
          <span class="font-bold">more data is needed</span>
        </p>
        <p v-else class="text-center">
          which is higher than {{ signifiance[1] }}; it is extremely below the
          acceptable margin of probability error (~1%)
        </p>
      </div>
    </VContainer>
  </VContainer>
</template>
