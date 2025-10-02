<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-rate
      v-model:value="value"
      :count="count"
      :allow-half="allowHalf"
      :allow-clear="allowClear"
      :tooltips="tooltips"
      :disabled="disabled"
      @blur="handleBlur"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';

defineOptions({ name: 'Rate' });

interface Props {
  name: string;
  label?: string;
  modelValue?: number;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  tooltips?: string[];
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  modelValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  tooltips: () => [],
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const { value, errorMessage, handleBlur } = useField<number>(props.name, undefined, {
  validateOnValueUpdate: true,
});

watch(
  () => props.modelValue,
  val => {
    if (val !== value.value) {
      value.value = val || 0;
    }
  },
  { immediate: true },
);

watch(value, val => {
  emit('update:modelValue', val);
});

const status = computed(() => (errorMessage.value ? 'error' : ''));
</script>
