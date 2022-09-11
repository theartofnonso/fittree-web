import Head from "next/head";
import {Provider} from "react-redux";
import store from "../store/store";
import {Amplify} from "@aws-amplify/core";
import awsConfigs from '../src/aws-exports';

Amplify.configure({...awsConfigs, ssr: true});

function MyApp({Component, pageProps}) {

    return (
        <>
            <Head>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
                <link rel="icon" href="/fittr_symbol_small.svg"/>
                <title>Fittree | Your workouts everywhere</title>
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export default MyApp
