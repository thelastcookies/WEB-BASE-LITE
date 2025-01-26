<script lang="ts" setup>
import type { EChartsOption } from 'echarts/types/dist/shared';

const chartRef = ref<ComponentPublicInstance>();
const { renderECharts, setEChartsLoading } = useECharts(chartRef!);

onMounted(async () => {
  await renderECharts(merge(generalLineChartOption, {
    legend: {
      data: [
        { name: '实时负荷', icon: 'rect' },
        { name: '预测负荷', icon: 'rect' },
      ],
    },
    yAxis: {
      name: 'MW',
    },
    xAxis: {},
    series: [
      {
        name: '实时负荷',
        type: 'line',
        symbol: 'none',
      },
      {
        name: '预测负荷',
        type: 'line',
        step: 'start',
        connectNulls: true,
      },
    ],
  }));
});

const data = ref<any>();

const fetchTrend = async () => {
  const startTime = dayjs().subtract(8, 'h');
  data.value = await getTrendData({
    tags: 'tag1|tag2',
    st: startTime,
    interval: 1000,
    type: HisDataType.TIME_VALUE_ARR,
  });
  const options = {
    dataset: {
      source: data.value,
    },
  } as EChartsOption;
  await renderECharts(options);
};

setEChartsLoading(true);
useTimeoutFn(async () => {
  await fetchTrend();
  setEChartsLoading(false);
}, 3000);


</script>

<template>
  <div class="w-full">
    <div class="w-full h-300px flex p-8">
      <ECharts class="w-50%" ref="chartRef" />
      <div class="w-50% h-full pl-8 overflow-y-auto">
        <div class="text-5 sticky top-0 bg-pixel-matrix">ECharts Dataset</div>
        <div v-for="(item, key) in data" :key>{{ item }}</div>
      </div>
    </div>
  </div>
</template>
