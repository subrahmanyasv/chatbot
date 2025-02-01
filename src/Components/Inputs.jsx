import { useState } from "react";

export default function Inputs({ inputValue , setInputValue , loading }) {
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
        <div className="flex justify-center align-center py-4 px-1 sm:px-4 sm:my-6 w-full sm:w-9/12 bg-gray-800 text-white sm:rounded-2xl">
            
            <input type="text" onChange={(e) => setLocalInput(e.target.value)} value={localInput} onKeyDown={handleKeyDown} id="first_name" className=" text-gray-900 text-sm rounded-md focus:ring-blue-500  w-9/12 px-2.5 mx-1 sm:mx-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ask your question..." required />

            <button disabled={loading} type="button" onClick ={ addMessage } className="text-white  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  px-5 sm:px-10 cursor-pointer py-3  bg-gray-900 hover:bg-gray-700 disabled:hover:bg-gray-900 dark:border-gray-700 disabled:cursor-not-allowed">Ask</button>
        </div>
    );
}