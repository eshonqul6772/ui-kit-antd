<template>
  <a-carousel
    :autoplay="autoplay"
    :dots="dots"
    :dot-position="dotPosition"
    :easing="easing"
    :effect="effect"
    :after-change="onAfterChange"
    :before-change="onBeforeChange"
  >
    <slot />
  </a-carousel>
</template>

<script setup lang="ts">
defineOptions({ name: 'Carousel' });

type DotPosition = 'top' | 'bottom' | 'left' | 'right';
type EffectType = 'scrollx' | 'fade';

interface Props {
  autoplay?: boolean;
  dots?: boolean;
  dotPosition?: DotPosition;
  easing?: string;
  effect?: EffectType;
}

withDefaults(defineProps<Props>(), {
  autoplay: false,
  dots: true,
  dotPosition: 'bottom',
  easing: 'linear',
  effect: 'scrollx',
});

const emit = defineEmits<{
  (e: 'afterChange', current: number): void;
  (e: 'beforeChange', from: number, to: number): void;
}>();

function onAfterChange(current: number) {
  emit('afterChange', current);
}

function onBeforeChange(from: number, to: number) {
  emit('beforeChange', from, to);
}
</script>
