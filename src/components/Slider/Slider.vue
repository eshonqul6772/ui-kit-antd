<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-slider
      v-model:value="value"
      :min="min"
      :max="max"
      :step="step"
      :range="range"
      :disabled="disabled"
      :tooltip-open="tooltipOpen"
      :dots="dots"
      @blur="handleBlur"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';

defineOptions({ name: 'Slider' });

interface Props {
  name: string;
  label?: string;
  modelValue?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  disabled?: boolean;
  tooltipOpen?: boolean;
  dots?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  range: false,
  disabled: false,
  tooltipOpen: true,
  dots: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | [number, number]): void;
}>();

const { value, errorMessage, handleBlur } = useField<number | [number, number]>(
  props.name,
  undefined,
  {
    validateOnValueUpdate: true,
  },
);

watch(
  () => props.modelValue,
  val => {
    if (val !== value.value) {
      value.value = val ?? (props.range ? [props.min, props.max] : 0);
    }
  },
  { immediate: true },
);

watch(value, val => {
  emit('update:modelValue', val);
});

const status = computed(() => (errorMessage.value ? 'error' : ''));
</script>
