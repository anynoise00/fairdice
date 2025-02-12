<script setup>
import { ref, computed, watch } from 'vue';

import VContainer from './components/VerticalContainer.vue';
import DarkMode from './components/DarkMode.vue';
import BaseButton from './components/BaseButton.vue';
import RollCounter from './components/RollCounter.vue';
import Calculator from './components/Calculator.vue';

const diceSides = ref(0);
const rolls = ref([]);
const tallyDone = ref(false);

watch(diceSides, (_) => {
  resetRolls();
});

const isInputValid = computed(() => {
  return (
    Number.isInteger(diceSides.value) &&
    diceSides.value >= 2 &&
    diceSides.value <= 20
  );
});

function resetRolls() {
  rolls.value = [];
  tallyDone.value = false;
}
</script>

<template>
  <header class="flex justify-between p-2">
    <h1 class="p-2 text-2xl font-bold dark:text-white">Welcome to Fairdice!</h1>
    <DarkMode />
  </header>

  <main>
    <VContainer class="w-full gap-y-8 p-2 px-4 md:px-8">
      <section id="section-dice_info">
        <VContainer>
          <h2 class="text-2xl font-bold dark:text-white">Dice Info</h2>

          <label for="diceSize" class="pb-1">
            How many sides does your die have? (2-20)</label
          >
          <input
            v-model.number="diceSides"
            type="text"
            class="w-full max-w-96 flex-1 self-auto border px-2 py-1 focus:outline-none"
            name="diceSize"
            id="diceSize"
            placeholder="20"
          />
        </VContainer>
      </section>

      <section id="section-roll_input">
        <VContainer class="">
          <h2 class="text-2xl font-bold dark:text-white">
            Lets start rolling!
          </h2>

          <p>Roll your dice and mark the results below</p>
          <ul
            class="grid w-full grid-cols-4 justify-items-center gap-4 py-2 md:w-fit md:grid-cols-5 lg:grid-cols-10"
          >
            <li v-for="n in 20" class="w-full">
              <BaseButton
                @click="rolls.unshift(n)"
                class="h-16 w-full text-xl md:w-16"
                :disabled="n > diceSides || !isInputValid"
              >
                {{ n }}
              </BaseButton>
            </li>
          </ul>

          <RollCounter
            class="pt-2"
            @minimumReached="tallyDone = true"
            :count="rolls.length"
            :sides="diceSides"
          />

          <VContainer>
            <p class="pt-6 text-lg font-bold">Most recent rolls:</p>
            <p class="pb-4">
              {{ rolls.length > 0 ? rolls.slice(0, 5).join(', ') : '-' }}
            </p>
            <BaseButton @click="resetRolls" class="p-2">Reset rolls</BaseButton>
          </VContainer>
        </VContainer>
      </section>

      <section v-if="tallyDone" id="section-results">
        <VContainer>
          <h2 class="text-2xl font-bold dark:text-white">
            These are the results
          </h2>

          <Calculator :rolls="rolls" :sides="diceSides" />
        </VContainer>
      </section>

      <BaseButton class="p-2">Back to top</BaseButton>
    </VContainer>
  </main>

  <footer class="flex w-full justify-center pt-32 pb-8">
    <p>&#169; 2025 AnyNoise</p>
  </footer>
</template>

<style>
html.dark {
  color-scheme: dark;
}
</style>
