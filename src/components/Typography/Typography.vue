<template>
  <component
    :is="componentType"
    v-model:content="content"
    :level="variant === 'title' ? level : undefined"
    :code="code"
    :copyable="copyable"
    :disabled="disabled"
    :editable="editable"
    :ellipsis="ellipsis"
    :keyboard="variant === 'text' ? keyboard : undefined"
    :mark="mark"
    :strong="variant !== 'title' ? strong : undefined"
    :type="type"
    :underline="underline"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

defineOptions({ name: 'Typography' });

type Variant = 'text' | 'title' | 'paragraph';

interface Copyable {
  text?: string;
  tooltip?: boolean;
  onCopy?: (e: Event) => void;
}
interface Editable {
  tooltip?: boolean;
  editing?: boolean;
  maxlength?: number;
  autoSize?: boolean | { minRows: number; maxRows: number };
  onStart?: () => void;
  onChange?: (val: string) => void;
  onCancel?: () => void;
  onEnd?: () => void;
  triggerType?: ('icon' | 'text')[];
}
interface Ellipsis {
  rows?: number;
  expandable?: boolean;
  suffix?: string;
  symbol?: string;
  tooltip?: boolean | string;
  onExpand?: (e: Event) => void;
  onEllipsis?: (ellipsis: boolean) => void;
}

interface Props {
  modelValue?: string;
  variant?: Variant;
  level?: 1 | 2 | 3 | 4 | 5;
  code?: boolean;
  copyable?: boolean | Copyable;
  delete?: boolean;
  disabled?: boolean;
  editable?: boolean | Editable;
  ellipsis?: boolean | Ellipsis;
  keyboard?: boolean;
  mark?: boolean;
  strong?: boolean;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  underline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  level: 1,
  code: false,
  delete: false,
  disabled: false,
  keyboard: false,
  mark: false,
  strong: false,
  underline: false,
});

const emit = defineEmits<{ (e: 'update:modelValue', val: string): void }>();

const componentType = computed(() => {
  if (props.variant === 'title') return 'a-typography-title';
  if (props.variant === 'paragraph') return 'a-typography-paragraph';
  return 'a-typography-text';
});

const content = ref(props.modelValue ?? '');

watch(content, val => {
  emit('update:modelValue', val);
});

watch(
  () => props.modelValue,
  val => {
    if (val !== content.value) content.value = val || '';
  },
);
</script>
