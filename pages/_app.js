import '../styles/globals.css'
import Head from "next/head";
import {Provider} from "react-redux";
import store from "../store/store";
import {Amplify} from "@aws-amplify/core";
import awsConfigs from '../src/aws-exports';

Amplify.configure({...awsConfigs, ssr: true});

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title></title>
        </Head>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
      </>
  )
}

export default MyApp
