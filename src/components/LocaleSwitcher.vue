<script setup lang="ts">
import { useLocale } from "../composables/use-locale";
import type { LocaleType } from "../plugins/i18n";
import BrazilFlagIcon from "./icons/BrazilFlagIcon.vue";
import UsaFlagIcon from "./icons/UsaFlagIcon.vue";

type LocaleData = {
  code: LocaleType;
  icon: typeof BrazilFlagIcon;
};

const { locale } = useLocale();

const locales: LocaleData[] = [
  { code: "pt-BR", icon: BrazilFlagIcon },
  { code: "en-US", icon: UsaFlagIcon },
];
</script>

<template>
  <div class="flex justify-end p-2 gap-2">
    <button
      v-for="item in locales"
      :key="item.code"
      type="button"
      @click="locale = item.code"
      class="cursor-pointer"
      :class="locale === item.code ? 'opacity-100' : 'opacity-25'"
    >
      <component :is="item.icon" />
    </button>
  </div>
</template>
