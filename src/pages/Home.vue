<script setup lang="ts">
import HomePageHeader from "@/components/HomePageHeader.vue";
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import MovieList from "@/components/MovieList.vue";
import MovieListingSwitcher from "@/components/MovieListingSwitcher.vue";
import MoviePagination from "@/components/MoviePagination.vue";
import MovieSearchInput from "@/components/MovieSearchInput.vue";
</script>

<template>
  <div class="bg-c-blue-900 min-h-screen font-kumbh-sans">
    <LocaleSwitcher />
    <HomePageHeader />
    <MovieSearchInput />
    <MovieListingSwitcher />
    <MoviePagination />
    <MovieList />
  </div>
</template>
