import { useContext } from 'react';
import logo from '../../assets/sgp_logo_horizontal.png';
import { GlobalContexts } from '../../contexts/globalContext';
import { Link } from 'react-router-dom';

function Header() {

    // const { usuarioLogado } = useContext(GlobalContexts)

    return (
        <nav className="navbar p-0 m-0">
            <div className="container justify-content-center bg-info-subtle p-4">
                <div className="d-flex justify-content-around">
                    <div>
                        <Link to="/usuarios" className="d-flex justify-content-center">
                            <img src={logo} alt="Treina Recife" width="250px" />
                        </Link>
                    </div>
                    <div className="d-flex p-4">
                        <Link to="/home" className="navbar-brand">Home</Link>
                        <Link to="/projetos" className="navbar-brand">Projetos</Link>
                        <Link to="/tarefas" className="navbar-brand">Tarefas</Link>
                        <Link to="/usuarios" className="navbar-brand">Usuários</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;