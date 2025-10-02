<template>
  <a-cascader
    v-bind="props"
    v-model:value="innerValue"
    :options="options"
    :placeholder="placeholder"
    :allow-clear="allowClear"
    :change-on-select="changeOnSelect"
    :disabled="disabled"
    :multiple="multiple"
    :show-search="showSearch"
    :expand-trigger="expandTrigger"
    :size="size"
    :status="status"
    :dropdown-class-name="dropdownClassName"
    :dropdown-style="dropdownStyle"
    :max-tag-count="maxTagCount"
    :max-tag-placeholder="maxTagPlaceholder"
    :not-found-content="notFoundContent"
    @change="onChange"
    @dropdownVisibleChange="onDropdownVisibleChange"
    @search="onSearch"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { VueNode } from 'ant-design-vue/es/_util/type';

defineOptions({ name: 'Cascader' });

interface CascaderOption {
  value: string | number;
  label?: string | VueNode;
  disabled?: boolean;
  children?: CascaderOption[];
  [key: string]: any;
}

interface Props {
  modelValue?: (string | number)[] | (string | number)[][];
  options?: CascaderOption[];
  placeholder?: string;
  allowClear?: boolean;
  changeOnSelect?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  showSearch?: boolean | Record<string, any>;
  expandTrigger?: 'click' | 'hover';
  size?: 'small' | 'middle' | 'large';
  status?: '' | 'error' | 'warning';
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  maxTagCount?: number | 'responsive';
  maxTagPlaceholder?: (omittedValues: any[]) => VueNode;
  notFoundContent?: VueNode;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  options: () => [],
  placeholder: 'Select...',
  allowClear: true,
  changeOnSelect: false,
  disabled: false,
  multiple: false,
  showSearch: false,
  expandTrigger: 'click',
  size: 'middle',
  status: '',
  dropdownClassName: '',
  dropdownStyle: () => ({}),
  maxTagCount: undefined,
  maxTagPlaceholder: undefined,
  notFoundContent: 'Not Found',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Props['modelValue']): void;
  (e: 'change', value: Props['modelValue'], selectedOptions: CascaderOption[]): void;
  (e: 'dropdownVisibleChange', open: boolean): void;
  (e: 'search', value: string): void;
}>();

import { ref, watch } from 'vue';

const innerValue = ref<Props['modelValue']>(props.modelValue);

watch(
  () => props.modelValue,
  val => {
    if (val !== innerValue.value) innerValue.value = val;
  },
);

watch(innerValue, val => {
  emit('update:modelValue', val);
});

function onChange(value: any, selectedOptions: any) {
  emit('change', value, selectedOptions);
}
function onDropdownVisibleChange(open: boolean) {
  emit('dropdownVisibleChange', open);
}
function onSearch(val: string) {
  emit('search', val);
}
</script>
