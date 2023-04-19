import { ApiHook } from './components/api';
import './App.css';

function App() {
  const { data, loading, error } = ApiHook("https://api.noroff.dev/api/v1/holidaze/venues");
  return <div>
    Hello world
  </div>
}

export default App;
