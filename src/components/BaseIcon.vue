<script setup lang="ts">
import { onMounted, ref } from "vue";

export type IconName =
  | "brazil-flag"
  | "check"
  | "heart"
  | "next"
  | "previous"
  | "search"
  | "spinner"
  | "star"
  | "usa-flag";

type Props = {
  name: IconName;
};

type SvgComponent = typeof import("*.svg");

const props = defineProps<Props>();
const component = ref<SvgComponent>();

const getIconAsComponent = async (): Promise<void> => {
  component.value = await import(`@/assets/icons/${props.name}.svg`);
};

onMounted(getIconAsComponent);
</script>
  
<template>
  <component :is="component" />
</template>
