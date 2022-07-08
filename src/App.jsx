import React, { Suspense } from "react";
import { WalletWeb3Provider } from "./context/WalletWeb3Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
///////////////////////////////////////
const Home = React.lazy(() => import("./Pages/Home"));
const Dapp = React.lazy(() => import("./Pages/Dapp"));

const App = () => {
  return (
    <WalletWeb3Provider>
      <Suspense fallback={<>Loading... </>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/dapp" element={<Dapp />} exact />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </WalletWeb3Provider>
  );
};

export default App;
