<template>
  <a-spin :spinning="spinning" :size="size" :tip="tip" :delay="delay" :indicator="indicator">
    <div class="spin-wrapper">
      <slot />
    </div>
  </a-spin>
</template>

<script setup lang="ts">
defineOptions({ name: 'Spin' });

interface Props {
  spinning?: boolean | any;
  size?: 'small' | 'default' | 'large';
  tip?: string;
  delay?: number;
  indicator?: any;
}

withDefaults(defineProps<Props>(), {
  spinning: true,
  size: 'default',
  tip: '',
  delay: 0,
  indicator: undefined,
});
</script>

<style scoped>
.spin-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
