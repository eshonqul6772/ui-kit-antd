<template>
  <a-auto-complete
    v-bind="props"
    v-model:value="innerValue"
    :options="options"
    :placeholder="placeholder"
    :allow-clear="allowClear"
    :backfill="backfill"
    :default-active-first-option="defaultActiveFirstOption"
    :disabled="disabled"
    :filter-option="filterOption"
    :open="open"
    :status="status"
    :size="size"
    @search="onSearch"
    @select="onSelect"
    @change="onChange"
    @dropdownVisibleChange="onDropdownVisibleChange"
  >
    <slot />
  </a-auto-complete>
</template>

<script setup lang="ts">
import type { VueNode } from 'ant-design-vue/es/_util/type';

defineOptions({ name: 'AutoComplete' });

interface OptionItem {
  value: string;
  label?: string | VueNode;
  disabled?: boolean;
}

interface Props {
  modelValue?: string;
  options?: OptionItem[];
  placeholder?: string;
  allowClear?: boolean;
  backfill?: boolean;
  defaultActiveFirstOption?: boolean;
  disabled?: boolean;
  filterOption?: boolean | ((inputValue: string, option: OptionItem) => boolean);
  open?: boolean;
  size?: 'small' | 'middle' | 'large';
  status?: '' | 'error' | 'warning';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  placeholder: '',
  allowClear: true,
  backfill: false,
  defaultActiveFirstOption: true,
  disabled: false,
  filterOption: true,
  open: undefined,
  size: 'middle',
  status: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search', value: string): void;
  (e: 'select', value: string, option: OptionItem): void;
  (e: 'change', value: string): void;
  (e: 'dropdownVisibleChange', open: boolean): void;
}>();

import { ref, watch } from 'vue';

const innerValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  val => {
    if (val !== innerValue.value) innerValue.value = val || '';
  },
);

watch(innerValue, val => {
  emit('update:modelValue', val);
});

function onSearch(val: string) {
  emit('search', val);
}
function onSelect(value: any, option: any) {
  emit('select', value, option);
}
function onChange(val: any) {
  emit('change', val);
}
function onDropdownVisibleChange(open: boolean) {
  emit('dropdownVisibleChange', open);
}
</script>
