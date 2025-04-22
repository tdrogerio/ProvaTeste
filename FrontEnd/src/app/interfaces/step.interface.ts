export interface Step {
  label: string;
  content: StepContent[];
  optional?: boolean;
}

export interface StepContent {
  type: 'input' | 'textarea' | 'select' | 'date' | 'checkbox' | 'radio' | 'chip' | 'datepicker' | 'file' | 'table' | 'hidden';
  label: string;
  formControlName: string;
  validators?: any[];
  options?: any[];
  maxFiles?: number;
  accept?: string;
  rows?: number;
  tableConfig?: TableConfig;
  appearance?: 'outline' | 'fill';
  class?: string;
  optionType?: 'simple' | 'object';
  disabled?: boolean;
  inputType?: string;
  valueTransform?: (value: any) => any;
  mask?: string;
  errorMessages?: { [key: string]: string };
  onOpen?: () => void;
  value?: any;
  optionLabel?: string;
  optionValue?: string;
  onChange?: (value: any) => void;
}

export interface StepField {
  type: 'input' | 'select' | 'checkbox' | 'datepicker' | 'textarea';
  label: string;
  formControlName: string;
  appearance?: 'outline' | 'fill';
  class?: string;
  options?: any[];
  optionType?: 'simple' | 'object';
  errorMessages?: { [key: string]: string };
}

export interface TableColumn {
  field: string;
  header: string;
  type: string;
  validators?: any[];
  format?: string;
  options?: { value: any; label: string; [key: string]: any }[];
  optionType?: 'simple' | 'object';
  optionLabel?: string;
  optionValue?: string;
}

export interface TableConfig {
  columns: TableColumn[];
  actions: string[];
}
