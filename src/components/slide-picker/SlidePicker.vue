<script setup lang="ts">
import { PickerItem, PickerTopic } from '@/components/slide-picker/types.ts';

// 定义 v-model 类型
const disabled = defineModel<boolean>('disabled', { default: true });
const topic = defineModel<PickerTopic>('topic', { default: null });
const value = defineModel<number[][]>('value', { default: () => [] });

// 定义 props
const props = withDefaults(defineProps<{
  min?: number | string;
  max?: number | string;
  markType?: 'center' | 'left' | 'right';
  picker: PickerItem[];
}>(), {
  min: 0,
  max: 10,
  markType: 'center',
  picker: () => [{
    key: 'key',
    label: '主题1',
  }],
});

// 定义 emit 事件
const emit = defineEmits<{
  (e: 'change'): void
  (e: 'update:value', value: Record<string, string[]>): void
}>();

// picker 容器 DOM
const _compRef = ref<HTMLInputElement | null>(null);

// 最小值
const _min = computed(() => {
  return isNaN(Number(props.min)) ? 0 : Number(props.min);
});
// 最大值
const _max = computed(() => {
  return isNaN(Number(props.max)) ? 10 : Number(props.max);
});

// 标注的初始化
const _marks = Array.from({ length: _max.value }, (_, idx) => _min.value + idx);
// 标注类型的初始化
const _markStyle = computed(() => {
  return ['center', 'left', 'right'].includes(props.markType) ? 'mark-' + props.markType : 'mark-center';
});

// picker 列表初始化
const _pickerList = ref<PickerItem[]>([]);
// 传入的 picker 数据修正
watch(() => props.picker, (pList: PickerItem[]) => {
  if (pList.length > 8) {
    pList = pList.slice(0, 8);
    console.warn(`SlidePicker.vue: The length of 'picker' exceeds the limit '8', the excess will be truncated.`);
  }
  _pickerList.value = pList;
}, { immediate: true });

// 用于记录点击开始时 picker 的 index 值
const _stIndex = ref<null | number>(null);
// 触发 picker 编辑状态
const handleSetTopic = (t: PickerTopic) => {
  topic.value = t;
  disabled.value = false;
};

// 设置退出状态
watch(disabled, (val) => {
  if (val) {
    _stIndex.value = null;
    clearTempTopic();
    topic.value = null;
  }
});

// picker 点击事件
const handlePickerClick = (e: Event, idx: number) => {
  if (disabled.value) return;
  setPickerTopic(e.target as HTMLDivElement, topic.value, 'is-temp-');
  if (_stIndex.value !== null) {
    clearTempTopic();
    const min = Math.min(_stIndex.value, idx);
    const max = Math.max(_stIndex.value, idx);
    const children = _compRef.value!.children;
    for (let i = min; i <= max; i++) {
      setPickerTopic(children[i] as HTMLDivElement, topic.value, 'is-');
    }
    emitValue();
    emit('change');
    disabled.value = true;
    topic.value = null;
    _stIndex.value = null;
  } else {
    _stIndex.value = idx;
  }
};

// 编辑状态下 picker 的鼠标悬停事件
const handlePickerMouseenter = (idx: number) => {
  if (disabled.value || _stIndex.value === null) return;
  const min = Math.min(_stIndex.value, idx);
  const max = Math.max(_stIndex.value, idx);
  const children = _compRef.value!.children;
  clearTempTopic();
  for (let i = min; i <= max; i++) {
    setPickerTopic(children[i] as HTMLDivElement, topic.value, 'is-temp-');
  }
};

// picker 状态设置方法
const setPickerTopic = (el: HTMLDivElement, topic: PickerTopic, prefix: string) => {
  const className = el.className;
  const reg = new RegExp(`${prefix}topic[0-7]`);
  const match = className.match(reg);
  if (match && match.length) {
    el.className = className.split(' ').filter(item => item !== match[0]).join(' ');
  }
  if (topic) el.className += ` ${prefix}${topic}`;
};

// 清除结束编辑时 picker 的临时状态
const clearTempTopic = () => {
  const children = _compRef.value!.children;
  for (let i = 0, len = children.length; i < len; i++) {
    const className = children[i].className;
    const match = className.match(/is-temp-topic[0-7]/);
    if (match && match.length) {
      children[i].className = className.split(' ').filter(item => item !== match[0]).join(' ');
    }
  }
};

// 数据 emit 前的处理
const emitValue = () => {
  const children = _compRef.value!.children;
  let v: number[][] = Array.from({ length: _pickerList.value.length }, () => []);
  for (let i = 0, len = children.length; i < len; i++) {
    const className = children[i].className;
    const match = className.match(/topic([0-7])/);
    if (match && match.length) {
      if (!v[Number(match[1])]) v[Number(match[1])] = [];
      v[Number(match[1])].push(i);
    }
  }
  value.value = v;
};

// 根据传入的 picker 设置，修改自定义颜色
// 在传入 value 更新时，同步更新 picker 状态
watchEffect(() => {
  if (!_compRef.value) return;
  const children = _compRef.value!.children;
  _pickerList.value.forEach((item, idx) => {
    if (item.color) {
      _compRef.value?.style.setProperty(`--topic${idx}-bg`, item.color);
    }
  });
  Array.from(children).forEach((_, idx) => {
    setPickerTopic(children[idx] as HTMLDivElement, null, 'is-');
  });
  value.value.forEach((topic, i) => {
    topic.forEach(idx => {
      setPickerTopic(children[idx] as HTMLDivElement, ('topic' + i) as PickerTopic, 'is-');
    });
  });
});

</script>

<template>
  <div class="slider-picker w-full">
    <div class="w-full flex px-12 box-border">
      <div class="flex mr-3 cursor-pointer" v-for="(item, idx) in _pickerList"
           @click="handleSetTopic(('topic' + idx) as PickerTopic)">
        <div class="w-4 h-4 mr-1" :class="['is-topic' + idx]" :style="{backgroundColor: item.color}"></div>
        <div class="">{{ item.label }}</div>
      </div>
    </div>
    <div class="picker-container my-8 w-full px-12 box-border flex"
         ref="_compRef"
         :class="[_markStyle, {'is-disabled': disabled}]"
    >
      <div class="picker"
           v-for="(mark, idx) in _marks"
           @click="handlePickerClick($event, idx)"
           @mouseenter="handlePickerMouseenter(idx)"
      >
        <div class="mark">
          <slot name="mark" :value="mark" :index="idx">
            {{ mark }}
          </slot>
        </div>
        <!--<slot name="addition">-->
        <!--<div v-if="idx === _marks.length - 1" class="mark -top-6 -right-5">24:00</div>-->
        <!--</slot>-->
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.slider-picker {
  --topic0-bg: #EF6E2D;
  --topic1-bg: #FCEF4C;
  --topic2-bg: #3476B8;
  --topic3-bg: #3DEEC9;
  --topic4-bg: #E83530;
  --topic5-bg: #72FF7B;
  --topic6-bg: #6BC4C9;
  --topic7-bg: #3DEEC9;
}

.picker {
  height: 2rem;
  width: 2rem;
  margin-right: 0.25rem;
  border: 2px solid;
  position: relative;
  transition-duration: 0.2s;
  cursor: pointer;
  background-color: var(--colorFill);

  &:nth-child(odd) {
    .mark {
      top: -1.5rem;
    }
  }

  &:nth-child(even) {
    .mark {
      bottom: -1.5rem;
    }
  }

  .mark {
    width: 100%;
    text-align: center;
    font-size: 12px;
    line-height: 1rem;
    position: absolute;
  }
}

.is-topic0,
.picker.is-temp-topic0 {
  background-color: var(--topic0-bg);
}

.is-topic1,
.picker.is-temp-topic1 {
  background-color: var(--topic1-bg);
}

.is-topic2,
.picker.is-temp-topic2 {
  background-color: var(--topic2-bg);
}

.is-topic3,
.picker.is-temp-topic3 {
  background-color: var(--topic3-bg);
}

.is-topic4,
.picker.is-temp-topic4 {
  background-color: var(--topic4-bg);
}

.is-topic5,
.picker.is-temp-topic5 {
  background-color: var(--topic5-bg);
}

.is-topic6,
.picker.is-temp-topic6 {
  background-color: var(--topic6-bg);
}

.is-topic7,
.picker.is-temp-topic7 {
  background-color: var(--topic7-bg);
}

.picker-container.mark-left {
  .mark {
    left: -1.25rem;
  }
}

.picker-container.mark-right {
  .mark {
    right: -1.25rem;
  }
}

.picker-container.is-disabled {
  .picker {
    cursor: auto;
  }
}
</style>
