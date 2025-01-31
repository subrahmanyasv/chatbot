import { useState } from "react";

export default function Inputs({ setInputValue }) {
    const [localInput, setLocalInput] = useState('');

    const addMessage = () => {
        setInputValue(localInput);
        setLocalInput('');
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addMessage();
        }
    };

    return (
        <div className="flex justify-center align-center p-4 my-6 w-9/12 bg-gray-800 text-white rounded-2xl">
            
            <input type="text" onChange={(e) => setLocalInput(e.target.value)} value={localInput} onKeyDown={handleKeyDown} id="first_name" className=" text-gray-900 text-sm rounded-md focus:ring-blue-500  w-9/12 px-2.5 mx-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ask your question..." required />

            <button type="button" onClick ={ addMessage } className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 cursor-pointer py-3  dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Ask</button>
        </div>
    );
}