import { createContext, useState } from "react";

export const GlobalContexts = createContext({})

export const GlobalProvider = ({children}) => {
    const [usuarioLogado, setUsuarioLogado] = useState();

    const login = (dadosUsuario) => {

        if(dadosUsuario?.manterConectado){
            localStorage.setItem("Usuário logado", JSON.stringify(dadosUsuario))
        }
        sessionStorage.setItem("Usuário logado", JSON.stringify(dadosUsuario))
        setUsuarioLogado(dadosUsuario)
    }
    const logout =() => {
        localStorage.removeItem("usuarioLogado")
        sessionStorage.removeItem("usuarioLogado")
    }
        
    return (
        <GlobalContexts.Provider value={{ usuarioLogado, login, logout}}>
            {children}
        </GlobalContexts.Provider>
    )
}