import type { App } from 'vue';
import * as Components from './components';
import { loadIcons, useIcon } from './components/Icons';

const install = (app: App) => {
  Object.values(Components).forEach((c: any) => {
    if (c && c.name) {
      app.component(c.name, c);
    }
  });
};

export default { install };
export * from './components';
export { loadIcons, useIcon };
