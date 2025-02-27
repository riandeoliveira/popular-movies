import type { LocaleKeys, LocaleType } from "@/plugins/i18n";
import type { RemovableRef } from "@vueuse/core";
import { useHead } from "@vueuse/head";
import { onMounted, watch } from "vue";
import { type ComposerTranslation, useI18n } from "vue-i18n";
import { useLocalStorage } from "./use-local-storage";

type UseLocale = {
  locale: RemovableRef<LocaleType>;
  t: ComposerTranslation;
};

export const useLocale = (): UseLocale => {
  const { locale } = useLocalStorage();
  const { t } = useI18n<{ message: LocaleKeys }>();

  const updatePageHead = (): void => {
    useHead({
      htmlAttrs: {
        lang: locale.value,
      },
      meta: [
        {
          name: "description",
          content: t("meta-description"),
        },
      ],
      title: t("popular-movies"),
    });
  };

  watch(locale, updatePageHead);

  onMounted(updatePageHead);

  return {
    locale,
    t,
  };
};
