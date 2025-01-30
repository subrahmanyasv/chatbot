export default function Message({ message }) {

    return(
        <div className="msgDailouge">
            <div className="query">
                {message.query}
            </div>
            <div className="response">
                {message.response}
            </div>            
        </div>
    )
}