<script setup lang="ts">
import dayjs from 'dayjs';
import type { PickerItem, PickerTopic } from '@/components/slide-picker/types.ts';

// 处理时段选择
const pickerActive = ref(true);
const pickerTopic = ref(null as PickerTopic);
const handleSetDuration = (topic: PickerTopic) => {
  pickerActive.value = false;
  pickerTopic.value = topic;
};
const pickerValue = ref([
  [10, 11, 12],
  [6, 7, 8, 9, 13, 14, 15, 16],
  [2, 3, 4, 5, 17, 18, 19, 20, 21],
  [0, 1, 22, 23],
  [],
  [],
  [],
  [],
]);

const groupByConsecutiveNumbers = (numbers: number[]): number[][] => {
  if (numbers.length === 0) return [];

  numbers.sort((a, b) => a - b);

  let result: number[][] = [];
  let currentGroup: number[] = [numbers[0]];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === numbers[i - 1] + 1) {
      currentGroup.push(numbers[i]);
    } else {
      result.push(currentGroup);
      currentGroup = [numbers[i]];
    }
  }
  result.push(currentGroup);

  return result;
};

const pickerValueToTime = (arr: number[]) => {
  const groupedArr = groupByConsecutiveNumbers(arr);
  const timeArr = groupedArr.map(item => {
    const st = item[0];
    const ed = item[item.length - 1] + 1;
    return dayjs().startOf('day').add(st, 'hour').format('HH:mm') +
      '-' + dayjs().startOf('day').add(ed, 'hour').format('HH:mm');
  });
  return timeArr.join(',');
};

const max = 24;
const step = 24 / max * 60;

const picker = [{
  key: 'tip',
  label: 'topic0',
  color: '#FF4500',
}, {
  key: 'tip',
  label: 'topic1',
  color: '#568976',
}, {
  key: 'tip',
  label: 'topic2',
}, {
  key: 'tip',
  label: 'topic3',
}, {
  key: 'tip',
  label: 'topic4',
}, {
  key: 'tip',
  label: 'topic5',
}, {
  key: 'tip',
  label: 'topic6',
}, {
  key: 'tip',
  label: 'topic7',
}] as PickerItem[];

</script>
<template>
  <div class="w-full h-50% p-3 flex gap-3">
    <div class="w-70% flex justify-center">
      <SlidePicker
        :picker="picker"
        v-model:value="pickerValue"
        :max="max"
        :topic="pickerTopic"
        mark-type="center"
      >
        <template #mark="{ value, index }">
          {{ dayjs().startOf('day').add(index, 'hour').format('HH:mm') }}
        </template>
      </SlidePicker>
    </div>
    <div class="w-30%">
      <div class="text-5">SlidePicker</div>
      <div class="text-4">value:</div>
      <div v-for="(value, idx) in pickerValue">
        <span class="">topic{{ idx }}: </span><span>{{ value }}</span></div>
    </div>
  </div>
</template>
