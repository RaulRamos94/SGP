import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Paginacao from "../../components/Pagination";
import { deletarProjeto, listarProjetos } from "../../service/apiProjeto";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function Projeto() {
    const navigate = useNavigate()

    const [projetos, setProjetos] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [projetoAExcluir, setProjetoAExcluir] = useState();

    useEffect(() => {
        listarProjetos(setProjetos)
        carregarProjetos(0);
    }, [])

    const [paginacao, setPaginacao] = useState({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0
    });

    const carregarProjetos = (pagina) => {
        listarProjetos(setProjetos, pagina, 20, "nome,asc", setPaginacao);
    };

    const confirmarExclusao = (id) => {
        setProjetoAExcluir(id)
        setExibirModal(true)
    }

    const cancelarExclusao = () => {
        setProjetoAExcluir()
        setExibirModal(false)
    }

    const excluirProjeto = async () => {
        await deletarProjeto(projetoAExcluir, setExibirModal)
        await listarProjetos(setProjetos)
    }

    return (
        <>
            <Header />
            <section id="projeto" className="container justify-content-center align-items-center">
                <h1 className="text-center p-4"> Projetos Cadastrados </h1>
                <div className="d-flex mb-3">
                    <button className="rounded-pill p-2 text-white bg-primary border-0 d-flex justify-content-center align-items-center gap-1" onClick={() => navigate("/projetos/cadastro")}>
                    <IoMdAdd />
                    Cadastar Projeto
                    </button>
                </div>
                <table className="table table-bordered table-hover m-0">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Responsavel</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projetos.map((projeto) => (
                            <tr key={projeto.id} className="text-center">
                                <th scope="row">{projeto.id}</th>
                                <td>{projeto.nome}</td>
                                <td>{projeto.descricao}</td>
                                <td>{projeto.responsavel.nome}</td>
                                <td className="d-flex justify-content-center align-items-center gap-2">
                                    <button type="button" className="btn btn-warning rounded-pill d-flex justify-content-center align-items-center gap-1" onClick={() => navigate(`/projetos/${projeto.id}`)}>
                                        <MdEdit />
                                        Editar
                                    </button>
                                    <button type="button" className="btn btn-danger rounded-pill d-flex justify-content-center align-items-center gap-1" onClick={() => confirmarExclusao(projeto.id)}>
                                        <MdDelete />
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <Paginacao totalPages={paginacao.totalPages} currentPage={paginacao.currentPage} onPageChange={carregarProjetos} />
            </section>
            {exibirModal && (
                <Modal
                    titulo={"Confirmação de exclusão"}
                    texto={"Deseja excluir o Projeto?"}
                    textoBotao1={"Sim, excluir."}
                    onClickBotao1={excluirProjeto}
                    textoBotao2={"Não, cancelar."}
                    onClickBotao2={cancelarExclusao}
                />)}
            <Footer />
        </>
    )
}

export default Projeto