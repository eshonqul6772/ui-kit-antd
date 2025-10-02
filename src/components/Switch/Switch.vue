<template>
  <a-form-item :label="label" :validate-status="status" :help="errorMessage">
    <a-switch
      :checked="value"
      @change="handleChange"
      @blur="handleBlur"
      :checked-children="checkedChildren"
      :un-checked-children="unCheckedChildren"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';

defineOptions({ name: 'Switch' });

interface Props {
  name: string;
  label?: string;
  modelValue?: boolean;
  checkedChildren?: string;
  unCheckedChildren?: string;
}

const props = withDefaults(defineProps<Props>(), {
  checkedChildren: '',
  unCheckedChildren: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const {
  value,
  errorMessage,
  handleBlur,
  handleChange: handleFieldChange,
} = useField<boolean>(props.name, undefined, {
  validateOnValueUpdate: true,
});

const status = computed(() => (errorMessage.value ? 'error' : ''));

watch(
  () => props.modelValue,
  val => {
    if (val !== value.value) {
      value.value = val ?? false;
    }
  },
  { immediate: true },
);

function handleChange(val: boolean | any) {
  handleFieldChange(val);
  emit('update:modelValue', val);
}
</script>
