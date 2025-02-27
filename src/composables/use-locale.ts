import type { LocaleKeys, LocaleType } from "@/plugins/i18n";
import type { RemovableRef } from "@vueuse/core";
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

  const updatePageMeta = (): void => {
    document.title = t("popular-movies");
    document.documentElement.lang = locale.value;
  };

  watch(locale, updatePageMeta);

  onMounted(updatePageMeta);

  return {
    locale,
    t,
  };
};
