import Image from "next/image";
import React from 'react';

const MockRight = (props) => {

    const imageLoader = ({src, width, height, quality}) => {
        return `https://${src}`
    }

    return (
        <div className="flex flex-col sm:flex-row items-center sm:w-3/5 sm:place-content-between">
            <div className="flex flex-col items-center sm:items-start w-80">
                <p className="font-bold text-2xl sm:text-4xl">{props.headerOne}</p>
                <p className="font-bold text-2xl sm:text-4xl">{props.headerTwo}</p>
                <p className="font-normal text-md my-1.5">{props.bodyOne}</p>
                <p className="font-normal text-md my-1.5">{props.bodyTwo}</p>
            </div>
            <Image
                alt={'Image of phone'}
                loader={imageLoader}
                src={props.url}
                width={300}
                height={600}
                priority={true}
                objectFit={'contain'}/>
        </div>
    )
}

export default MockRight
