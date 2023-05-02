import { ICoffeeStore } from '@/interfaces';
import { coffeeStoreReducer } from '@/state/reducers/storeReducer';
import { StoreContext, initialState } from '@/store/store-context';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactNode, createContext, useReducer } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(coffeeStoreReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}
