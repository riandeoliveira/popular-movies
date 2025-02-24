import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { type LocaleKeys } from "../plugins/i18n";
import { useLocalStorage } from "./use-local-storage";

export const useLocale = () => {
  const { locale } = useLocalStorage();
  const { t } = useI18n<{ message: LocaleKeys }>();

  const updatePageMeta = () => {
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
