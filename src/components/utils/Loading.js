import React from 'react';

const Loading = (props) => {
  return (
      <div className="flex flex-row justify-center items-center fixed top-0 right-0 bottom-0 left-0 h-full w-screen bg-transparentBlack9">
        <p className="text-white font-bold sm:text-2xl">{props.message}</p>
      </div>
  );
};

export default Loading;
