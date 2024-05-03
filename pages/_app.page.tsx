import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps /* , AppContext */ } from 'next/app';

import Layout from '@/components/Layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
