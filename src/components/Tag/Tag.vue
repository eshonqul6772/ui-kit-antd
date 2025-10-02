<template>
  <a-tag :color="color" :closable="closable" @close="handleClose">
    <slot>{{ text }}</slot>
  </a-tag>
</template>

<script setup lang="ts">
defineOptions({ name: 'Tag' });
interface Props {
  text?: string;
  color?: string;
  closable?: boolean;
}

withDefaults(defineProps<Props>(), {
  text: '',
  color: undefined,
  closable: false,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

function handleClose(event: Event) {
  emit('close');
  event.preventDefault();
}
</script>
