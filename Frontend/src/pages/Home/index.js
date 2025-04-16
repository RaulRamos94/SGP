import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { listarUsuarios } from "../../service/apiUsuario";
import { listarTarefas } from "../../service/apiTarefa";
import { FaUser, FaTasks } from "react-icons/fa";
import { BsFolder2Open } from "react-icons/bs";
import { listarProjetos } from "../../service/apiProjeto";

function Dashboard() {
    const [usuarios, setUsuarios] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        listarUsuarios(setUsuarios);
        listarProjetos(setProjetos);
        listarTarefas(setTarefas);
    }, []);

    const contarPorStatusUsuario = () => {
        return usuarios.reduce((acc, usuario) => {
            acc[usuario.status] = (acc[usuario.status] || 0) + 1;
            return acc;
        }, {});
    };

    const contarPorStatusTarefa = () => {
        return tarefas.reduce((acc, tarefa) => {
            acc[tarefa.status] = (acc[tarefa.status] || 0) + 1;
            return acc;
        }, {});
    };

    const contarPorPrioridade = () => {
        return tarefas.reduce((acc, tarefa) => {
            acc[tarefa.prioridade] = (acc[tarefa.prioridade] || 0) + 1;
            return acc;
        }, {});
    };

    const statusUsuarios = contarPorStatusUsuario();
    const statusTarefas = contarPorStatusTarefa();
    const prioridadeTarefas = contarPorPrioridade();
    const qtdProjetos = projetos.length
    const qtdTarefas = tarefas.length
    const qtdUsuarios = usuarios.length

    return (
        <>
            <Header />
            <div className="container p-5">
                <h2 className="text-center mb-5 text-white">Sistema de Gestão de Projetos</h2>
                <div className="d-flex justify-content-center gap-5 flex-wrap">
                    <div className="p-4 bg-light rounded shadow text-center" style={{ minWidth: "200px" }}>
                        <FaUser size={40} className="text-primary mb-2" />
                        <h4>Usuários</h4>
                        <p></p>
                        <h3 className="mb-1 ">{qtdUsuarios}</h3>
                        <div className="d-flex justify-content-center gap-4">
                            <span>Ativos:</span> <span>{statusUsuarios.ATIVO || 0}</span>
                        </div>
                        <div className="d-flex justify-content-center gap-4">
                            <span>Inativos:</span> <span>{statusUsuarios.INATIVO || 0}</span>
                        </div>

                    </div>

                    <div className="p-4 bg-light rounded shadow text-center" style={{ minWidth: "200px" }}>
                        <BsFolder2Open size={40} className="text-success mb-2" />
                        <h4>Projetos</h4>
                        <p></p>
                        <h3 className="mb-1">{qtdProjetos || 0}</h3>
                    </div>

                    <div className="p-4 bg-light rounded shadow text-center" style={{ minWidth: "200px" }}>
                        <FaTasks size={40} className="text-warning mb-2" />
                        <h4>Tarefas</h4>
                        <p><h3>{qtdTarefas}</h3></p>
                        <div className="d-flex gap-4">
                            <div>
                                <h6>Status</h6>
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Pendente:</span> <span>{statusTarefas.PENDENTE || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Fazendo:</span> <span>{statusTarefas.FAZENDO || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-1 gap-4">
                                    <span>Finalizadas:</span> <span>{statusTarefas.FINALIZADA || 0}</span>
                                </div>
                            </div>
                            <div>
                                <h6>Prioridade</h6>
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Baixa:</span> <span>{prioridadeTarefas.BAIXA || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Média:</span> <span>{prioridadeTarefas.MEDIA || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Alta:</span> <span>{prioridadeTarefas.ALTA || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;