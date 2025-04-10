
import { useState } from "react";
import Footer from "../../../components/Footer"
import Header from "../../../components/Header"
import { useNavigate } from "react-router-dom"

function ProjetoForm() {

        const [usuarios, setUsuarios] = useState([]);

    const navigate = useNavigate()
    return (
        <>
            <Header />
            <div className="d-flex justify-content-center">
                <form id="usuario-form" className="container justify-content-center">
                    <h1 className="text-center mt-2">Dados do Projeto</h1>
                    <div className="col-md-8 col-12">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" />
                    </div>
                    <div class="col-md-8 col-12 mt-2">
                        <label for="exampleFormControlTextarea1" class="form-label">Descrição do Projeto</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="col-md-2 col-12 mt-2">
                        <label htmlFor="responsavel" className="form-label">Responsavel</label>
                        <select className="form-select" id="responsavel">
                            <option value={""}>{usuarios.map((usuario) => (usuario.nome))}</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-center gap-2 p-4">
                            <button type="submit" className="btn btn-primary rounded-pill">Salvar</button>
                            <button type="reset" className="btn btn-danger rounded-pill" onClick={() => navigate("/projetos")}>Cancelar</button>
                        </div>
                </form>
                {/* {exibirModal && (<Modal
                    titulo={"Confirmação de cadastro"}
                    texto={`Usuário ${id ? "atualizado" : "cadastrado"} com sucesso.`}
                    textoBotao1="OK"
                    onClickBotao1={""}
                />)} */}
            </div>
            <Footer />
        </>
    )
}

export default ProjetoForm