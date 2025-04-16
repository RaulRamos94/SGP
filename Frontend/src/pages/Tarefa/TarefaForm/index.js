import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Modal from "../../../components/Modal";
import { listarUsuarios } from "../../../service/apiUsuario";
import { useNavigate, useParams } from "react-router-dom";
import { formatarData } from "../../../utils";
import { editarTarefa, obterDadosTarefa, salvarTarefa } from "../../../service/apiTarefa";
import { listarProjetos } from "../../../service/apiProjeto";

function TarefaForm() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [titulo, setTitulo] = useState("");
    const [dataCriacao, setDataCriacao] = useState("");
    const [dataConclusao, setDataConclusao] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [status, setStatus] = useState("");
    const [projetoId, setProjetoId] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [exibirModal, setExibirModal] = useState(false)
    const [usuarios, setUsuarios] = useState([]);
    const [projetos, setProjetos] = useState([]);

    useEffect(() => {
        listarUsuarios(setUsuarios)
        listarProjetos(setProjetos)
        if (id) {
            obterDadosTarefa(
                id,
                setTitulo,
                setDataCriacao,
                setDataConclusao,
                setPrioridade,
                setStatus,
                setProjetoId,
                setUsuarioId
            )
        }
    }, [])

    const cadastrarTarefa = async (e) => {
        e.preventDefault();

        const payload = {
            titulo,
            dataCriacao: formatarData(dataCriacao),
            dataConclusao: formatarData(dataConclusao),
            prioridade,
            status,
            projeto: {
                id: projetoId
            },
            usuario: {
                id: usuarioId
            }
        }
        if (id) {
            await editarTarefa(id, payload, setExibirModal)
        } else {
            await salvarTarefa(payload, setExibirModal)
        }
    };

    const confirmarCadastro = () => {
        setExibirModal(false)
        navigate("/tarefas")
    }

    useEffect(() => {
    }, []);


    return (
        <>
            <Header />
            <div className="d-flex justify-content-center">
  <main className="bg-light rounded rounded-3 mt-4 p-4">
    <form id="usuario-form" className="container row justify-content-center" onSubmit={cadastrarTarefa}>
      <h1 className="text-center mt-2 text-white">Dados da Tarefa</h1>

      {/* Título - col-md-6 */}
      <div className="col-12 col-md-4 mt-2">
        <label htmlFor="titulo" className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      {/* Todos os outros com col-md-2 */}
      <div className="col-12 col-md-2 mt-2">
        <label htmlFor="dataCriacao" className="form-label">Data de Criação</label>
        <input
          type="date"
          className="form-control"
          id="dataCriacao"
          value={dataCriacao}
          onChange={(e) => setDataCriacao(e.target.value)}
        />
      </div>

      <div className="col-12 col-md-2 mt-2">
        <label htmlFor="dataConclusao" className="form-label">Data de Conclusão</label>
        <input
          type="date"
          className="form-control"
          id="dataConclusao"
          value={dataConclusao || ''}
          onChange={(e) => setDataConclusao(e.target.value)}
        />
      </div>

      <div className="w-100"></div> {/* Força quebra de linha */}

<div className="col-12 col-md-2 mt-2">
  <label htmlFor="prioridade" className="form-label">Prioridade</label>
  <select
    className="form-select"
    id="prioridade"
    value={prioridade}
    onChange={(e) => setPrioridade(e.target.value)}
  >
    <option disabled>Selecione a Prioridade</option>
    <option value={"BAIXA"}>Baixa</option>
    <option value={"MEDIA"}>Média</option>
    <option value={"ALTA"}>Alta</option>
  </select>
</div>


      <div className="col-12 col-md-2 mt-2">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          className="form-select"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option disabled>Selecione o Status</option>
          <option value={"PENDENTE"}>Pendente</option>
          <option value={"FAZENDO"}>Fazendo</option>
          <option value={"FINALIZADA"}>Finalizada</option>
        </select>
      </div>

      <div className="col-12 col-md-2 mt-2">
        <label htmlFor="projeto" className="form-label">Projeto</label>
        <select
          className="form-select"
          id="projeto"
          value={projetoId}
          onChange={(e) => setProjetoId(e.target.value)}
        >
          <option value="Selecione o projeto" disabled>Selecione o Projeto</option>
          {projetos.map((projeto) => (
            <option key={projeto.id} value={projeto.id}>
              {projeto.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-2 mt-2">
        <label htmlFor="responsavel" className="form-label">Responsável</label>
        <select
          className="form-select"
          id="responsavel"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        >
          <option disabled>Selecione o responsável</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Botões */}
      <div className="d-flex justify-content-center gap-2 p-4">
        <button type="submit" className="btn btn-primary rounded-pill">Salvar</button>
        <button type="reset" className="btn btn-danger rounded-pill" onClick={() => navigate("/tarefas")}>Cancelar</button>
      </div>
    </form>

    {exibirModal && (
      <Modal
        titulo={"Confirmação de cadastro"}
        texto={`Tarefa ${id ? "atualizada" : "cadastrada"} com sucesso.`}
        textoBotao1="OK"
        onClickBotao1={confirmarCadastro}
      />
    )}
  </main>
</div>
            <Footer />
        </>
    )

}

export default TarefaForm