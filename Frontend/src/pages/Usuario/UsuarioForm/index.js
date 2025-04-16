import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { obterEndereco } from "../../../service/apiCep";
import Modal from "../../../components/Modal";
import { editarUsuario, obterDadosUsuario, salvarUsuario } from "../../../service/apiUsuario";
import { useNavigate, useParams } from "react-router-dom";
import { formatarData } from "../../../utils";

function UsuarioForm() {
    const navigate = useNavigate()
    const { id } = useParams();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [status, setStatus] = useState("");
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [complemento, setComplemento] = useState("");
    const [exibirModal, setExibirModal] = useState(false)

    useEffect(() => {
        if (id) {
            obterDadosUsuario(
                id,
                setNome,
                setCpf,
                setEmail,
                setDataNascimento,
                setSenha,
                setStatus,
                setCep,
                setLogradouro,
                setNumero,
                setBairro,
                setCidade,
                setEstado,
                setComplemento
            )
        }
    }, [])

    const cadastrarUsuario = async (e) => {
        e.preventDefault();

        const payload = {
            nome,
            cpf,
            email,
            senha,
            dataNascimento: formatarData(dataNascimento),
            status,
            endereco: {
                cep,
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                complemento
              }
        }
        if (id) {
            await editarUsuario(id, payload, setExibirModal)
        } else {
            await salvarUsuario(payload, setExibirModal)
        }
    };

    const confirmarCadastro = () => {
        setExibirModal(false)
        navigate("/usuarios")
    }

    const formatarCPF = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');
        return apenasNumeros
            .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            .substring(0, 14);
    };

    const formatarCEP = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');
        return apenasNumeros
            .replace(/(\d{5})(\d{3})/, '$1-$2')
            .substring(0, 10);
    };

    useEffect(() => {
        if (cep.length === 9) {
            obterEndereco(cep, setLogradouro, setBairro, setCidade, setEstado);
        }
    }, [cep]);


    return (
        <>
            <Header />
            <div className="d-flex justify-content-center">
                <main className="bg-light rounded rounded-3 mt-4">
                <form id="usuario-form" className="container row justify-content-center" onSubmit={cadastrarUsuario}>
                    <h1 className="text-center mt-2 text-white">Dados do Usuário</h1>
                    <div className="col-md-8 col-12">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="col-md-2 col-12">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input type="text" className="form-control" id="cpf" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(formatarCPF(e.target.value))} />
                    </div>
                    <div className="col-md-4 col-12 mt-2">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" className="form-control" id="email" placeholder="email@email.com.br" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-md-2 col-12 mt-2">
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <div className="col-md-2 col-12 mt-2">
                        <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                        <input type="date" className="form-control" id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                    </div>
                    <div className="col-md-2 col-12 mt-2">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option disabled value="">Selecione o status</option>
                            <option value={"ATIVO"}>Ativo</option>
                            <option value={"INATIVO"}>Inativo</option>
                        </select>
                    </div>
                    <p className="text-center mt-4 mb-0">Endereço</p>
                    <div className="container row justify-content-center">
                        <div className="col-md-2 col-12 mt-2">
                            <label htmlFor="cep" className="form-label">CEP</label>
                            <input type="text" className="form-control" id="cep" placeholder="00.000-000" value={cep} onChange={(e) => setCep(formatarCEP(e.target.value))} />
                        </div>
                        <div className="col-md-6 col-12 mt-2">
                            <label htmlFor="logradouro" className="form-label">Logradouro</label>
                            <input type="text" className="form-control" id="logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} disabled />
                        </div>
                        <div className="col-md-2 col-12 mt-2">
                            <label htmlFor="numero" className="form-label">Número</label>
                            <input type="text" className="form-control" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                        </div>

                        <div className="col-md-3 col-12 mt-2">
                            <label htmlFor="bairro" className="form-label">Bairro</label>
                            <input type="text" className="form-control" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} disabled />
                        </div>
                        <div className="col-md-3 col-12 mt-2">
                            <label htmlFor="complemento" className="form-label">Complemento</label>
                            <input type="text" className="form-control" id="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                        </div>

                        <div className="col-md-2 col-12 mt-2">
                            <label htmlFor="cidade" className="form-label">Cidade</label>
                            <input type="text" className="form-control" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} disabled />
                        </div>
                        <div className="col-md-2 col-12 mt-2">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <input type="text" className="form-control" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} disabled />
                        </div>
                        <div className="d-flex justify-content-center gap-2 p-4">
                            <button type="submit" className="btn btn-primary rounded-pill">Salvar</button>
                            <button type="reset" className="btn btn-danger rounded-pill" onClick={() => navigate("/usuarios")}>Cancelar</button>
                        </div>
                    </div>
                </form>
                {exibirModal && (<Modal
                    titulo={"Confirmação de cadastro"}
                    texto={`Usuário ${id ? "atualizado" : "cadastrado"} com sucesso.`}
                    textoBotao1="OK"
                    onClickBotao1={confirmarCadastro}
                />)}
                </main>
            </div>
            <Footer />
        </>
    )

}

export default UsuarioForm