import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Step } from '../../interfaces/step.interface';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-generic-steps',
  templateUrl: './generic-steps.component.html',
  styleUrls: ['./generic-steps.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()]
})
export class GenericStepsComponent implements OnInit {
  @Input() steps!: Step[];
  @Input() form!: FormGroup;
  @Input() linear: boolean = false;
  @Input() customErrors: { [key: string]: string } = {};
  @Input() submitButtonText: string = 'Salvar';
  @Input() submitDisabled: boolean = false;
  @Input() isEditing = false;
  @Input() buttonText = 'Salvar';
  @Input() isViewing = false;
  @Output() submitForm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  
  currentStepIndex: number = 0;
  showSteps: boolean = true;

  ngOnInit() {
    console.log('Formulário no GenericStepsComponent:', {
      form: this.form,
      anexos: this.form.get('anexos'),
      steps: this.steps
    });
  }

  onStepChange(event: any) {
    this.currentStepIndex = event.selectedIndex;
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  onSubmit() {
    console.log('Form estado no submit:', {
      valid: this.form.valid,
      dirty: this.form.dirty,
      touched: this.form.touched,
      errors: this.form.errors
    });
    
    if (this.isViewing) {
      return;
    }
    
    if (this.form.valid) {
      const formValue = this.form.value;
      
      // Processa os campos de arquivo
      Object.keys(formValue).forEach(key => {
        const control = this.form.get(key);
        if (control && (control as any)._files) {
          if (this.isEditing && Array.isArray(formValue[key])) {
            const existingFiles = formValue[key].filter((value: any) => !(value instanceof File));
            formValue[key] = [...existingFiles, ...(control as any)._files];
          } else {
            formValue[key] = (control as any)._files;
          }
        }
      });
      
      this.submitForm.emit(formValue);
    }
  }

  shouldShowResetButton(): boolean {
    return !this.isLastStep();
  }

  isLastStep(): boolean {
    return this.currentStepIndex === this.steps.length - 1;
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control && control.errors && control.touched) {
      if (control.errors['required']) {
        return 'Campo obrigatório';
      }
      if (control.errors['email']) {
        return 'Email inválido';
      }
      if (control.errors['emailExists'] && this.customErrors['emailExists']) {
        return this.customErrors['emailExists'];
      }
      if (control.errors['backendError']) {
        return control.errors['backendError'];
      }
    }
    return '';
  }

  onSelectOpen(field: any) {
    console.log('Select aberto:', field.label);
    if (field.onOpen) {
      field.onOpen();
    }
  }

  onSelectChange(event: any, element: any, fieldOrName: any) {
    if (element && typeof fieldOrName === 'string') {
      // Se for um campo da tabela
      element[fieldOrName] = event.value;
      this.form.markAsDirty();
      this.form.markAsTouched();
    } else {
      // Se for um campo normal do formulário
      const field = fieldOrName;
      if (field && field.onChange) {
        field.onChange(event.value);
      }
    }
  }

  getOptions(field: any): any[] {
    if (typeof field.options === 'function') {
      return field.options();
    }
    return field.options || [];
  }

  onCancel() {
    // Permite cancelar tanto em modo de visualização quanto edição
    
    // Limpa os arquivos armazenados
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && (control as any)._files) {
        // Se estiver editando, mantém os anexos existentes
        if (this.isEditing && control.value && Array.isArray(control.value)) {
          // Filtra os anexos existentes que não foram excluídos
          control.setValue(control.value.filter((value: any) => !(value instanceof File)));
        } else {
          delete (control as any)._files;
        }
      }
    });
    
    this.cancel.emit();
  }

  getColumnFields(field: any): string[] {
    return field.tableConfig?.columns.map((col: any) => col.field) || [];
  }
  
  /**
   * Helper method to check if a value is an array (for use in template)
   */
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  onFileChange(event: any, field: any) {
    console.log('onFileChange chamado:', {
      event: event,
      field: field,
      formControlName: field.formControlName
    });
    
    // Se estiver visualizando, não permite alterar os anexos
    if (this.isViewing) {
      return;
    }
    
    const files = event.target.files;
    if (files && files.length > 0) {
      const control = this.form.get(field.formControlName);
      if (!control) {
        console.warn('Controle não encontrado para o campo:', field.formControlName);
        return;
      }

      // Verifica o limite máximo de arquivos
      const currentFiles = control.value || [];
      const totalFiles = currentFiles.length + files.length;
      
      if (field.maxFiles && totalFiles > field.maxFiles) {
        console.warn(`Máximo de ${field.maxFiles} arquivos permitidos. Você já tem ${currentFiles.length} arquivos.`);
        return;
      }

      // Adiciona os novos arquivos à lista existente
      const newFiles = Array.from(files);
      const updatedValue = [...currentFiles, ...newFiles];
      
      // Atualiza o valor do controle
      control.setValue(updatedValue);
      
      // Armazena os arquivos em uma propriedade separada para processamento posterior
      if (!(control as any)._files) {
        (control as any)._files = [];
      }
      (control as any)._files.push(...newFiles);
      
      // Limpa o input de arquivo
      event.target.value = '';
      
      // Marca o controle como tocado e atualiza a validade
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }

  onDeleteFile(field: any, index: number): void {
    console.log('onDeleteFile chamado:', {
      field: field,
      index: index
    });
    
    // Se estiver visualizando, não permite excluir anexos
    if (this.isViewing) {
      return;
    }
    
    const control = this.form.get(field.formControlName);
    if (!control) {
      console.warn('Controle não encontrado para o campo:', field.formControlName);
      return;
    }

    const currentValue = control.value || [];
    if (!Array.isArray(currentValue)) {
      console.warn('O valor do controle não é um array:', currentValue);
      return;
    }

    // Remove o arquivo do array de valores
    const newValue = [...currentValue];
    newValue.splice(index, 1);
    control.setValue(newValue);
    
    // Se estiver editando, marca o arquivo como excluído
    if (this.isEditing && (control as any)._files) {
      (control as any)._files.splice(index, 1);
    }
    
    // Marca o controle como tocado e atualiza a validade
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  getFileName(file: any): string {
    if (file instanceof File) {
      return file.name;
    } else if (file.anexo) {
      return file.anexo.urlBlobArquivo.split('/').pop() || 'Arquivo';
    }
    return 'Arquivo';
  }

  onViewFile(file: any): void {
    if (file instanceof File) {
      // Para novos arquivos, criar uma URL temporária
      const url = URL.createObjectURL(file);
      window.open(url, '_blank');
    } else if (file.anexo && file.anexo.urlBlobArquivo) {
      // Para arquivos existentes, abrir a URL do blob
      window.open(file.anexo.urlBlobArquivo, '_blank');
    }
  }

  onDateChange(event: any, element: any, field: string) {
    element[field] = event.value;
    this.form.markAsDirty();
    this.form.markAsTouched();
  }

  onTextChange(event: any, element: any, field: string): void {
    const newValue = event.target.value;
    element[field] = newValue;
    this.form.markAsDirty();
  }
}
