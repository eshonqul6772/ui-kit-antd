<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-checkbox-group
      v-if="Array.isArray(options) && options.length && isOption"
      :options="options"
      :value="value as (string | number)[]"
      @change="handleChange"
    />
    <a-checkbox v-else :checked="value as boolean" @change="handleChange">
      {{ placeholder }}
    </a-checkbox>
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';

defineOptions({ name: 'Checkbox' });

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  name: string;
  label?: string;
  isOption?: boolean;
  placeholder?: string;
  modelValue?: boolean | (string | number)[];
  options?: Option[];
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  options: () => [],
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | (string | number)[]): void;
}>();

const {
  value,
  errorMessage,
  handleChange: handleFieldChange,
} = useField<boolean | (string | number)[]>(props.name, undefined, {
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
  const newVal = Array.isArray(props.options) && props.options.length ? val : val.target.checked;

  handleFieldChange(newVal);
  emit('update:modelValue', newVal);
}
</script>
