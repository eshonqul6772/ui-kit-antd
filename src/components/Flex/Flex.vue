<template>
  <a-flex :vertical="vertical" :justify="justify" :align="align" :gap="gap" :wrap="wrap">
    <slot />
  </a-flex>
</template>

<script setup lang="ts">
defineOptions({ name: 'Flex' });

interface Props {
  vertical?: boolean;
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  gap?: number | string | 'small' | 'middle' | 'large';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

withDefaults(defineProps<Props>(), {
  vertical: false,
  justify: 'start',
  align: 'start',
  gap: 0,
  wrap: 'nowrap',
});
</script>
