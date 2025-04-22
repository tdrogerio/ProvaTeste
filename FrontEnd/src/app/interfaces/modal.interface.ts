import { TemplateRef } from '@angular/core';

export interface ModalConfig<T = any> {
  titulo: string;
  dados?: T;
  template?: TemplateRef<any>;
  largura?: string;
  altura?: string;
}

export interface ModalResult<T = any> {
  confirmado: boolean;
  dados?: T;
}
