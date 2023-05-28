import { Layout } from './components/header/layout';
import { Home } from './components/header/home';
import { Login } from './components/authentication/login';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Venue } from './components/venues/venue';
import { Registration } from './components/authentication/registerUser';
import { createContext, useState } from 'react';
import { Dashboard } from './components/profilePortal/dashboard';
import { CreateVenuePage } from './components/venues/createVenuePage';
import { UpdateVenue } from './components/venues/updateVenue';

/**
 * Variable that sets the user context to the application
 */
export const UserContext = createContext(null);

/**
 * App component that renders the application
 */
function App() {
  /**
   * useState function that sets the values to the user context
   */
  const [ currentUser, setCurrentUser ] = useState(null);

  console.log(currentUser);

  return (
    <div>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/venues/:id' element={<Venue />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />}/>
            <Route path='/profiles/:name' element={<Dashboard />}/>
            <Route path='/venues/createvenue' element={<CreateVenuePage />} />
            <Route path='/venues/updatevenue/:id' element={<UpdateVenue />}/>
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App;
