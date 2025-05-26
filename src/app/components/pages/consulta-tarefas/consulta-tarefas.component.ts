import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacaoDataService } from '../../core/validacao-data.service';
import { ApiConfigService } from '../../../config/api-config.service';
import { TarefaEstadoService } from '../../core/tarefa-estado.service';

declare var bootstrap: any;

@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consulta-tarefas.component.html',
  styleUrl: './consulta-tarefas.component.css'
})
export class ConsultaTarefasComponent implements OnInit {
  mensagem: string = '';
  apiUrl: string = '';
  estadoTarefaLista: { codigo: number, descricao: string }[] = [];
  tarefas: any[] = [];
  tarefaSelecionada: any;
  editModal: any;

  constructor(private httpClient: HttpClient,
              private apiConfig: ApiConfigService,
              private tarefaEstadoService: TarefaEstadoService) {
    this.apiUrl = this.apiConfig.getApiBaseUrl();
  }

  formPesquisa = new FormGroup({
    estado: new FormControl('', [Validators.required]),
  });

  formEdicao = new FormGroup({
    id: new FormControl(null),
    titulo: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    descricao: new FormControl('', [Validators.maxLength(300)]),
    estado: new FormControl('', [Validators.required]),
    dataCriacao: new FormControl(null),
    dataConclusao: new FormControl(null)
  }, { validators: ValidacaoDataService.validarDatas });

  ngOnInit(): void {
    this.carregarStatusTarefa();
    this.editModal = new bootstrap.Modal(document.getElementById('editModal'));
  }

  carregarStatusTarefa() {
    this.tarefaEstadoService.listarStatusTarefa().subscribe({
      next: (data) => this.estadoTarefaLista = data || [],
      error: (err) => {
        console.error("Erro ao buscar status da tarefa:", err);
      }
    });
  }

  obterEstado(codigo: number): string | undefined {
    const estadoEncontrado = this.estadoTarefaLista.find(estado => estado.codigo === codigo);
    return estadoEncontrado?.descricao;
  }

  get formControls() {
    return this.formEdicao.controls;
  }

  isFormValid(): boolean {
    return !!this.formPesquisa.get('estado')?.valid;
  }

  isFormValidModel(): boolean {
    const tituloValido = !!this.formEdicao.get('titulo')?.valid;
    const estadoValido = !!this.formEdicao.get('estado')?.valid;
    const semErrosDeData = !this.formEdicao.errors?.['dataConclusaoInvalida'];

    const dataConclusao = this.formEdicao.get('dataConclusao')?.value;
    const dataCriacao = this.formEdicao.get('dataCriacao')?.value;

    const dataConclusaoPreenchida = dataConclusao !== null && dataConclusao !== '';
    const dataCriacaoVazia = dataCriacao === null || dataCriacao === '';

    if (dataConclusaoPreenchida && dataCriacaoVazia) {
      return false;
    }

    if (!dataConclusaoPreenchida && dataCriacaoVazia) {
      return true;
    }

    return tituloValido && estadoValido && semErrosDeData;
  }

  onSubmit() {
    const estadoSelecionado = this.formPesquisa.get('estado')?.value;
    let estadoParaConsulta: number = (estadoSelecionado === '' || estadoSelecionado == null) ? 0 : Number(estadoSelecionado);

    this.httpClient.get<any[]>(`${this.apiUrl}Tarefa/ListarTarefas?estado=${estadoParaConsulta}`)
      .subscribe({
        next: (data) => {
          this.tarefas = Array.isArray(data) ? data : [];
          this.mensagem = data?.length ? '' : 'Nenhuma tarefa encontrada.';
        },
        error: (error) => {
          this.tarefas = [];
          if (error.status === 204) {
            this.mensagem = "Nenhuma tarefa encontrada.";
          } else if (error.status === 404) {
            this.mensagem = error.error?.mensagem || "Nenhuma tarefa encontrada.";
          } else {
            this.mensagem = "Erro ao buscar as tarefas.";
          }
        }
      });
  }

  onDelete(idParam: string) {
    if (confirm('Deseja realmente excluir?')) {
      let id = Number(idParam);
      this.httpClient.delete(`${this.apiUrl}Tarefa/ApagarTarefa/${id}`)
        .subscribe({
          next: (data: any) => {
            alert(data.mensagem);
            this.onSubmit();
          },
          error: (error) => {
            if (error.status === 400) {
              this.mensagem = error.error?.mensagem || "Erro 400: Requisição inválida.";
            } else if (error.status === 500) {
              this.mensagem = error.error?.mensagem || "Erro 500: Problema interno no servidor.";
            } else {
              this.mensagem = "Erro ao excluir a tarefa.";
            }
          }
        });
    }
  }

  abrirModal(tarefa: any) {
    this.tarefaSelecionada = tarefa;
    
    const dataCriacaoFormatada = tarefa.dataCriacao ? tarefa.dataCriacao.split('T')[0] : null;
    const dataConclusaoFormatada = tarefa.dataConclusao ? tarefa.dataConclusao.split('T')[0] : null;

    this.formEdicao.patchValue({
      id: tarefa.id,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      estado: tarefa.estado,
      dataCriacao: dataCriacaoFormatada,
      dataConclusao: dataConclusaoFormatada
    });

    this.editModal.show();
  }

  fecharModal() {
    this.editModal.hide();
  }

  onUpdate() {
    let dataCriacao = this.formEdicao.get('dataCriacao')?.value || new Date().toISOString().split('T')[0];;
    const dataConclusao = this.formEdicao.get('dataConclusao')?.value;

    if (!dataCriacao && dataConclusao) {
      this.mensagem = "A data de criação é obrigatória quando a data de conclusão é informada!";
      return;
    }

    if (dataCriacao && dataConclusao && new Date(dataConclusao) < new Date(dataCriacao)) {
      this.mensagem = "A data de conclusão deve ser maior ou igual à data de criação!";
      return;
    }

    const tarefaAtualizada = {
      id: this.tarefaSelecionada.id,
      titulo: this.formEdicao.get('titulo')?.value,
      descricao: this.formEdicao.get('descricao')?.value,
      dataCriacao: this.formEdicao.get('dataCriacao')?.value  || dataCriacao,
      dataConclusao: this.formEdicao.get('dataConclusao')?.value,
      estado: Number(this.formEdicao.get('estado')?.value) || 0
    };

    this.httpClient.put(`${this.apiUrl}Tarefa/AtualizarTarefa`, tarefaAtualizada).subscribe({
      next: () => {
        alert("Tarefa atualizada com sucesso!");
        this.fecharModal();
        this.onSubmit();
      },
      error: (err) => {
        console.error("Erro ao atualizar tarefa:", err);
        alert("Erro ao atualizar tarefa.");
      }
    });
  }
}
