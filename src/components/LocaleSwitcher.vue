<script setup lang="ts">
import { useLocale } from "@/composables/use-locale";
import type { LocaleType } from "@/plugins/i18n";
import BrazilFlagIcon from "./icons/BrazilFlagIcon.vue";
import UsaFlagIcon from "./icons/UsaFlagIcon.vue";

type LocaleData = {
  code: LocaleType;
  icon: typeof UsaFlagIcon;
};

const { t, locale } = useLocale();

const locales: LocaleData[] = [
  { code: "en-US", icon: UsaFlagIcon },
  { code: "pt-BR", icon: BrazilFlagIcon },
];
</script>

<template>
  <div class="flex justify-end p-2 gap-2">
    <button
      v-for="item in locales"
      type="button"
      :aria-label="`${t('change-language-to')} ${item.code}`"
      @click="locale = item.code"
      class="cursor-pointer"
      :class="locale === item.code ? 'opacity-100' : 'opacity-25'"
      :key="item.code"
    >
      <component :is="item.icon" />
    </button>
  </div>
</template>
