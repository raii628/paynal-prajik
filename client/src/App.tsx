import { useEffect, useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { getMessage } from './services/axios'
import './App.css'

// Wrap the app component in the auth provider for global state management
// Routing must be done in the MainContent component
const App = () => {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  )
}

const MainContent = () => {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    try {
      const response = await getMessage();
      console.log(response);
      setMessage(response.message);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <>
      <h1 className='text-3xl'>React TypeScript Flask Starter</h1>
      <h1 className='text-3xl'>{message}</h1>
    </>
  )
}

export default App
