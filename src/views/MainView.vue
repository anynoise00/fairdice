<script setup>
import { ref, computed, watch } from 'vue';

import VContainer from '../components/VerticalContainer.vue';
import DarkMode from '../components/DarkMode.vue';
import BackToTop from '@/components/BackToTop.vue';
import BaseButton from '../components/BaseButton.vue';
import RollCounter from '../components/RollCounter.vue';
import DiePercentage from '../components/DiePercentage.vue';
import Calculator from '../components/Calculator.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const diceSides = ref('');
const rolls = ref({});
const totalRolls = ref(0);

const isInputValid = computed(() => {
  return (
    Number.isInteger(diceSides.value) &&
    diceSides.value >= 2 &&
    diceSides.value <= 20
  );
});

const minRollsReached = ref(false);

watch(diceSides, (_) => {
  resetRolls();

  if (isInputValid.value) {
    router.replace('#rolling');
  }
});

watch(minRollsReached, (newRolls, oldRolls) => {
  if (newRolls && newRolls !== oldRolls) {
    router.replace('#results');
  }
});

function resetRolls() {
  minRollsReached.value = false;
  totalRolls.value = 0;

  if (isInputValid.value) {
    const r = {};

    for (let i = 0; i < diceSides.value; i++) {
      r[i + 1] = 0;
    }

    rolls.value = r;
  }
}

function countRoll(n) {
  rolls.value[n]++;
  totalRolls.value++;
}
</script>

<template>
  <header class="flex justify-between border-b-1 pt-2 pb-4">
    <h1 class="text-3xl font-bold dark:text-white">Fairdice</h1>
    <DarkMode />
  </header>

  <main class="pt-4">
    <VContainer class="w-full gap-y-8">
      <section class="" id="introduction">
        <p class="text-justify text-lg">
          Hello and welcome to Fairdice! A website used to test if your dices
          are fair. It uses the
          <a
            href="https://en.wikipedia.org/wiki/Chi-squared_test"
            class="visited:text-primary-200 dark:visited:text-secondary-100 pt-4 font-bold underline underline-offset-2"
            >Chi-Squared test</a
          >
          for calculating the deviation from the normal probability in a perfect
          world with a perfect die. To get started, just fill the field below,
          you will need to roll your dice a bunch of times...
        </p>
      </section>

      <section id="dice-info">
        <VContainer>
          <h2 class="text-2xl font-bold dark:text-white">Dice Info</h2>

          <label for="diceSize" class="pb-1">
            How many sides does your die have? (2-20)</label
          >
          <div class="flex w-full max-w-96 gap-2">
            <input
              v-model.number="diceSides"
              type="number"
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
        <VContainer class="w-full">
          <h2 class="text-2xl font-bold dark:text-white">
            Lets start rolling!
          </h2>

          <p>Roll your dice and mark the results below</p>
          <ul
            class="grid grid-cols-4 justify-items-center gap-4 py-2 md:grid-cols-5 lg:grid-cols-10"
          >
            <li v-for="n in 20" class="w-full">
              <BaseButton
                @click="countRoll(n)"
                class="h-16 w-16 rounded text-xl"
                :disabled="n > diceSides || !isInputValid"
              >
                {{ n }}
              </BaseButton>
            </li>
          </ul>

          <RollCounter
            @tallyDone="minRollsReached = true"
            class="overflow-hidden pt-2 transition-all duration-500"
            :class="totalRolls > 0 ? 'h-24' : 'h-0'"
            :rolls="rolls"
            :totalRolls="totalRolls"
            :sides="isInputValid ? diceSides : 0"
          />
          <DiePercentage :rolls :totalRolls="totalRolls" :sides="diceSides" />
        </VContainer>
      </section>

      <section id="results">
        <VContainer>
          <Calculator
            :rolls="rolls"
            :totalRolls="totalRolls"
            :sides="diceSides"
            :tallyDone="minRollsReached"
            class="max-w-96"
          />
        </VContainer>
      </section>
    </VContainer>
  </main>

  <footer class="flex w-full justify-center pt-32 pb-8">
    <p>&#169; 2025 Vinícius Pinto</p>
  </footer>

  <BackToTop />
</template>

<style>
html.dark {
  color-scheme: dark;
}
</style>
