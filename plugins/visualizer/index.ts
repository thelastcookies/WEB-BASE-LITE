import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

export const VisualizerPluginConfig: PluginOption = visualizer({
  open: false,
  filename: 'stats.html',
  template: 'treemap',
  gzipSize: true,
  brotliSize: true,
});
