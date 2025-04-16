import logo from '../../assets/sgp_logo_horizontal.png';
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { useContext, useState } from 'react';
import { GlobalContexts } from '../../contexts/globalContext';
import './header.css'

function Header() {

    // const { usuarioLogado } = useContext(GlobalContexts)

    return (
        <nav className="navbar p-0 m-0 bg-light p-3">
            <div className="ms-5">
                <Link to="/usuarios" className="d-flex justify-content-center">
                    <img src={logo} alt="Treina Recife" width="250px" />
                </Link>
            </div>
            <div className="me-5">
                <div className="d-flex justify-content-center align-items-center me-5 gap-4">
                    <Link to="/home" className="navbar-brand d-flex flex-column align-items-center opcoes">
                        <IoHomeOutline />
                        Home
                    </Link>
                    <Link to="/projetos" className="navbar-brand d-flex d-flex flex-column align-items-center opcoes">
                        <GrProjects />
                        Projetos
                    </Link>
                    <Link to="/tarefas" className="navbar-brand d-flex d-flex flex-column align-items-center opcoes">
                        <BsListTask />
                        Tarefas
                    </Link>
                    <Link to="/usuarios" className="navbar-brand d-flex d-flex flex-column align-items-center opcoes">
                        <FaUsers />
                        Usuários
                    </Link>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center me-4">
                <p>Bem-vindo, !</p>
                <div>
                    <Link to="/" className="d-flex justify-content-center align-items-center gap-1 border-0 bg-transparent text-decoration-none opcoes" >
                        Sair<IoIosLogOut size={32} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;