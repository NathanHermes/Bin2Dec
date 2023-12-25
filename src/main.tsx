import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const routes = createBrowserRouter([
  {
    element: <App />
  }
])

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
)