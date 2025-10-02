<template>
  <a-col :span="span" :offset="offset" :xs="xs" :sm="sm" :md="md" :lg="lg" :xl="xl">
    <slot />
  </a-col>
</template>

<script setup lang="ts">
defineOptions({ name: 'Col' });

interface Props {
  span?: number | string;
  offset?: number | string;
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
}

withDefaults(defineProps<Props>(), {
  span: 24,
  offset: 0,
});
</script>
