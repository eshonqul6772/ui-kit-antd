<template>
  <a-statistic
    :title="title"
    :value="value"
    :precision="precision"
    :prefix="prefix"
    :suffix="suffix"
  />
</template>

<script setup lang="ts">
defineOptions({ name: 'Statistic' });
interface Props {
  title?: string;
  value: number | string;
  precision?: number;
  prefix?: string | any;
  suffix?: string | any;
}

withDefaults(defineProps<Props>(), {
  title: '',
  precision: undefined,
  prefix: undefined,
  suffix: undefined,
});
</script>
