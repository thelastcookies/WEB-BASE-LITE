import type { AsyncComponentLoader, Component } from 'vue';

const Configs = import.meta.glob('./*.vue');

export const FormComponentConfigs = (() => {
  let formComponentConfigs: Record<string, Component> = {};
  Object.keys(Configs).forEach((key) => {
    const name = key.replace(/^.+\/C([^/]+)\.vue$/, '$1');
    formComponentConfigs[name] = defineAsyncComponent(Configs[key] as AsyncComponentLoader);
  });
  return formComponentConfigs;
})();
