<script setup lang="ts">
import { useLocale } from "@/composables/use-locale";

const { t } = useLocale();
</script>

<template>
  <header class="pt-15.5 pb-12 max-s-720:pt-12 max-s-720:pb-8">
    <h1 class="text-4xl font-semibold text-center text-white max-s-720:text-3xl">
      {{ t("popular_movies") }}
    </h1>
  </header>
</template>
