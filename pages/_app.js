import Head from "next/head";
import {Provider} from "react-redux";
import store from "../store/store";
import {Amplify} from "@aws-amplify/core";
import awsConfigs from '../src/aws-exports';
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";
import Script from "next/script";

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
            <Script dangerouslySetInnerHTML={
                `(function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:3162126,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
            }/>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export default MyApp
