import type { ComponentResolver, ComponentResolveResult } from 'unplugin-vue-components/types';

export const customResolver: ComponentResolver = {
  type: 'component',
  resolve: (name: string): ComponentResolveResult => {
    if (name == 'VueDraggable') {
      return { name, from: 'vue-draggable-plus' };
    }
  },
};
