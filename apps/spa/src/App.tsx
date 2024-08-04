import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from '@/pages/Home'
import CreatePetForm from './pages/CreatePetForm';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/pet/adicionar',
    element: <CreatePetForm />
  }
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
