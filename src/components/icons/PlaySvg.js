import * as React from 'react';

function PlaySvg(props) {
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
                    d="M19.376 12.416 8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832Z"
                    fill="#FFFFFF"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h48v48H0z" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default PlaySvg;
