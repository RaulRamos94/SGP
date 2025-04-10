import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip} from 'chart.js';
import { LISTA_PROJETOS } from "../../mocks/projetos";
import { LISTA_TAREFAS } from "../../mocks/tarefas";
import { LISTA_USUARIOS } from "../../mocks/usuarios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    
);

function Dashboard() {
    const labels = LISTA_PROJETOS.map((projeto) => projeto.nome);

    const optionsVerticalBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Status das Tarefas por Projeto',
            },
        },
        maintainAspectRatio: false
    };

    const optionsHorizontalBar = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Prioridade das Tarefas por Projeto',
            },
        },
        maintainAspectRatio: false
    };

    const dataVerticalBar = {
        labels,
        datasets: [
            {
                label: 'PENDENTE',
                data: [
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.status === 'PENDENTE' && tarefa.projeto.nome === labels[0])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.status === 'PENDENTE' && tarefa.projeto.nome === labels[1])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.status === 'PENDENTE' && tarefa.projeto.nome === labels[2])).length
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'FAZENDO',
                data: [
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.status === 'FAZENDO' && tarefa.projeto.nome === labels[0])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.status === 'FAZENDO' && tarefa.projeto.nome === labels[1])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.status === 'FAZENDO' && tarefa.projeto.nome === labels[2])).length
                ],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'FINALIZADA',
                data: [
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.status === 'FINALIZADA' && tarefa.projeto.nome === labels[0])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.status === 'FINALIZADA' && tarefa.projeto.nome === labels[1])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.status === 'FINALIZADA' && tarefa.projeto.nome === labels[2])).length
                ],
                backgroundColor: 'rgba(53, 235, 90, 0.5)',
            }
        ],
    };

    const dataHorizontalBar = {
        labels,
        datasets: [
            {
                label: 'ALTA',
                data: [
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.prioridade === 'ALTA' && tarefa.projeto.nome === labels[0])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.prioridade === 'ALTA' && tarefa.projeto.nome === labels[1])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.prioridade === 'ALTA' && tarefa.projeto.nome === labels[2])).length
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'MEDIA',
                data: [
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.prioridade === 'MEDIA' && tarefa.projeto.nome === labels[0])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.prioridade === 'MEDIA' && tarefa.projeto.nome === labels[1])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.prioridade === 'MEDIA' && tarefa.projeto.nome === labels[2])).length
                ],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'BAIXA',
                data: [
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.prioridade === 'BAIXA' && tarefa.projeto.nome === labels[0])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.prioridade === 'BAIXA' && tarefa.projeto.nome === labels[1])).length,
                    LISTA_TAREFAS.filter((tarefa) => (tarefa.prioridade === 'BAIXA' && tarefa.projeto.nome === labels[2])).length
                ],
                backgroundColor: 'rgba(53, 235, 90, 0.5)',
            },
        ],
    };

    const dataPieChart = {
        labels: ['ATIVO', 'INATIVO'],
        datasets: [
            {
                label: 'No. Usuarios',
                data: [
                    LISTA_USUARIOS.filter((usuario) => (usuario.status === 'ATIVO')).length,
                    LISTA_USUARIOS.filter((usuario) => (usuario.status === 'INATIVO')).length,
                ],
                backgroundColor: [
                    'rgba(17, 255, 0, 0.2)',
                    'rgba(255, 0, 0, 0.2)',
                ]
            },
        ],
    };

    return (
        <>
            <Header />
            <section className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <Bar
                                options={optionsVerticalBar}
                                data={dataVerticalBar}
                                width={850}
                                height={350}
                            />
                        </div>
                        <div className="col-md-6 col-12">
                            <Bar 
                                options={optionsHorizontalBar} 
                                data={dataHorizontalBar} 
                                width={850}
                                height={350}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-conten-center mt-4">
                    <div className="col-md-6 col-12">
                        <Pie
                            data={dataPieChart}
                            options={{ maintainAspectRatio: false }}
                            width={250}
                            height={250}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Dashboard;