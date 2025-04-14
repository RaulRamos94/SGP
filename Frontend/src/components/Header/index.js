import logo from '../../assets/sgp_logo_horizontal.png';
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";

function Header() {

    // const { usuarioLogado } = useContext(GlobalContexts)

    return (
        <nav className="navbar p-0 m-0 bg-info-subtle">
                <div className="ms-5">
                    <Link to="/usuarios" className="d-flex justify-content-center">
                        <img src={logo} alt="Treina Recife" width="250px" />
                    </Link>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <Link to="/home" className="navbar-brand d-flex justify-content-center align-items-center gap-1">
                    <IoHomeOutline />
                    Home</Link>
                    <Link to="/projetos" className="navbar-brand d-flex justify-content-center align-items-center gap-1">
                    <GrProjects />
                    Projetos</Link>
                    <Link to="/tarefas" className="navbar-brand d-flex justify-content-center align-items-center gap-1">
                    <BsListTask />
                    Tarefas</Link>
                    <Link to="/usuarios" className="navbar-brand d-flex justify-content-center align-items-center gap-1">
                    <FaUsers />
                    Usuários</Link>
                </div>
                <div className="d-flex justify-content-center align-items-center me-5">
                    <button className="d-flex justify-content-center align-items-center gap-1 border-0 bg-transparent" >
                        <IoIosLogOut size={32}/>
                    </button>
                </div>
        </nav>
    );
}

export default Header;