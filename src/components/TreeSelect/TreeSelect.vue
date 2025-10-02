<template>
  <a-form-item :label="label">
    <a-tree-select
      v-model:value="innerValue"
      :tree-data="treeData"
      :tree-checkable="treeCheckable"
      :multiple="multiple"
      :show-search="showSearch"
      :placeholder="placeholder"
      :allow-clear="allowClear"
      :disabled="disabled"
      style="width: 100%"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TreeSelectProps } from 'ant-design-vue';

defineOptions({ name: 'TreeSelect' });

interface Props {
  label?: string;
  modelValue?: string | string[];
  treeData: TreeSelectProps['treeData'];
  placeholder?: string;
  multiple?: boolean;
  treeCheckable?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Select option',
  modelValue: '',
  multiple: false,
  treeCheckable: false,
  allowClear: true,
  showSearch: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void;
}>();

const innerValue = ref<string | string[]>(props.modelValue);

watch(
  () => props.modelValue,
  val => {
    if (val !== innerValue.value) {
      innerValue.value = val || (props.multiple || props.treeCheckable ? [] : '');
    }
  },
  { immediate: true },
);

watch(innerValue, val => {
  emit('update:modelValue', val);
});
</script>
