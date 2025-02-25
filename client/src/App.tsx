import { getMessage } from './services/axios'
import { useEffect, useState, Suspense, lazy } from 'react'
import './App.css'

const SkeletonHydrate = lazy(() => import('./motions/SkeletonHydrate'))

const App = () => {
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
    <div>
      <Suspense fallback={<SkeletonHydrate />}>
        <h1 className="text-3xl font-bold underline">{message}</h1>
      </Suspense>
    </div>
  )
}

export default App
