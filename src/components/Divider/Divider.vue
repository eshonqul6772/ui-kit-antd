<template>
  <a-divider
    :type="type"
    :orientation="orientation"
    :orientation-margin="orientationMargin"
    :dashed="dashed"
    :plain="plain"
  >
    <slot />
  </a-divider>
</template>

<script setup lang="ts">
defineOptions({ name: 'Divider' });

type Orientation = 'left' | 'right' | 'center';
type DividerType = 'horizontal' | 'vertical';

interface Props {
  type?: DividerType;
  orientation?: Orientation;
  orientationMargin?: number | string;
  dashed?: boolean;
  plain?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'horizontal',
  orientation: 'center',
  orientationMargin: 0,
  dashed: false,
  plain: false,
});
</script>
