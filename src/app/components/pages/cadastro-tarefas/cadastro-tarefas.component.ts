import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacaoDataService } from '../../core/validacao-data.service'; 
import { ApiConfigService } from '../../../config/api-config.service'; 
import { TarefaEstadoService } from '../../core/tarefa-estado.service'; 

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})

export class CadastroTarefasComponent {
  mensagem: string = '';
  apiUrl: string = '';
  estadoTarefaLista: { codigo: number, descricao: string }[] = [];

  constructor(private httpClient: HttpClient, 
              private apiConfig: ApiConfigService,
              private tarefaEstadoService: TarefaEstadoService) {
    this.apiUrl = this.apiConfig.getApiBaseUrl();
  }

  form = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    descricao: new FormControl('', [Validators.maxLength(300)]),
    estado: new FormControl('', [Validators.required]),
    dataCriacao: new FormControl(null),
    dataConclusao: new FormControl(null)
  }, { validators: ValidacaoDataService.validarDatas });

  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.carregarStatusTarefa();
  }

  carregarStatusTarefa() {
    this.tarefaEstadoService.listarStatusTarefa().subscribe({
      next: (data) => {
        this.estadoTarefaLista = data;
      },
      error: (err) => {
        console.error("Erro ao buscar status da tarefa:", err);
      }
    });
  }

  isFormValid(): boolean {
    const tituloValido = !!this.form.get('titulo')?.valid;
    const estadoValido = !!this.form.get('estado')?.valid;
    const semErrosDeData = !this.form.errors?.['dataConclusaoInvalida'];

    return tituloValido && estadoValido && semErrosDeData;
  }

  onSubmit() {
    let dataCriacao = this.form.get('dataCriacao')?.value || new Date().toISOString().split('T')[0];;
    const dataConclusao = this.form.get('dataConclusao')?.value;

    if (!dataCriacao && dataConclusao) {
      this.mensagem = "A data de criação é obrigatória quando a data de conclusão é informada!";
      return;
    }

    if (dataCriacao && dataConclusao && new Date(dataConclusao) < new Date(dataCriacao)) {
      this.mensagem = "A data de conclusão deve ser maior ou igual à data de criação!";
      return;
    }

    const formData = {
      titulo: this.form.get('titulo')?.value,
      descricao: this.form.get('descricao')?.value,
      dataCriacao: this.form.get('dataCriacao')?.value || dataCriacao,
      dataConclusao: this.form.get('dataConclusao')?.value,
      estado: Number(this.form.get('estado')?.value) || 0
    };

    this.httpClient.post(`${this.apiUrl}Tarefa/CadastrarTarefa`, formData)
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.mensagem;
          this.form.reset();
        },
        error: (error) => {
          if (error.status === 400) {
            this.mensagem = error.error?.mensagem || "Erro 400: Requisição inválida.";
          } else if (error.status === 500) {
            this.mensagem = error.error?.mensagem || "Erro 500: Problema interno no servidor.";
          }
        }
      });
  }
}

