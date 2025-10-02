<template>
  <a-pagination
    v-bind="props"
    @change="onChange"
    @showSizeChange="onShowSizeChange"
    @update:current="onUpdateCurrent"
    @update:pageSize="onUpdatePageSize"
  />
</template>

<script setup lang="ts">
defineOptions({ name: 'Pagination' });

interface Props {
  total?: number;
  defaultCurrent?: number;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean | { goButton?: boolean };
  showTotal?: (total: number, range: [number, number]) => string;
  simple?: boolean;
  size?: 'default' | 'small';
  pageSizeOptions?: string[];
  responsive?: boolean;
  itemRender?: (opt: {
    page: number;
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';
    originalElement: any;
  }) => any;
  role?: string;
  locale?: object;
  prefixCls?: string;
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  defaultCurrent: 1,
  defaultPageSize: 10,
  showSizeChanger: false,
  showQuickJumper: false,
  responsive: true,
  size: 'default',
});

const emit = defineEmits<{
  (e: 'change', page: number, pageSize: number): void;
  (e: 'showSizeChange', current: number, size: number): void;
  (e: 'update:current', current: number): void;
  (e: 'update:pageSize', size: number): void;
}>();

function onChange(page: number, pageSize: number) {
  emit('change', page, pageSize);
}
function onShowSizeChange(current: number, size: number) {
  emit('showSizeChange', current, size);
}
function onUpdateCurrent(val: number) {
  emit('update:current', val);
}
function onUpdatePageSize(val: number) {
  emit('update:pageSize', val);
}
</script>
