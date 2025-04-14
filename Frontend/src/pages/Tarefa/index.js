import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { deletarTarefa, listarTarefas } from "../../service/apiTarefa";
import Paginacao from "../../components/Pagination";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function Tarefa() {
    const navigate = useNavigate()

    const [projetos, setProjetos] = useState([]);
    const [tarefas, setTarefas] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [tarefaAExcluir, setTarefaAExcluir] = useState();

    useEffect(() => {
        carregarTarefas(0)
    }, [])

    const [paginacao, setPaginacao] = useState({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0
    });

    const carregarTarefas = (pagina) => {
        listarTarefas(setTarefas, pagina, 20, "titulo,asc", setPaginacao);
    };

    const confirmarExclusao = (id) => {
        setTarefaAExcluir(id)
        setExibirModal(true)
    }

    const cancelarExclusao = () => {
        setTarefaAExcluir()
        setExibirModal(false)
    }

    const excluirTarefa = async () => {
        await deletarTarefa(tarefaAExcluir, setExibirModal)
        await listarTarefas(setTarefas)
    }

    return (
        <>
            <Header />
            <section id="tarefa" className="container justify-content-center align-items-center">
                <h1 className="text-center p-4"> Tarefas Cadastradas </h1>
                <div className="d-flex mb-3">
                    <button className="rounded-pill p-2 text-white bg-primary border-0 d-flex justify-content-center align-items-center gap-1" onClick={() => navigate("/tarefas/cadastro")}>
                        <IoMdAdd />
                        Cadastar Tarefa
                    </button>
                </div>
                <table className="table table-bordered table-hover m-0">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">Id</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Data de Criação</th>
                            <th scope="col">Data de Conclusão</th>
                            <th scope="col">Prioridade</th>
                            <th scope="col">Status</th>
                            <th scope="col">Projeto</th>
                            <th scope="col">Responsável</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tarefas.map((tarefa) => (
                            <tr key={tarefa.id} className="text-center">
                                <th scope="row">{tarefa.id}</th>
                                <td>{tarefa.titulo}</td>
                                <td>{tarefa.dataCriacao}</td>
                                <td>{tarefa.dataConclusao}</td>
                                <td>{tarefa.prioridade}</td>
                                <td>{tarefa.status}</td>
                                <td>{tarefa.projeto.nome}</td>
                                <td>{tarefa.usuario.nome}</td>
                                <td className="d-flex gap-2">
                                    <button type="button" className="btn btn-warning rounded-pill d-flex justify-content-center align-items-center gap-1" onClick={() => navigate(`/tarefas/${tarefa.id}`)}>
                                        <MdEdit />
                                        Editar</button>
                                    <button type="button" className="btn btn-danger rounded-pill d-flex justify-content-center align-items-center gap-1" onClick={() => confirmarExclusao(tarefa.id)}>
                                        <MdDelete />
                                        Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginacao totalPages={paginacao.totalPages} currentPage={paginacao.currentPage} onPageChange={carregarTarefas} />
            </section>
            {exibirModal && (
                <Modal
                    titulo={"Confirmação de exclusão"}
                    texto={"Deseja excluir a tarefa?"}
                    textoBotao1={"Sim, excluir."}
                    onClickBotao1={excluirTarefa}
                    textoBotao2={"Não, cancelar."}
                    onClickBotao2={cancelarExclusao}
                />)}
            <Footer />
        </>
    )
}

export default Tarefa