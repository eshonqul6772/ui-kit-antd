<template>
  <a-button
    v-bind="props"
    :class="`${props.variant ? 'btn-' + props.variant : ''} wrapper`"
    @click="$emit('click')"
  >
    <slot>
      <component v-if="props.prefix" :is="useIcon(props.prefix)" />
      {{ props.title }}
      <component v-if="props.suffix" :is="useIcon(props.suffix)" />
    </slot>
  </a-button>
</template>

<script setup lang="ts">
import { useIcon } from '@/components/Icons';
import type { ButtonProps as AntdButtonProps } from 'ant-design-vue';

defineOptions({ name: 'Button' });

interface ExtraProps {
  prefix?: string;
  suffix?: string;
  title?: string;
  variant?: 'blue' | 'green' | 'red' | 'neutral' | 'white' | 'orange' | 'info' | 'transparent';
}

type ButtonProps = AntdButtonProps & ExtraProps;

const props = defineProps<ButtonProps>();

defineEmits<{ (e: 'click'): void }>();
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 36px;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  will-change: transform;
  transition: transform 0.2s ease-in-out;

  &:hover {
    color: var(--content-white);
  }
}

.btn-white {
  background-color: var(--background-white);
  color: var(--content-primary);

  &:hover {
    color: var(--content-primary);
  }
}

.btn-blue {
  background-color: var(--background-blue);
  color: var(--content-white);
}

.btn-info {
  background-color: #5200cc;
  color: var(--content-white);
}

.btn-green {
  background-color: var(--background-green);
  color: var(--content-white);
}

.btn-red {
  background-color: var(--background-red);
  color: var(--content-white);
}

.btn-orange {
  background-color: var(--background-orange);
}

.btn-neutral {
  background-color: var(--background-secondary);
  color: var(--content-white);
}

.btn-transparent {
  background-color: transparent;
}
</style>
