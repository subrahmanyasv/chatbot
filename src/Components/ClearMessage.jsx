export default function ClearMessage({ setMessages }) {
    return (
        <button onClick={ ()=>{ setMessages([]); }}>Clear</button>
    )
}