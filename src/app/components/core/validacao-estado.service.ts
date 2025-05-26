import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoEstadoService {
  static validando(control: AbstractControl): ValidationErrors | null {
    const valoresPermitidos = [1, 2, 3];
    return valoresPermitidos.includes(control.value) ? null : { estadoInvalido: true };
  }
}
