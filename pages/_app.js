import '@/styles/globals.scss'
import { StoreProvider } from '@/context/cartContext'

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
