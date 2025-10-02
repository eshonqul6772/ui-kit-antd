<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-radio-group
      v-if="variant === 'group'"
      v-model:value="value"
      :options="options"
      :disabled="disabled"
      @blur="handleBlur"
    />
    <a-radio v-else v-model:checked="checked" :disabled="disabled" @blur="handleBlur">
      {{ text }}
    </a-radio>
  </a-form-item>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useField } from 'vee-validate';

defineOptions({ name: 'Radio' });

type RadioOption = {
  label: string;
  value: string | number | boolean;
};

interface Props {
  name: string;
  label?: string;
  variant?: 'single' | 'group';
  options?: RadioOption[];
  text?: string;
  value?: string | number | boolean;
  modelValue?: any;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  variant: 'group',
  options: () => [],
  text: 'Option',
  value: true,
  modelValue: undefined,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const { value, errorMessage, handleBlur } = useField<any>(props.name, undefined, {
  validateOnValueUpdate: true,
});

const checked = ref<boolean>(false);

watch(
  () => props.modelValue,
  val => {
    if (props.variant === 'single') {
      checked.value = val === props.value;
    } else {
      value.value = val;
    }
  },
  { immediate: true },
);

watch([checked, value], () => {
  if (props.variant === 'single') {
    emit('update:modelValue', checked.value ? props.value : null);
  } else {
    emit('update:modelValue', value.value);
  }
});

const status = computed(() => (errorMessage.value ? 'error' : ''));
</script>
