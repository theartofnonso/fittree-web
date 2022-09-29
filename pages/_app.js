import Head from "next/head";
import {Provider} from "react-redux";
import store from "../store/store";
import {Amplify} from "@aws-amplify/core";
import awsConfigs from '../src/aws-exports';
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";
import styles from "../styles/index.css"

Amplify.configure({...awsConfigs, ssr: true});

Sentry.init({
    dsn: "https://ed0806683c484a74bac047f69ad21c44@o1400007.ingest.sentry.io/6746496",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

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
