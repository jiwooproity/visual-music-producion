import { BrowserRouter, Routes, Route } from "react-router-dom/dist";

import "./app.less";

import { Visualizer } from "@/components";

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Visualizer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
