import React from 'react';
import ReactMarkdown from "react-markdown";


export default function Message({ message }) {
    return(
        <div className="msgDailouge flex justify-center align-center flex-col w-full ">
            <div className="query rounded-2xl align-middle self-end text-right py-2 px-4 bg-gray-800 ">
                {message.query}
            </div>
            <div className="response w-full my-1 p-2 text-justify">
                <ReactMarkdown>
                    {message.response}
                </ReactMarkdown>
            </div>            
        </div>
    )
}