<template>
  <a-tabs
    :active-key="modelValue"
    @change="handleChange"
    :tab-position="tabPosition"
    :type="type"
    :size="size"
    :animated="animated"
  >
    <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.label" :disabled="tab.disabled">
      <slot :name="tab.key" />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
defineOptions({ name: 'Tabs' });

interface TabItem {
  key: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  modelValue?: string;
  tabs: TabItem[];

  type?: 'line' | 'card' | 'editable-card';
  size?: 'small' | 'middle' | 'large';
  tabPosition?: 'top' | 'left' | 'right' | 'bottom';
  animated?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'line',
  size: 'middle',
  tabPosition: 'top',
  animated: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function handleChange(val: any) {
  emit('update:modelValue', val);
}
</script>
