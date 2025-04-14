import { api } from "./api";

export async function salvarTarefa(dadosTarefa, setExibirModal) {
    await api.post("/tarefas", dadosTarefa)
        .then((response) => {
            if (response.status === 201) {
                setExibirModal(true)
            }
        })
        .catch((erro) => {
            alert("Erro ao cadastrar o tarefa")
            console.error("Error ao cadastrar o tarefa: ", erro)
        })
}
export async function listarTarefas(setTarefas, page = 0, size = 10, sort = "titulo,asc", setPaginacao) {
    try {
        const response = await api.get("/tarefas", {
            params: { page, size, sort }
        });

        if (response.status === 200) {
            const data = response.data;

            setTarefas(data.content);

            if (setPaginacao) {
                setPaginacao({
                    totalPages: data.totalPages,
                    currentPage: data.number,
                    totalElements: data.totalElements,
                });
            }
        }
    } catch (erro) {
        alert("Erro ao listar as tarefas.");
        console.error("Erro ao exibir a lista de tarefas: ", erro);
    }
}

export async function obterDadosTarefa(
    id, 
    setTitulo,
    setDataCriacao,
    setDataConclusao,
    setPrioridade,
    setStatus,
    setProjeto,
    setUsuario
) {
    await api.get(`/tarefas/${id}`)
        .then((response) => {
            if (response.status === 200) {
                setTitulo(response.data.titulo)
                setDataCriacao(response.data.dataCriacao)
                setDataConclusao(response.data.dataConclusao)
                setPrioridade(response.data.prioridade)
                setStatus(response.data.status)
                setProjeto(response.data.projeto.id)
                setUsuario(response.data.usuario.id)
            }
        })
        .catch((erro => {
            alert("Erro ao obter dados da tarefa.")
            console.error("Erro ao obter dados da tarefa.", erro)
        }))
}

export async function editarTarefa(id, dadosTarefa, setExibirModal) {
    await api.put(`/tarefas/${id}`, dadosTarefa)
        .then((response) => {
            if (response.status === 200) {
               setExibirModal(true)
            }
        })
        .catch((erro) => {
            alert("Erro ao obter dados da tarefa.")
            console.error("Erro ao obter dados da tarefa.", erro)
        })
}

export async function deletarTarefa(id, setExibirModal) {
    await api.delete(`/tarefas/${id}`)
    .then((response) => {
        if(response.status === 204){
            setExibirModal(false)
        }
    })
    .catch((erro) => {
        alert("Erro ao excluir a tarefa.")
        console.error("Erro ao excluir a tarefa.")
    })
    
}