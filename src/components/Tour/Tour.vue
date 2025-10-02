<template>
  <a-tour
    :open="open"
    :steps="steps"
    :default-current="current"
    :on-change="handleChange"
    :on-close="handleClose"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'Tour' });

interface Props {
  steps: any;
  open?: boolean;
  defaultCurrent?: number;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  defaultCurrent: 0,
});

const current = ref(props.defaultCurrent);

function handleChange(step: number) {
  current.value = step;
}

function handleClose() {
  current.value = 0;
}
</script>
