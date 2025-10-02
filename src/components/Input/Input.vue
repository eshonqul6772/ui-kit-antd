<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <!-- Text -->
    <a-input
      v-if="variant === 'text'"
      :placeholder="placeholder"
      :value="value"
      :size="size"
      :autocomplete="name"
      @input="handleChange"
      @blur="handleBlur"
      :allow-clear="allowClear"
    />

    <!-- Password -->
    <a-input-password
      v-else-if="variant === 'password'"
      :placeholder="placeholder"
      :value="value"
      :size="size"
      :autocomplete="name"
      @input="handleChange"
      @blur="handleBlur"
      :allow-clear="allowClear"
    />

    <!-- Search -->
    <a-input-search
      v-else-if="variant === 'search'"
      :placeholder="placeholder"
      :value="value"
      :size="size"
      :autocomplete="name"
      @input="handleChange"
      @blur="handleBlur"
      :allow-clear="allowClear"
      @search="onSearch"
    />

    <!-- Textarea -->
    <a-textarea
      v-else-if="variant === 'textarea'"
      :placeholder="placeholder"
      :value="value"
      :size="size"
      :autocomplete="name"
      @input="handleChange"
      @blur="handleBlur"
      :rows="rows"
      :allow-clear="allowClear"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';

type InputVariant = 'text' | 'password' | 'search' | 'textarea';

defineOptions({
  name: 'Input',
});

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  variant?: InputVariant;
  rows?: number;
  allowClear?: boolean;
  size?: 'large' | 'middle' | 'small';
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  placeholder: '',
  rows: 4,
  size: 'large',
  allowClear: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search', value: string): void;
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

function onSearch(val: string) {
  emit('search', val);
}
</script>
