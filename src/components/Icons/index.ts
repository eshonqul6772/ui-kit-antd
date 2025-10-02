import { Component } from 'vue';

const iconCache = new Map<string, Component>();

// 🔹 Custom icons
export async function loadAllCustomIcons() {
  const modules = import.meta.glob('./icons/*.vue');
  for (const path in modules) {
    const name = path.split('/').pop()?.replace('.vue', '')!;
    const comp = (await modules[path]()) as any;
    iconCache.set(name, comp.default);
  }
}

// 🔹 Dynamic getter
export function useIcon(name: string): Component {
  if (iconCache.has(name)) {
    return iconCache.get(name)!;
  }
  console.warn(`[useIcon] Icon topilmadi: ${name}`);
  return iconCache.get('QuestionOutlined')!;
}

// 🔹 Load all
export async function loadIcons() {
  await loadAllCustomIcons();
}
