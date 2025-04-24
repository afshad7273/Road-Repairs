import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './redux/Store.js'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Index from './routes/Index.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Index/>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  </StrictMode>
  </Provider>
)



