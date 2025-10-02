<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-mentions
      v-model:value="value"
      :placeholder="placeholder"
      :rows="rows"
      :prefix="prefix"
      :split="split"
      :disabled="disabled"
      @blur="handleBlur"
      @input="handleChange"
    >
      <a-mentions-option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </a-mentions-option>
    </a-mentions>
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';

defineOptions({ name: 'Mention' });

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  prefix?: string | string[];
  split?: string;
  disabled?: boolean;
  options?: Option[];
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Type with @ to mention',
  rows: 4,
  prefix: '@',
  split: ' ',
  disabled: false,
  options: () => [],
  modelValue: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const { value, errorMessage, handleBlur, handleChange } = useField<string>(props.name, undefined, {
  validateOnValueUpdate: true,
});

const status = computed(() => (errorMessage.value ? 'error' : ''));

watch(
  () => props.modelValue,
  val => {
    if (val !== value.value) {
      value.value = val || '';
    }
  },
  { immediate: true },
);

watch(value, val => {
  emit('update:modelValue', val);
});
</script>
