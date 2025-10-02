<template>
  <a-segmented
    :options="options"
    :value="modelValue"
    :disabled="disabled"
    :block="block"
    @change="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
defineOptions({ name: 'Segmented' });
interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  modelValue?: string | number;
  options: Option[];
  disabled?: boolean;
  block?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  block: false,
});
</script>
s
