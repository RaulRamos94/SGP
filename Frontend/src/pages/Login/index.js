import { useContext, useState } from "react";
import logo from "../../assets/sgp_logo_vertical.png"
import { Link, useNavigate } from "react-router-dom";
import { GlobalContexts } from "../../contexts/globalContext";
import { IoPersonOutline } from "react-icons/io5";
import { SlLock } from "react-icons/sl";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../Login/login.css"

function Login() {

    const navigate = useNavigate();

    const { login } = useContext(GlobalContexts)

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [manterConectado, setManterConectado] = useState(false);

    const efetuarLogin = (e) => {
        e.preventDefault();
        const dadosUsuario = { email, senha, manterConectado }
        login(dadosUsuario)
        navigate("/home")
    }

    return (
        <>
            <div className="login-background">
                <div className="d-flex justify-content-center align-items-center p-2">
                    <form onSubmit={efetuarLogin} className="bg-light p-4 rounded-4">
                        <div className="d-flex justify-content-center">
                            <img src={logo} width="150px" alt="#" />
                        </div>
                        <div className="input-group mt-2 border border-1 rounded-2">
                            <span className="input-group-text bg-body border-0">
                                <IoPersonOutline size={20}  />
                            </span>
                            <input type="text" className="form-control border-0" id="exampleInputEmail1" placeholder="Usuário" value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>
                        <div className="input-group mt-3 border border-1 rounded-2">
                            <span className="input-group-text bg-body border-0">
                                <SlLock size={20}  />
                            </span>
                            <input type={mostrarSenha ? "text" : "password"} className="form-control border-0" id="exampleInputPassword1" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <span className="input-group-text bg-body border-0 opacity-75" style={{ cursor: "pointer" }} onClick={() => setMostrarSenha(!mostrarSenha)}>
                                {mostrarSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </span>
                        </div>
                        <div className="mt-2 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={manterConectado} onChange={() => setManterConectado(!manterConectado)} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Salvar</label>
                        </div>
                        <div className="text-center mt-2">
                            <button type="submit" className="botao">Login</button>
                        </div>
                        <div className="text-center mt-4 ">
                            <h6>Ainda não é cadastrado?</h6>
                            <Link to="/usuarios/cadastro" className="text-decoration-none">Cadastre-se</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login