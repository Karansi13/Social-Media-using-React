const WelcomeMessage = ({ onGetPostclick}) => {
    return (
        <center className="noPosts">
            <h1>There are no posts</h1>
            <button type="button" className="btn btn-primary" onClick={onGetPostclick}>Get Post From Server</button></center>
    )
}

export default WelcomeMessage;