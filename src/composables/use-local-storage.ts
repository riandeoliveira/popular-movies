import { useStorage, type RemovableRef } from "@vueuse/core";
import { onMounted } from "vue";
import { z, ZodSchema } from "zod";
import { i18n, type LocaleType } from "../plugins/i18n";
import type { Movie } from "../stores/use-movie-store";

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
  })
);

const localeSchema = z.enum(["en-US", "pt-BR"]);

export const useLocalStorage = () => {
  const favoriteMovies = useStorage<Movie[]>("favorite_movies", []);
  const locale = useStorage<LocaleType>("locale", i18n.global.locale);

  const tryParse = <T>(
    schema: ZodSchema,
    state: RemovableRef<T>,
    defaultValue: T
  ) => {
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
