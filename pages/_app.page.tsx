import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps /* , AppContext */ } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';

import Layout from '@/components/Layout';
import AddOrderModal from '@/components/Modals/AddOrderModal/AddOrderModal';
import AddProductModal from '@/components/Modals/AddProductModal/AddProductModal';
import ConfirmModal from '@/components/Modals/ConfirmModal/ConfirmModal';
import { store } from '@/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AddProductModal />
      <AddOrderModal />
      <ConfirmModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default appWithTranslation(App);
