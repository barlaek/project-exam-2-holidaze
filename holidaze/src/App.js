import { Layout } from './components/header/layout';
import { Home } from './components/header/home';
import { Login } from './components/authentication/login';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Venue } from './components/venues/venue';
import { Registration } from './components/authentication/registerUser';
import UserContext from './components/context/context';

function App() {
  return (
    <div>
      <UserContext>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/:id' element={<Venue />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />}/>
          </Route>
        </Routes>
      </UserContext>
    </div>
  )
}

export default App;
