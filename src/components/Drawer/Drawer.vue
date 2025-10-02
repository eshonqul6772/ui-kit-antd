<template>
  <a-drawer
    :open="open"
    :title="title"
    :placement="placement"
    :closable="closable"
    :width="width"
    :height="height"
    :destroyOnClose="destroyOnClose"
    :mask="mask"
    :maskClosable="maskClosable"
    :keyboard="keyboard"
    :zIndex="zIndex"
    @close="onClose"
    @afterOpenChange="onAfterOpenChange"
  >
    <slot />
    <template #extra>
      <slot name="extra" />
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
defineOptions({ name: 'Drawer' });

interface Props {
  open: boolean;
  title?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  closable?: boolean;
  width?: number | string;
  height?: number | string;
  destroyOnClose?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  zIndex?: number;
}

withDefaults(defineProps<Props>(), {
  title: '',
  placement: 'right',
  closable: true,
  width: 320,
  height: 378,
  destroyOnClose: true,
  mask: true,
  maskClosable: true,
  keyboard: true,
  zIndex: 1000,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'afterOpenChange', open: boolean): void;
}>();

function onClose() {
  emit('close');
}

function onAfterOpenChange(open: boolean) {
  emit('afterOpenChange', open);
}
</script>

<style lang="scss">
.ant-drawer-header-title {
  display: flex;
  flex-direction: row-reverse;
}
</style>
