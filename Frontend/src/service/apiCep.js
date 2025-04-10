import axios from "axios";

export const apiCep = axios.create({
    baseURL: "https://viacep.com.br"
})

export const obterEndereco = async (cep, setLogradouro, setBairro, setCidade, setEstado) => {
    await apiCep.get(`/ws/${cep}/json/`)
            .then((resposta) => {
                const endereco = resposta.data
                setLogradouro(endereco?.logradouro);
                setBairro(endereco?.bairro);
                setCidade(endereco?.localidade);
                setEstado(endereco?.estado);
            })
            .catch((erro) => {
                console.error("Cep não encontrado", erro)
            })
}