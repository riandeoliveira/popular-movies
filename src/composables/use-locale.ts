import type { LocaleKeys, LocaleType } from "@/plugins/i18n";
import type { RemovableRef } from "@vueuse/core";
import { useHead } from "@vueuse/head";
import { computed } from "vue";
import { type ComposerTranslation, useI18n } from "vue-i18n";
import { useLocalStorage } from "./use-local-storage";

type UseLocale = {
  locale: RemovableRef<LocaleType>;
  t: ComposerTranslation<{ "en-US": LocaleKeys }>;
};

export const useLocale = (): UseLocale => {
  const { locale } = useLocalStorage();
  const { t } = useI18n<{ message: LocaleKeys }>();

  useHead({
    htmlAttrs: {
      lang: computed(() => locale.value),
    },
    meta: [
      {
        name: "description",
        content: computed(() => t("meta_description")),
      },
    ],
    title: computed(() => t("popular_movies")),
  });

  return {
    locale,
    t,
  };
};
