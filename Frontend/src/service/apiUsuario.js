import { api } from "./api";

export async function salvarUsuario(dadosUsuario, setExibirModal) {
    await api.post("/usuarios", dadosUsuario)
        .then((response) => {
            if (response.status === 201) {
                setExibirModal(true)
            }
        })
        .catch((erro) => {
            alert("Erro ao cadastrar usuário")
            console.error("Error ao cadastrar usuário: ", erro)
        })
}

export async function listarUsuarios(setUsuarios, page = 0, size = 20, sort = "nome,asc", setPaginacao) {
    try {
        const response = await api.get("/usuarios", {
            params: { page, size, sort }
        });

        if (response.status === 200) {
            const data = response.data;

            setUsuarios(data.content);

            if (setPaginacao) {
                setPaginacao({
                    totalPages: data.totalPages,
                    currentPage: data.number,
                    totalElements: data.totalElements,
                });
            }
        }
    } catch (erro) {
        alert("Erro ao listar os usuários.");
        console.error("Erro ao exibir a lista de usuários: ", erro);
    }
}


export async function obterDadosUsuario(
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
) {
    await api.get(`/usuarios/${id}`)
        .then((response) => {
            if (response.status === 200) {
                setNome(response.data.nome)
                setCpf(response.data.cpf)
                setEmail(response.data.email)
                setDataNascimento(response.data.dataNascimento)
                setSenha(response.data.senha)
                setStatus(response.data.status)

                const endereco = response.data.endereco || {};
                setCep(endereco.cep || "")
                setLogradouro(endereco.logradouro || "")
                setNumero(endereco.numero || "")
                setBairro(endereco.bairro || "")
                setCidade(endereco.cidade || "")
                setEstado(endereco.estado || "")
                setComplemento(endereco.complemento || "")
            }
        })
        .catch((erro => {
            alert("Erro ao obter dados do usuário.")
            console.error("Erro ao obter dados do usuário.", erro)
        }))
}

export async function editarUsuario(id, dadosUsuario, setExibirModal) {
    await api.put(`/usuarios/${id}`, dadosUsuario)
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


export async function deletarUsuario(id, setExibirModal) {
    await api.delete(`/usuarios/${id}`)
        .then((response) => {
            if (response.status === 204) {
                setExibirModal(false)
            }
        })
        .catch((erro) => {
            alert("Erro ao excluir usuário.")
            console.error("Erro ao excluir usuário.")
        })

}