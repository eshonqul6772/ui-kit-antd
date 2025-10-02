<template>
  <a-dropdown
    :arrow="arrow"
    :disabled="disabled"
    :trigger="trigger"
    :placement="placement"
    :auto-adjust-overflow="autoAdjustOverflow"
    :destroy-popup-on-hide="destroyPopupOnHide"
    :overlay-class-name="overlayClassName"
    :overlay-style="overlayStyle"
    :get-popup-container="getPopupContainer"
    :align="align"
    :open="open"
    @openChange="onOpenChange"
    @visibleChange="onVisibleChange"
  >
    <template #default>
      <slot />
    </template>

    <template #overlay>
      <a-menu :items="menuItems" @click="onMenuClick">
        <slot name="overlay" />
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';

defineOptions({ name: 'Dropdown' });

interface MenuItem {
  key: string;
  label: string;
  icon?: any;
  disabled?: boolean;
  danger?: boolean;
  children?: MenuItem[];
}

interface Props {
  menuItems?: MenuItem[];
  arrow?: boolean | { pointAtCenter: boolean };
  disabled?: boolean;
  trigger?: ('hover' | 'click' | 'contextmenu')[];
  placement?: 'bottomLeft' | 'bottom' | 'bottomRight' | 'topLeft' | 'top' | 'topRight';
  autoAdjustOverflow?: boolean;
  destroyPopupOnHide?: boolean;
  overlayClassName?: string;
  overlayStyle?: Record<string, any>;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  align?: object;
  open?: boolean;
}

withDefaults(defineProps<Props>(), {
  arrow: false,
  disabled: false,
  trigger: () => ['hover'],
  placement: 'bottomLeft',
  autoAdjustOverflow: true,
  destroyPopupOnHide: true,
  menuItems: () => [],
});

const emit = defineEmits<{
  (e: 'menuClick', info: MenuInfo): void;
  (e: 'openChange', val: boolean): void;
  (e: 'visibleChange', val: boolean): void;
}>();

function onMenuClick(info: MenuInfo) {
  emit('menuClick', info);
}
function onOpenChange(val: boolean) {
  emit('openChange', val);
}
function onVisibleChange(val: boolean) {
  emit('visibleChange', val);
}
</script>
