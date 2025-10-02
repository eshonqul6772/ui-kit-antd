<template>
  <a-comment :author="author" :avatar="avatar" :content="content" :datetime="datetime">
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>

    <template v-if="$slots.avatar" #avatar>
      <slot name="avatar" />
    </template>

    <template v-if="$slots.author" #author>
      <slot name="author" />
    </template>

    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>

    <template v-if="$slots.datetime" #datetime>
      <slot name="datetime" />
    </template>
  </a-comment>
</template>

<script setup lang="ts">
defineOptions({ name: 'Comment' });

interface Props {
  author?: string;
  avatar?: string;
  content?: string;
  datetime?: string;
}

withDefaults(defineProps<Props>(), {
  author: '',
  avatar: '',
  content: '',
  datetime: '',
});
</script>
