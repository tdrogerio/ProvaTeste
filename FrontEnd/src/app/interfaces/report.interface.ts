export interface ReportColumn {
  field: string;
  header: string;
  width: number;
  format?: (value: any) => string;
}

export interface ReportConfig {
  fileName: string;
  sheetName: string;
  columns: ReportColumn[];
} 