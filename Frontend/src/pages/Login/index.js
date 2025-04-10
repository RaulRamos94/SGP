import { useContext, useState } from "react";
import logo from "../../assets/sgp_logo_vertical.png"
import { useNavigate } from "react-router-dom";
import { GlobalContexts } from "../../contexts/globalContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useContext(GlobalContexts)

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [manterConectado, setManterConectado] = useState(true);

    const efetuarLogin = (e) => {
        e.preventDefault();
        const dadosUsuario = {email, senha, manterConectado}
        login(dadosUsuario)
        navigate("/usuarios")
    }

    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-center p-2">
                    <img src={logo} width="200px" alt="#"/>
                </div>
                <div className="d-flex justify-content-center align-items-center p-2">
                    <form onSubmit={efetuarLogin} className="bg-warning p-4 rounded-4">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={manterConectado} onChange={() => setManterConectado(!manterConectado)}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Salvar</label>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary rounded-pill">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login