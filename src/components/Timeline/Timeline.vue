<template>
  <a-timeline :mode="mode">
    <a-timeline-item
      v-for="(item, index) in items"
      :key="index"
      :color="item.color"
      :label="item.label"
    >
      {{ item.content }}
    </a-timeline-item>
  </a-timeline>
</template>

<script setup lang="ts">
defineOptions({ name: 'Timeline' });

interface TimelineItem {
  content: string;
  color?: string;
  label?: string;
}

interface Props {
  items: TimelineItem[];
  mode?: 'left' | 'alternate' | 'right';
}

withDefaults(defineProps<Props>(), {
  mode: 'left',
});
</script>
