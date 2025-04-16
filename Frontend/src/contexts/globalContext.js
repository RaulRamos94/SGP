import { createContext, useEffect, useState } from "react";

export const GlobalContexts = createContext({})

export const GlobalProvider = ({children}) => {
    const [usuarioLogado, setUsuarioLogado] = useState();
    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuarioLogado");
        if (usuarioSalvo) {
            setUsuarioLogado(JSON.parse(usuarioSalvo));
        }
    }, []);

    const login = (dadosUsuario) => {

        if(dadosUsuario?.manterConectado){
            localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario))
        }
        sessionStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario))
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