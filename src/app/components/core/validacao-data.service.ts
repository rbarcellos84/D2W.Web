import { Injectable } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoDataService {
  
  static validarDatas: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;

    let dataCriacao = form.get('dataCriacao')?.value;
    let dataConclusao = form.get('dataConclusao')?.value;

    let erros: ValidationErrors = {};

    if (!dataCriacao && dataConclusao) {
      erros['dataCriacaoObrigatoria'] = true;
    }

    if (dataCriacao && dataConclusao) {
      if (new Date(dataConclusao) < new Date(dataCriacao)) {
        erros['dataConclusaoInvalida'] = true;
      }
    }

    return Object.keys(erros).length > 0 ? erros : null;
  };
}
