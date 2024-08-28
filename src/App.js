import logo from './logo.svg';
import './App.css';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import { AuthProvider } from './stores/authProvider';
import ResetPassword from './pages/resetPassword';
import { BrowserRouter,Route,Routes,Navigate,Link } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn/>} />
              <Route path="/signUp" element={<SignUp/>} />
              <Route path="/resetPassword" element={<ResetPassword/>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
  );
}

export default App;