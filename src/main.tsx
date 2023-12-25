import { App } from '@/App'
import '@/index.css'
import { Home } from '@/page/home'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> }
    ]
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
