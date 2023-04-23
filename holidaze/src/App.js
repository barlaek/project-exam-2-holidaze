import { Layout } from './components/header/layout';
import { Home } from './components/header/home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Venue } from './components/venues/venue';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/:id' element={<Venue />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
