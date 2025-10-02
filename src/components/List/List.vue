<template>
  <a-list
    :data-source="dataSource"
    :bordered="bordered"
    :loading="loading"
    :item-layout="itemLayout"
    :header="header"
    :footer="footer"
  >
    <template #renderItem="{ item, index }">
      <a-list-item style="display: flex; align-items: center">
        <slot name="item" :item="item" :index="index">
          {{ item }}
        </slot>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
defineOptions({ name: 'List' });

type Layout = 'horizontal' | 'vertical';

interface Props {
  dataSource: any[];
  bordered?: boolean;
  loading?: boolean;
  itemLayout?: Layout;
  header?: string;
  footer?: string;
}

withDefaults(defineProps<Props>(), {
  bordered: false,
  loading: false,
  itemLayout: 'horizontal',
  header: '',
  footer: '',
});
</script>
