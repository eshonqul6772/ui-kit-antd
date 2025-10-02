<template>
  <a-watermark
    :content="content"
    :font="font"
    :z-index="zIndex"
    :rotate="rotate"
    :gap="gap"
    :offset="offset"
  >
    <slot />
  </a-watermark>
</template>

<script setup lang="ts">
defineOptions({ name: 'Watermark' });

interface FontOptions {
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'light' | 'weight' | number;
  fontFamily?: string;
}

interface Props {
  content?: string | string[];
  font?: FontOptions;
  zIndex?: number;
  rotate?: number;
  gap?: [number, number];
  offset?: [number, number];
}

withDefaults(defineProps<Props>(), {
  content: 'Confidential',
  font: () => ({
    color: 'rgba(0,0,0,.15)',
    fontSize: 16,
  }),
  zIndex: 9,
  rotate: -22,
  gap: () => [100, 100],
  offset: () => [30, 30],
});
</script>
