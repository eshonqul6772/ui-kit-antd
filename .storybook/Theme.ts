// .storybook/YourTheme.ts
import { create } from '@storybook/theming';

export default create({
  base: 'light',
  colorPrimary: '#1e88e5',
  colorSecondary: '#ff7043',

  // UI
  appBg: '#f5f5f5',
  appContentBg: '#ffffff',
  appBorderColor: '#ddd',
  appBorderRadius: 12,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#333',
  textInverseColor: '#fff',

  // Toolbar default va active colors
  barTextColor: '#555',
  barSelectedColor: '#1e88e5',
  barBg: '#fafafa',

  brandTitle: 'VUE <img src="https://ladle.dev/img/logo.svg" alt="logo"/>',
  brandUrl: `https://sizning-saytingiz.com`,
});
