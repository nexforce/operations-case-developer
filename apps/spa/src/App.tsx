import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from '@/pages/Home'
import CreatePetForm from './pages/CreatePetForm';
import Pets from './pages/Pets';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/pets',
    element: <Pets />
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
