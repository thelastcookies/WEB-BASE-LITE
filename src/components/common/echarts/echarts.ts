import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 常用的组件
echarts.use([
  // 各组件
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
  // 各图表类型
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  // Renderer
  CanvasRenderer,
]);

export default echarts;
