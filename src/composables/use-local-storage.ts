import { type LocaleType, i18nPlugin } from "@/plugins/i18n";
import type { Movie } from "@/services/use-movie-service";
import { type RemovableRef, useStorage } from "@vueuse/core";
import { onMounted } from "vue";
import { type ZodSchema, z } from "zod";

const favoriteMoviesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    overview: z.string().nullable().optional(),
    release_date: z.string().nullable().optional(),
    vote_average: z.number().nullable().optional(),
    vote_count: z.number().nullable().optional(),
    backdrop_path: z.string().nullable().optional(),
    favorite: z.boolean(),
  }),
);

const localeSchema = z.enum(["en-US", "pt-BR"]);

type UseLocalStorage = {
  favoriteMovies: RemovableRef<Movie[]>;
  locale: RemovableRef<LocaleType>;
};

export const useLocalStorage = (): UseLocalStorage => {
  const favoriteMovies = useStorage<Movie[]>("favorite_movies", []);
  const locale = useStorage<LocaleType>("locale", i18nPlugin.global.locale);

  const tryParse = <T>(
    schema: ZodSchema,
    state: RemovableRef<T>,
    defaultValue: T,
  ): void => {
    try {
      state.value = schema.parse(state.value);
    } catch {
      state.value = defaultValue;
    }

    const canParse = schema.safeParse(state.value).success;

    if (!canParse) {
      state.value = defaultValue;
    }
  };

  onMounted(() => {
    tryParse(localeSchema, locale, "en-US");
    tryParse(favoriteMoviesSchema, favoriteMovies, []);
  });

  return {
    favoriteMovies,
    locale,
  };
};
