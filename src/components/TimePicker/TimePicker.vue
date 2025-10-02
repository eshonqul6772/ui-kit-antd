<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-time-picker
      v-model:value="innerValue"
      :format="format"
      :disabled="disabled"
      :allow-clear="allowClear"
      @blur="handleBlur"
      style="width: 100%"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useField } from 'vee-validate';
import dayjs, { Dayjs } from 'dayjs';

defineOptions({ name: 'TimePicker' });

interface Props {
  name: string;
  label?: string;
  modelValue?: string;
  format?: string;
  disabled?: boolean;
  allowClear?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  modelValue: '',
  format: 'HH:mm:ss',
  disabled: false,
  allowClear: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void;
}>();

const { value, errorMessage, handleBlur } = useField<string>(props.name, undefined, {
  validateOnValueUpdate: true,
});

const innerValue = ref<Dayjs | null>(
  props.modelValue ? dayjs(props.modelValue, props.format) : null,
);

watch(
  () => props.modelValue,
  val => {
    if (val && val !== value.value) {
      innerValue.value = dayjs(val, props.format);
      value.value = val;
    }
  },
  { immediate: true },
);

watch(innerValue, val => {
  const formatted = val ? val.format(props.format) : '';
  value.value = formatted;
  emit('update:modelValue', formatted);
});

const status = computed(() => (errorMessage.value ? 'error' : ''));
</script>
