import React, { Suspense } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import AOS from "aos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { getLibrary } from "./utils/web3React";

///////////////////////////////////////
const Home = React.lazy(() => import("./Pages/Home"));
//animation aos init
AOS.init();
const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Web3ReactProvider>
  );
};

export default App;
