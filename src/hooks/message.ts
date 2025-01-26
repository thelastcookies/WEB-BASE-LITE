import type { IFrameMessage } from '@/types';

/**
 * 向容器发送消息，实现系统无缝嵌入
 * @param message 消息
 */
export const useParentMessage = (message: IFrameMessage) => {
  const origin = import.meta.env.APP_CON_ORIGIN ?? '*';
  if (origin === '*') {
    console.warn(`message.ts: Missing APP_CON_ORIGIN configuration, '*' will be used as the targetOrigin.`);
  }
  window.parent.postMessage(message, origin);
};
