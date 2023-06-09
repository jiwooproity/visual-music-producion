import { BrowserRouter, Routes, Route } from "react-router-dom/dist";

import "./app.less";

import { Main } from "@/components";

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
