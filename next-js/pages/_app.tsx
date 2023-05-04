import type { AppProps } from 'next/app'
import Layout from "../components/Layout";
import wrapper from '../store/store';

const App = ({ Component, pageProps }: AppProps) =>  {
    return <Layout>
        <Component {...pageProps} />
    </Layout>
}

export default wrapper.withRedux(App)

