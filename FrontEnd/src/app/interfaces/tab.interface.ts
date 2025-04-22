export interface Tab {
  label: string;
  content: TabContent[];
}

export interface TabContent {
  type: string;
  label?: string;
  formControlName?: string;
  class?: string;
  appearance?: 'fill' | 'outline';
  options?: any[];
  rows?: number;
  mask?: string;
  width?: string;
  fields?: TabContent[];  // Para campos agrupados
}
