import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login"
import Erro404 from "../pages/Erro404"
import Dashboard from "../pages/Dashboard";
import Usuario from "../pages/Usuario";
import UsuarioForm from "../pages/Usuario/UsuarioForm";
import ProjetoForm from "../pages/Projeto/ProjetoForm";
import Projeto from "../pages/Projeto";
import TarefaForm from "../pages/Tarefa/TarefaForm";
import Tarefas from "../pages/Tarefa";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route index path="/dashboard" element={<Dashboard/>} />
                <Route index path="/usuarios/cadastro" element={<UsuarioForm/>} />
                <Route index path="/usuarios/:id" element={<UsuarioForm/>} />
                <Route index path="/usuarios" element={<Usuario/>} />
                <Route index path="/projetos/cadastro" element={<ProjetoForm/>} />
                <Route index path="/projetos/:id" element={<ProjetoForm/>} />
                <Route index path="/projetos" element={<Projeto/>} />
                <Route index path="/tarefas/cadastro" element={<TarefaForm/>} />
                <Route index path="/tarefas/:id" element={<TarefaForm/>} />
                <Route index path="/tarefas" element={<Tarefas/>} />
                <Route index path="*" element={<Erro404 />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Rotas;