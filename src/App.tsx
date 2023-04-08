import "./app.scss";
import { Header } from "@/common";
import { Home, Test } from "@/components";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/test" element={<Test />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;