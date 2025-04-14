import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { deletarUsuario, listarUsuarios } from '../../service/apiUsuario'
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Paginacao from "../../components/Pagination";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function Usuarios() {
    const navigate = useNavigate()

    const [usuarios, setUsuarios] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [usuarioAExcluir, setusuarioAExcluir] = useState();
    const [paginacao, setPaginacao] = useState({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0
    });

    const carregarUsuarios = (pagina) => {
        listarUsuarios(setUsuarios, pagina, 20, "nome,asc", setPaginacao);
    };

    useEffect(() => {
        carregarUsuarios(0);
    }, [])

    const confirmarExclusao = (id) => {
        setusuarioAExcluir(id)
        setExibirModal(true)
    }

    const cancelarExclusao = () => {
        setusuarioAExcluir()
        setExibirModal(false)
    }

    const excluirUsuario = async () => {
        await deletarUsuario(usuarioAExcluir, setExibirModal)
        await listarUsuarios(setUsuarios)
    }

    return (
        <>
            <Header />
            <section id="usuario" className="container justify-content-center align-items-center">
                <h1 className="text-center p-4"> Usuários Cadastrados </h1>
                <div className="d-flex mb-3">
                    <button className="rounded-pill p-2 text-white bg-primary border-0 d-flex justify-content-center align-items-center gap-1" onClick={() => navigate("/usuarios/cadastro")}>
                        <IoMdAdd />
                        Cadastar Usuário
                    </button>
                </div>
                <table className="table table-bordered table-hover m-0">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Idade</th>
                            <th scope="col">Status</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id} className="text-center">
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nome}</td>
                                <td>{usuario.cpf}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.idade}</td>
                                <td>{usuario.status}</td>
                                <td className="d-flex gap-2">
                                    <button type="button" className="btn btn-warning rounded-pill d-flex justify-content-center align-items-center gap-1" onClick={() => navigate(`/usuarios/${usuario.id}`)}>
                                        <MdEdit />
                                        Editar</button>
                                    <button type="button" className="btn btn-danger rounded-pill d-flex justify-content-center align-items-center gap-1" onClick={() => confirmarExclusao(usuario.id)}>
                                        <MdDelete />
                                        Excluir</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <Paginacao totalPages={paginacao.totalPages} currentPage={paginacao.currentPage} onPageChange={carregarUsuarios} />
            </section>
            {exibirModal && (
                <Modal
                    titulo={"Confirmação de exclusão"}
                    texto={"Deseja excluir o usuário?"}
                    textoBotao1={"Sim, excluir."}
                    onClickBotao1={excluirUsuario}
                    textoBotao2={"Não, cancelar."}
                    onClickBotao2={cancelarExclusao}
                />)}
            <Footer />
        </>
    )
}

export default Usuarios