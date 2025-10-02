<template>
  <a-badge
    :count="count"
    :dot="dot"
    :status="status"
    :text="text"
    :overflow-count="overflowCount"
    :color="color"
    :offset="offset"
  >
    <slot />
  </a-badge>
</template>

<script setup lang="ts">
import type { BadgeProps } from 'ant-design-vue';

defineOptions({ name: 'Badge' });

interface Props {
  count?: number | string;
  dot?: boolean;
  status?: BadgeProps['status'];
  text?: string;
  overflowCount?: number;
  color?: string;
  offset?: [number, number];
}

withDefaults(defineProps<Props>(), {
  dot: false,
  overflowCount: 99,
});
</script>
