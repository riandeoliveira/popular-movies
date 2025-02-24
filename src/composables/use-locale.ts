import { watch } from "vue";
import { useI18n } from "vue-i18n";
import { i18n, type LocaleKeys } from "../plugins/i18n";
import { useLocalStorage } from "./use-local-storage";

export const useLocale = () => {
  const { locale } = useLocalStorage();
  const { t } = useI18n<{ message: LocaleKeys }>();

  watch(locale, () => {
    i18n.global.locale = locale.value;

    document.title = t("popular-movies");
    document.documentElement.lang = locale.value;
  });

  return {
    locale,
    t,
  };
};
