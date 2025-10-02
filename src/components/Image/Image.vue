<template>
  <a-image
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :preview="preview"
    :fallback="fallback"
    :placeholder="placeholder"
  >
    <template v-if="$slots.previewMask" #previewMask>
      <slot name="previewMask" />
    </template>
  </a-image>
</template>

<script setup lang="ts">
defineOptions({ name: 'Image' });

interface Props {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  preview?: boolean;
  fallback?: string;
  placeholder?: any;
}

withDefaults(defineProps<Props>(), {
  alt: '',
  preview: true,
  width: '100%',
  height: 'auto',
});
</script>
