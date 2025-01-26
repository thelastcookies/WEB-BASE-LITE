import type { EChartsOption } from 'echarts/types/dist/shared';

export const echartsLoadingOptions = {
  text: '',
  color: '#1668DC',
  maskColor: 'rgba(0, 0, 0, 0.5)',

  // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
  showSpinner: true,
  // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
  spinnerRadius: 16,
  // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
  lineWidth: 3,
};

export const generalLineChartOption = <EChartsOption>{
  grid: { top: '60px', bottom: '30px', left: '40px', right: '20px' },
  legend: {
    itemWidth: 10,
    itemHeight: 10,
    top: '20px',
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
      align: 'left',
    },
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: {
    type: 'category',
    gridIndex: 0,
    axisTick: { show: false },
    axisLabel: {
      showMinLabel: true,
      showMaxLabel: true,
      alignMinLabel: 'left',
      alignMaxLabel: 'right',
    },
  },
  yAxis: {
    type: 'value',
    gridIndex: 0,
    axisTick: { show: false },
    axisLabel: {
      hideOverlap: true,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
  },
};
