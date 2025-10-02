<template>
  <a-space :direction="direction" :size="size" :align="align" :wrap="wrap">
    <slot />
  </a-space>
</template>

<script setup lang="ts">
defineOptions({ name: 'Space' });

type Direction = 'horizontal' | 'vertical';
type Align = 'start' | 'end' | 'center' | 'baseline';

interface Props {
  direction?: Direction;
  size?: 'small' | 'middle' | 'large';
  align?: Align;
  wrap?: boolean;
}

withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  size: 'small',
  wrap: false,
});
</script>
