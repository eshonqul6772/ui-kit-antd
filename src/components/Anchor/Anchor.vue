<template>
  <a-anchor
    :affix="affix"
    :show-ink-in-fixed="showInkInFixed"
    :bounds="bounds"
    :offset-top="offsetTop"
    :target-offset="targetOffset"
    :get-container="getContainer"
    :wrapper-class="wrapperClass"
    :wrapper-style="wrapperStyle"
    @click="onClick"
    @change="onChange"
  >
    <a-anchor-link
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :title="link.title"
      :target="link.target"
    >
      <template v-if="link.children">
        <a-anchor-link
          v-for="child in link.children"
          :key="child.href"
          :href="child.href"
          :title="child.title"
          :target="child.target"
        />
      </template>
    </a-anchor-link>
  </a-anchor>
</template>

<script setup lang="ts">
defineOptions({ name: 'Anchor' });

interface LinkItem {
  href: string;
  title: string;
  target?: string;
  children?: LinkItem[];
}

interface Props {
  links: LinkItem[];
  affix?: boolean;
  showInkInFixed?: boolean;
  bounds?: number;
  offsetTop?: number;
  targetOffset?: number;
  getContainer?: () => HTMLElement;
  wrapperClass?: string;
  wrapperStyle?: Record<string, any>;
}

withDefaults(defineProps<Props>(), {
  affix: true,
  showInkInFixed: false,
  bounds: 5,
  offsetTop: 0,
});

const emit = defineEmits<{
  (e: 'click', link: string, event: MouseEvent): void;
  (e: 'change', currentActiveLink: string): void;
}>();

function onClick(e: any) {
  emit('click', e.link, e.event);
}
function onChange(current: string) {
  emit('change', current);
}
</script>
