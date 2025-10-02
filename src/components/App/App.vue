<template>
  <a-app :message="message" :notification="notification" :modal="modal">
    <slot />
  </a-app>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' });

interface Props {
  message?: any;
  notification?: any;
  modal?: any;
}

withDefaults(defineProps<Props>(), {
  message: undefined,
  notification: undefined,
  modal: undefined,
});
</script>
