import ClearMessage from "./ClearMessage";

export default function Header( { setMessages}) {
    return (
        <nav className="p-4 bg-gray-900 text-white text-lg flex justify-between align-center">
            <h1 className="px-4 font-bold">ChatBot</h1>
            {/* <ClearMessage setMessages={ setMessages }/> */}
        </nav>
    );
}