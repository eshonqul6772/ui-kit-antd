<template>
  <a-float-button-group :shape="shape" :trigger="trigger" :style="style">
    <slot />
  </a-float-button-group>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

defineOptions({ name: 'FloatButton' });

interface Props {
  shape?: 'circle' | 'square';
  trigger?: 'click' | 'hover';
  style?: CSSProperties;
}

withDefaults(defineProps<Props>(), {
  shape: 'circle',
  trigger: 'hover',
  style: () => ({ right: '24px', bottom: '24px' }),
});
</script>
