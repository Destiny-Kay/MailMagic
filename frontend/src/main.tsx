import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@radix-ui/themes/styles.css"
import { Theme } from '@radix-ui/themes'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme accentColor='purple' grayColor="gray" panelBackground="solid" appearance='light' radius='small'  >
      <RouterProvider router={router}/>
    </Theme>
  </StrictMode>,
)
