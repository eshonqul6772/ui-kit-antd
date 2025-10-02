<template>
  <a-affix :offset-top="offsetTop" :offset-bottom="offsetBottom" :target="target">
    <slot />
  </a-affix>
</template>

<script setup lang="ts">
defineOptions({ name: 'Affix' });

interface Props {
  offsetTop?: number;
  offsetBottom?: number;
  target?: () => HTMLElement;
}

withDefaults(defineProps<Props>(), {
  offsetTop: 0,
  offsetBottom: undefined,
  target: undefined,
});
</script>
