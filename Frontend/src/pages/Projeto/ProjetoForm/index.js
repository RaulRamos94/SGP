
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer"
import Header from "../../../components/Header"
import { useNavigate, useParams } from "react-router-dom"
import { listarUsuarios } from "../../../service/apiUsuario";
import Modal from "../../../components/Modal";
import { editarProjeto, obterDadosProjeto, salvarProjeto } from "../../../service/apiProjeto";

function ProjetoForm() {
    const { id } = useParams();

    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [responsavelId, setResponsavelId] = useState("");
    const [exibirModal, setExibirModal] = useState(false);

    useEffect(() => {
        listarUsuarios(setUsuarios)
        if (id) {
            obterDadosProjeto(
                id,
                setNome,
                setDescricao,
                setResponsavelId
            )
        }
    }, [])

    const cadastrarProjeto = async (e) => {
        e.preventDefault();

        const payload = {
            nome,
            descricao,
            responsavel: {
                id: responsavelId
            }
        }
        if (id) {
            await editarProjeto(id, payload, setExibirModal)
        } else {
            await salvarProjeto(payload, setExibirModal)
        }
    };

    const confirmarCadastro = () => {
        setExibirModal(false)
        navigate("/projetos")
    }



    const navigate = useNavigate()
    return (
        <>
            <Header />
            <main className="container bg-light rounded rounded-3 mt-4 w-75">
                <form id="usuario-form" className="d-flex flex-column align-items-center w-100" onSubmit={cadastrarProjeto}>
                    <h1 className="text-center mt-4 mb-4 text-white">Dados do Projeto</h1>

                    <div className="col-12 col-md-10 col-lg-6 mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>

                    <div className="col-12 col-md-8 col-lg-6 mb-3">
                        <label htmlFor="descricao" className="form-label">Descrição do Projeto</label>
                        <textarea className="form-control" id="descricao" value={descricao} rows={3} onChange={(e) => setDescricao(e.target.value)}></textarea>
                    </div>

                    <div className="col-12 col-md-8 col-lg-6 mb-4">
                        <label htmlFor="responsavel" className="form-label">Responsável</label>
                        <select className="form-select w-50" id="responsavel" value={responsavelId} onChange={(e) => setResponsavelId(e.target.value)}>
                            <option value="Selecione o responsável" disabled>Selecione o responsável</option>
                            {usuarios.map((responsavel) => (
                                <option key={responsavel.id} value={responsavel.id}>
                                    {responsavel.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="d-flex justify-content-center gap-3 mb-4">
                        <button type="submit" className="btn btn-primary rounded-pill">Salvar</button>
                        <button type="reset" className="btn btn-danger rounded-pill" onClick={() => navigate("/projetos")}>Cancelar</button>
                    </div>
                </form>
                {exibirModal && (<Modal
                    titulo={"Confirmação de cadastro"}
                    texto={`Projeto ${id ? "atualizado" : "cadastrado"} com sucesso.`}
                    textoBotao1="OK"
                    onClickBotao1={confirmarCadastro}
                />)}
            </main>
            <Footer />
        </>
    )
}

export default ProjetoForm