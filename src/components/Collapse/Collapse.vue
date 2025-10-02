<template>
  <a-collapse
    :accordion="accordion"
    :bordered="bordered"
    :collapsible="collapsible"
    :default-active-key="defaultActiveKey"
    :expand-icon-position="expandIconPosition"
    @change="onChange"
  >
    <slot />
  </a-collapse>
</template>

<script setup lang="ts">
defineOptions({ name: 'Collapse' });

type Collapsible = 'header' | 'disabled' | undefined;
type ExpandIconPosition = 'start' | 'end';

interface Props {
  accordion?: boolean;
  bordered?: boolean;
  collapsible?: Collapsible;
  defaultActiveKey?: string | string[];
  expandIconPosition?: ExpandIconPosition;
}

withDefaults(defineProps<Props>(), {
  accordion: false,
  bordered: true,
  collapsible: undefined,
  defaultActiveKey: () => [],
  expandIconPosition: 'start',
});

const emit = defineEmits<{
  (e: 'change', activeKeys: string | string[]): void;
}>();

function onChange(activeKeys: any) {
  emit('change', activeKeys);
}
</script>
