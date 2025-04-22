export type InputSize = 'xs-width' | 'small-width' | 'medium-width' | 'large-width' | 'xl-width' | 'full-width';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'mask';
  required?: boolean;
  mask?: string;
  options?: { value: any; label: string }[];
  validators?: any[];
  size?: InputSize;
  class?: string;
}

export interface FormConfig {
  title: string;
  fields: FormField[];
  showBackButton?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
} 