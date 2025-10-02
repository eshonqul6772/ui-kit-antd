<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-date-picker
      v-model:value="value"
      :placeholder="placeholder"
      :format="format"
      :value-format="valueFormat"
      :disabled="disabled"
      :allow-clear="allowClear"
      :picker="picker"
      :show-time="showTime"
      style="width: 100%"
      @blur="handleBlur"
      @change="handleChange"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';

defineOptions({ name: 'DatePicker' });

type PickerType = 'date' | 'week' | 'month' | 'quarter' | 'year';

interface Props {
  name: string; // vee-validate field name
  label?: string;
  placeholder?: string;
  format?: string;
  valueFormat?: string;
  disabled?: boolean;
  allowClear?: boolean;
  picker?: PickerType;
  showTime?: boolean;
  modelValue?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Select date',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD',
  disabled: false,
  allowClear: true,
  picker: 'date',
  showTime: false,
  modelValue: null,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
}>();

let handleChange: any = (val: any) => {
  emit('update:modelValue', val);
};

const { value, errorMessage, handleBlur } = useField<string | any>(props.name, undefined, {
  validateOnValueUpdate: true,
});

const status = computed(() => (errorMessage.value ? 'error' : ''));

watch(
  () => props.modelValue,
  val => {
    if (val !== value.value) {
      value.value = val || null;
    }
  },
  { immediate: true },
);

watch(value, val => {
  emit('update:modelValue', val);
});
</script>
