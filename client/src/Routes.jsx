import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Form from './pages/Form';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home/>}/>
      <Route path="/form" element={<Form/>}/>
    </Routes>
  );
};

export default AppRoutes;