import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from '@/pages/Home'
import CreatePetForm from './pages/CreatePetForm';
import Pets from './pages/Pets';
import PetDetails from './pages/PetDetails';
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
    path: '/pets/:id',
    element: <PetDetails />
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
