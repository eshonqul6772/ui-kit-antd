<template>
  <a-row :gutter="gutter" :justify="justify" :align="align">
    <slot />
  </a-row>
</template>

<script setup lang="ts">
defineOptions({ name: 'Row' });

type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
type Align = 'top' | 'middle' | 'bottom' | 'stretch';

interface Props {
  gutter?: number | object;
  justify?: Justify;
  align?: Align;
}

withDefaults(defineProps<Props>(), {
  gutter: 16,
  justify: 'start',
  align: 'top',
});
</script>
