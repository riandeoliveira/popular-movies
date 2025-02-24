import { createI18n } from "vue-i18n";
import enUs from "../locales/en-us.json";
import ptBr from "../locales/pt-br.json";

export type LocaleType = "en-US" | "pt-BR";
export type LocaleKeys = typeof enUs;

export const i18n = createI18n<[LocaleKeys], LocaleType>({
  legacy: false,
  locale: "en-US",
  fallbackLocale: "en-US",
  messages: { "en-US": enUs, "pt-BR": ptBr },
});
