import * as React from 'react';

function FacebookSvg(props) {
    return (
        <svg
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    d="M13 19.938A8.001 8.001 0 0 0 12 4a8 8 0 0 0-1 15.938V14H9v-2h2v-1.654c0-1.337.14-1.822.4-2.311.256-.484.652-.88 1.136-1.135.382-.205.857-.328 1.687-.381.329-.021.755.005 1.278.08v1.9H15c-.917 0-1.296.043-1.522.164a.727.727 0 0 0-.314.314c-.12.226-.164.45-.164 1.368V12h2.5l-.5 2h-2v5.938ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z"
                    fill="#EF7A75"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>    );
}

export default FacebookSvg;
