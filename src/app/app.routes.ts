import { Routes } from '@angular/router';
import { CadastroTarefasComponent } from './components/pages/cadastro-tarefas/cadastro-tarefas.component';
import { ConsultaTarefasComponent } from './components/pages/consulta-tarefas/consulta-tarefas.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "tarefas/cadastro",
        component: CadastroTarefasComponent
    },
    {
        path: "tarefas/consulta",
        component: ConsultaTarefasComponent
    },
    {
        path: "tarefas/dashboard",
        component: DashboardComponent
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/tarefas/dashboard"
    }
];
