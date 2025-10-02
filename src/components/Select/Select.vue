<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-select
      :placeholder="placeholder"
      :value="value"
      :mode="mode"
      :size="size"
      :options="options"
      :allow-clear="allowClear"
      :show-search="showSearch"
      :filter-option="filterOption"
      @change="handleChange"
      @blur="handleBlur"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';

type SelectMode = 'multiple' | 'tags' | undefined;

defineOptions({ name: 'Select' });

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  modelValue?: string | number | (string | number)[];
  options: Option[] | any;
  size?: 'large' | 'middle' | 'small';
  mode?: SelectMode;
  allowClear?: boolean;
  showSearch?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  allowClear: true,
  showSearch: false,
  size: 'large',
  mode: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | (string | number)[]): void;
}>();

const {
  value,
  errorMessage,
  handleBlur,
  handleChange: handleFieldChange,
} = useField<string | number | (string | number)[]>(props.name, undefined, {
  validateOnValueUpdate: true,
});

const status = computed(() => (errorMessage.value ? 'error' : ''));

watch(
  () => props.modelValue,
  val => {
    if (val !== value.value) {
      value.value = val as any;
    }
  },
  { immediate: true },
);

function handleChange(val: any) {
  handleFieldChange(val);
  emit('update:modelValue', val);
}

function filterOption(input: string, option: any) {
  return option?.label?.toLowerCase().includes(input.toLowerCase());
}
</script>
