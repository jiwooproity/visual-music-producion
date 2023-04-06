import "./app.scss";

const App = () => {
    return (
        <div className="container">
            <span>Webpack and react with typescript</span>
            <span>{process.env.REACT_ENV_TEST}</span>
        </div>
    )
}

export default App;