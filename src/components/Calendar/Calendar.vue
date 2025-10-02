<template>
  <a-calendar
    v-model:value="innerValue"
    :fullscreen="fullscreen"
    :disabled-date="disabledDate"
    :mode="mode"
    :valid-range="validRange"
  >
    <template #dateCellRender="{ current }">
      <slot name="dateCellRender" :current="current" />
    </template>

    <template #monthCellRender="{ current }">
      <slot name="monthCellRender" :current="current" />
    </template>
  </a-calendar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Dayjs } from 'dayjs';

defineOptions({ name: 'Calendar' });

interface Props {
  modelValue?: Dayjs;
  fullscreen?: boolean;
  disabledDate?: (date: Dayjs) => boolean;
  mode?: 'month' | 'year';
  validRange?: [Dayjs, Dayjs];
}

const props = withDefaults(defineProps<Props>(), {
  fullscreen: true,
  mode: 'month',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Dayjs): void;
  (e: 'panelChange', value: Dayjs, mode: 'month' | 'year'): void;
}>();

const innerValue = ref<Dayjs | undefined>(props.modelValue);

watch(
  () => props.modelValue,
  val => {
    innerValue.value = val;
  },
);

watch(innerValue, val => {
  if (val) emit('update:modelValue', val);
});
</script>
