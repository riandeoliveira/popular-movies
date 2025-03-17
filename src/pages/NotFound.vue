<script setup lang="ts">
import { useLocale } from "@/composables/use-locale";
import { RouterLink } from "vue-router";

const { t } = useLocale();
</script>

<template>
  <div class="bg-c-blue-900 min-h-screen font-kumbh-sans flex justify-center">
    <div class="text-white flex flex-col gap-4 items-center justify-center">
      <h1 class="text-4xl font-semibold text-white max-s-480:text-2xl text-center">404 - {{ t('page_not_found') }}</h1>
      <RouterLink to="/" class="underline text-c-blue-500">{{ t('go_back_to_home') }}</RouterLink>
    </div>
  </div>
</template>
