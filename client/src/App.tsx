import { Suspense, useEffect, useState, lazy } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { getMessage } from './services/axios'
import './App.css'

const SkeletonHydrate = lazy(() => import('./motions/SkeletonHydrate'))

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
  const [message, setMessage] = useState<string>("");

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
      <Suspense fallback={<SkeletonHydrate />}>
        <h1>{message}</h1>
      </Suspense>
    </>
  )
}

export default App
