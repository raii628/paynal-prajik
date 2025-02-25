import axios from 'axios'
import { Suspense, lazy, useEffect, useState } from 'react'
import './App.css'

const SkeletonHydrate = lazy(() => import('./motions/SkeletonHydrate'))

const App = () => {
  const [message, setMessage] = useState<string>("");

  const fetchMessage = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
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
