import logo from './logo.svg';
import './App.css';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import { AuthProvider } from './stores/authProvider';
import GoogleSignIn from './pages/googleSignIn';

function App() {
  return (
      <div className="App">
        <AuthProvider>
            <SignUp/>
            <SignIn/>
            <GoogleSignIn/>
        </AuthProvider>
      </div>
  );
}

export default App;