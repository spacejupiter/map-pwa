import './assets/style/style.css'
import MapContainer from './windows/map/map'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './windows/login/login';
import AuthProvider from './context/authcontext';
import ProtectedRoute from './windows/auth/requireAuth';
import Signup from './windows/login/signup';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes >
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/signup' element={<Signup/>}/>
        <Route element={<ProtectedRoute />}>
        <Route path ='/' element={<MapContainer/>}/>
        </Route>
        
      </Routes>
      
    </Router>
    </AuthProvider>
    
  )
}

export default App
