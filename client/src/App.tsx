import { BrowserRouter, Routes, Route } from "react-router-dom/dist";

import "@/assets/less/global.less";

import { Main } from "@/components/page";

const App = () => {
  return (
    <main className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
