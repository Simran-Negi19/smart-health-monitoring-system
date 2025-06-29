import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Result from './pages/Result';
import Header from './components/Header';
import PredictionHistory from "./pages/PredictionHistory";
import PrivateRoute from './components/PrivateRoute';
import Pneumonia from './pages/Pneumonia';
import Diabetes from './pages/Diabetes';
import SelectionPage from './components/SelectionPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {

  return (
    <BrowserRouter>
    <div className="min-h-screen w-full bg-gradient-to-r from-sky-100 to-emerald-100 ">
    <Header />
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
          
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/result" element={
          <PrivateRoute>
               <Result />
          </PrivateRoute>
          } />
        <Route path="/history" element={
          <PrivateRoute>
            <PredictionHistory />
          </PrivateRoute>
          } />

          <Route path="/pneumonia" element={
            <PrivateRoute>
               <Pneumonia />
            </PrivateRoute>
           } />

          <Route path="/diabetes" element={
            <PrivateRoute>
               <Diabetes />
            </PrivateRoute>
           } />

  <Route path="/selection" element={
  <PrivateRoute>
    <SelectionPage />
  </PrivateRoute>
  } />

  <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />

      </Routes>

    
    </div>
  </BrowserRouter>
  );
}

export default App;
