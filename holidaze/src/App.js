import { ApiHook } from './components/api';
import { Navigation } from './components/header/navigation';
import './App.css';

function App() {
  const { data, loading, error } = ApiHook("https://api.noroff.dev/api/v1/holidaze/venues");
  return <div>
    <Navigation />
  </div>
}

export default App;
