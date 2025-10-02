<template>
  <a-steps
    v-bind="props"
    :current="current"
    :direction="direction"
    :progress-dot="progressDot"
    :responsive="responsive"
    :size="size"
    :status="status"
    :label-placement="labelPlacement"
    :type="type"
    @change="onChange"
  >
    <a-step
      v-for="(step, index) in steps"
      :key="index"
      :title="step.title"
      :sub-title="step.subTitle"
      :description="step.description"
      :status="step.status"
      :icon="step.icon"
    />
  </a-steps>
</template>

<script setup lang="ts">
import type { VueNode } from 'ant-design-vue/es/_util/type';

defineOptions({ name: 'Steps' });

interface StepItem {
  title: string;
  subTitle?: string;
  description?: string;
  status?: 'wait' | 'process' | 'finish' | 'error';
  icon?: VueNode;
}

interface Props {
  steps: StepItem[];
  current?: number;
  initial?: number;
  direction?: 'horizontal' | 'vertical';
  progressDot?:
    | boolean
    | ((opt: { index: number; status: string; title: any; description: any }) => any);
  responsive?: boolean;
  size?: 'default' | 'small';
  status?: 'wait' | 'process' | 'finish' | 'error';
  labelPlacement?: 'horizontal' | 'vertical';
  type?: 'default' | 'navigation';
}

const props = withDefaults(defineProps<Props>(), {
  steps: () => [],
  current: 0,
  initial: 0,
  direction: 'horizontal',
  responsive: true,
  size: 'default',
  status: 'process',
  labelPlacement: 'horizontal',
  type: 'default',
});

const emit = defineEmits<{
  (e: 'change', current: number): void;
}>();

function onChange(current: number) {
  emit('change', current);
}
</script>
