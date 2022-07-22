import React, { Suspense } from "react";
import { WalletWeb3Provider } from "./context/WalletWeb3Context";
import AOS from "aos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
///////////////////////////////////////
const Home = React.lazy(() => import("./Pages/Home"));
//animation aos init
AOS.init();
const App = () => {
  return (
    <WalletWeb3Provider>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </WalletWeb3Provider>
  );
};

export default App;
