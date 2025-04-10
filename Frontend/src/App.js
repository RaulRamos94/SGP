import './App.css';
import { GlobalProvider } from './contexts/globalContext';
import Rotas from './routes';

function App() {
  return (
  <GlobalProvider>
    <Rotas/>
  </GlobalProvider>
  );
}

export default App;
