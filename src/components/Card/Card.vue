<template>
  <a-card
    :style="!rounded ? 'border-radius: 0 !important' : ''"
    :class="rounded ? 'wrapper' : ''"
    :title="title"
    :bordered="bordered"
    :hoverable="hoverable"
    :loading="loading"
  >
    <slot />
    <template #extra>
      <slot name="extra" />
    </template>
  </a-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'Card' });

interface Props {
  title?: string | number;
  bordered?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  rounded?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: '',
  bordered: true,
  rounded: true,
  hoverable: false,
  loading: false,
});
</script>
