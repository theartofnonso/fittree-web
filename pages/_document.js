import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

class CustomDocument extends Document {
    render() {
        return (
            <Html>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </Html>
        );
    }
}

export default CustomDocument;
