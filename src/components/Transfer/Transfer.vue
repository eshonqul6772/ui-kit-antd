<template>
  <a-form-item :label="label">
    <a-transfer
      v-model:target-keys="innerValue"
      :data-source="dataSource"
      :titles="titles"
      :show-search="showSearch"
      :disabled="disabled"
      :one-way="oneWay"
      :pagination="pagination"
      :render="renderItem"
      style="width: 100%"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TransferItem } from 'ant-design-vue/es/transfer';

defineOptions({ name: 'Transfer' });

interface Props {
  label?: string;
  modelValue?: string[];
  dataSource: TransferItem[];
  titles?: [string, string];
  disabled?: boolean;
  showSearch?: boolean;
  oneWay?: boolean;
  pagination?: boolean | object;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  modelValue: () => [],
  titles: () => ['Source', 'Target'],
  disabled: false,
  showSearch: false,
  oneWay: false,
  pagination: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const innerValue = ref<string[]>(props.modelValue);

watch(
  () => props.modelValue,
  val => {
    if (val !== innerValue.value) {
      innerValue.value = val || [];
    }
  },
  { immediate: true },
);

watch(innerValue, val => {
  emit('update:modelValue', val);
});

function renderItem(item: TransferItem) {
  return item.title || item.key;
}
</script>
