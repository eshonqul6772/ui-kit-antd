<template>
  <a-qrcode
    :value="value"
    :size="size"
    :color="color"
    :bg-color="bgColor"
    :error-level="errorLevel"
    :icon="icon"
    :icon-size="iconSize"
    :bordered="bordered"
  />
</template>

<script setup lang="ts">
defineOptions({ name: 'QrCode' });

interface Props {
  value: string;
  size?: number;
  color?: string;
  bgColor?: string;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  icon?: string;
  iconSize?: number;
  bordered?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 160,
  color: '#000000',
  bgColor: '#ffffff',
  errorLevel: 'M',
  bordered: true,
});
</script>
