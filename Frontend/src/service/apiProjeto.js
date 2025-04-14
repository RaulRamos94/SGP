import { api } from "./api";
import { obterDadosUsuario } from "./apiUsuario";

export async function salvarProjeto(dadosProjeto, setExibirModal) {
    await api.post("/projetos", dadosProjeto)
        .then((response) => {
            if (response.status === 201) {
                setExibirModal(true)
            }
        })
        .catch((erro) => {
            alert("Erro ao cadastrar o projeto")
            console.error("Error ao cadastrar o projeto: ", erro)
        })
}
export async function listarProjetos(setProjetos, page = 0, size = 20, sort = "nome,asc", setPaginacao) {
    try {
        const response = await api.get("/projetos", {
            params: { page, size, sort }
        });

        if (response.status === 200) {
            const data = response.data;

            setProjetos(data.content);

            if (setPaginacao) {
                setPaginacao({
                    totalPages: data.totalPages,
                    currentPage: data.number,
                    totalElements: data.totalElements,
                });
            }
        }
    } catch (erro) {
        alert("Erro ao listar os projetos.");
        console.error("Erro ao exibir a lista de projetos: ", erro);
    }
}

export async function obterDadosProjeto(
    id, 
    setNome,
    setDescricao,
    setResponsavel
) {
    await api.get(`/projetos/${id}`)
        .then((response) => {
            if (response.status === 200) {
                setNome(response.data.nome)
                setDescricao(response.data.descricao)
                setResponsavel(response.data.responsavel.id)
            }
        })
        .catch((erro => {
            alert("Erro ao obter dados do usuário.")
            console.error("Erro ao obter dados do usuário.", erro)
        }))
}

export async function editarProjeto(id, dadosProjeto, setExibirModal) {
    await api.put(`/projetos/${id}`, dadosProjeto)
        .then((response) => {
            if (response.status === 200) {
               setExibirModal(true)
            }
        })
        .catch((erro) => {
            alert("Erro ao obter dados do usuário.")
            console.error("Erro ao obter dados do usuário.", erro)
        })
}

export async function deletarProjeto(id, setExibirModal) {
    await api.delete(`/projetos/${id}`)
    .then((response) => {
        if(response.status === 204){
            setExibirModal(false)
        }
    })
    .catch((erro) => {
        alert("Erro ao excluir usuário.")
        console.error("Erro ao excluir usuário.")
    })
    
}