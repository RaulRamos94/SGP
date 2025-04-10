import Header from "../../components/Header";
import logoErro from "../../assets/robo_404.png"
import Alert from "../../components/Alert"
import Footer from "../../components/Footer"

function Pagina404({ texto }) {
    return (
        <>
        <Header/>
        <section className="container" id="paginaNaoEncontrada">
            <div className="text-center">
                <Alert texto={"Erro 404: Essa página não existe"}/>
                <img src={logoErro} width={"40%"}></img>
            </div>
        </section>
        <Footer/>
        </>
    )
}

export default Pagina404;