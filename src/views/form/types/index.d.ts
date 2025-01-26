import type { FormLabelAlign } from 'ant-design-vue/es/form/interface';

export interface FormConfig {
  layout: string;
  labelAlign: FormLabelAlign;
  labelWidth: number;
  size: SizeType;
}

export interface ComponentGroup {
  name: string;
  components: ComponentConfig[];
}

export type ComponentMode = 'view' | 'edit';

export type SizeType = 'large' | 'small' | undefined;

export interface ComponentConfig<T> {
  key?: string;
  name: string;
  type: string;
  icon?: string;
  mode?: ComponentMode;
  props: T;
}

export type ComponentConfigProps =
  BaseConfigProps
  | TextInputConfigProps
  | TextareaInputConfigProps
  | NumberInputConfigProps
  | ScoreConfigProps
  | PickerConfigProps
  | TimePickerConfigProps
  | EntityPickerConfigProps
  | TableListConfigProps
  | SpanLayoutConfigProps;

export interface BaseConfigProps {
  required?: boolean;
  size?: SizeType;
  placeholder?: string;
}

export interface TextInputConfigProps extends BaseConfigProps {
}

export interface TextareaInputConfigProps extends BaseConfigProps {
  max?: number;
}

export interface NumberInputConfigProps extends BaseConfigProps {
  max?: number;
  min?: number;
}

export interface ScoreConfigProps extends BaseConfigProps {
  color?: string;
  max?: number;
  showScore?: boolean;
  enableHalf?: boolean;
  icon?: string;
}

export interface PickerConfigProps extends BaseConfigProps {
  expanding?: boolean;
  options: string[];
}

export interface TimePickerConfigProps extends BaseConfigProps {
  format?: string;
  showLength?: boolean;
}

export interface EntityPickerConfigProps extends BaseConfigProps {
  multiple?: boolean;
}

export interface SpanLayoutConfigProps extends BaseConfigProps {
  isContainer: boolean;
  span: number;
  number: number;
  gutter: number;
  columns: any[];
}

export interface TableListConfigProps extends BaseConfigProps {
  showBorder?: boolean;
  showSummary?: boolean;
  summaryColumns?: any[];
  maxSize?: number;
  columns?: any[];
}

