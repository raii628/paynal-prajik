import { Suspense, useEffect, useState, lazy } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { getMessage } from './services/axios'
import './App.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
      setMessage(response.data.message);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className='flex justify-center'>
      <Suspense fallback={<SkeletonHydrate />}>
        <h1 className="text-3xl font-bold underline">{message}</h1>
      </Suspense>
      <Skeleton count={3} highlightColor='#00023d' />
    </div>
  )
}

export default App
