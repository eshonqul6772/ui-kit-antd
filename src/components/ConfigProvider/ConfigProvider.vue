<template>
  <a-config-provider
    :locale="locale"
    :theme="theme"
    :component-size="componentSize"
    :direction="direction"
  >
    <slot />
  </a-config-provider>
</template>

<script setup lang="ts">
import type { ConfigProviderProps } from 'ant-design-vue';

defineOptions({ name: 'ConfigProvider' });

interface Props {
  locale?: ConfigProviderProps['locale'];
  theme?: ConfigProviderProps['theme'];
  componentSize?: 'small' | 'middle' | 'large';
  direction?: 'ltr' | 'rtl';
}

withDefaults(defineProps<Props>(), {
  locale: undefined,
  theme: undefined,
  componentSize: 'middle',
  direction: 'ltr',
});
</script>
