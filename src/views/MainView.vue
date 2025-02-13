<script setup>
import { ref, computed, watch } from 'vue';

import VContainer from '../components/VerticalContainer.vue';
import DarkMode from '../components/DarkMode.vue';
import BackToTop from '@/components/BackToTop.vue';
import BaseButton from '../components/BaseButton.vue';
import RollCounter from '../components/RollCounter.vue';
import Calculator from '../components/Calculator.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const diceSides = ref('');
const rolls = ref([]);
const tallyDone = ref(false);

watch(diceSides, (_) => {
  clearRolls();
});

const isInputValid = computed(() => {
  return (
    Number.isInteger(diceSides.value) &&
    diceSides.value >= 2 &&
    diceSides.value <= 20
  );
});

function clearRolls() {
  rolls.value = [];
  tallyDone.value = false;
}
</script>

<template>
  <header class="flex justify-between p-2">
    <h1 class="p-2 text-3xl font-bold dark:text-white">Fairdice</h1>
    <DarkMode />
  </header>

  <main>
    <VContainer class="w-full gap-y-8 p-2 px-4 md:px-8">
      <section id="dice-info">
        <VContainer>
          <h2 class="text-2xl font-bold dark:text-white">Dice Info</h2>

          <label for="diceSize" class="pb-1">
            How many sides does your die have? (2-20)</label
          >
          <div class="flex w-full max-w-96 gap-2">
            <input
              v-model.number="diceSides"
              type="text"
              class="flex-1 rounded bg-gray-300 px-2 py-1 focus:outline-none dark:bg-gray-600"
              name="diceSize"
              id="diceSize"
              placeholder="20"
            />
            <BaseButton @click="diceSides = ''" class="rounded px-4 py-2">
              Clear
            </BaseButton>
          </div>
        </VContainer>
      </section>

      <section id="rolling">
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
                class="h-16 w-full rounded text-xl md:w-16"
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
            :sides="isInputValid ? diceSides : 0"
          />

          <VContainer>
            <p class="pt-6 text-lg font-bold">Most recent rolls:</p>
            <p class="pb-4">
              {{ rolls.length > 0 ? rolls.slice(0, 5).join(', ') : '-' }}
            </p>
          </VContainer>
        </VContainer>
      </section>

      <section id="results">
        <VContainer>
          <h2 class="text-2xl font-bold dark:text-white">
            These are the results
          </h2>

          <Calculator :rolls="rolls" :sides="diceSides" class="max-w-96" />
        </VContainer>
      </section>
    </VContainer>
  </main>

  <footer class="flex w-full justify-center pt-32 pb-8">
    <p>&#169; 2025 AnyNoise</p>
  </footer>

  <BackToTop />
</template>

<style>
html.dark {
  color-scheme: dark;
}
</style>
