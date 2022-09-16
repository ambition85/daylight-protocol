import { useEffect, useState } from "react";
import { providers, Contract, BigNumber } from "ethers";
import { ToastContainer, toast } from "react-toastify";
// import { WalletWeb3Context } from "../../context/WalletWeb3Context";

import Body from "../../Blocks/Body";
import Hero from "../../Blocks/Hero";
import Progress from "../../Blocks/Progress";
import DefiAccess from "../../Blocks/DefiAccess";
import ChainsSection from "../../Blocks/Chains";
import Litepaper from "../../Blocks/Litepaper";
import DexSection from "../../Blocks/Dex";
import Road from "../../Blocks/Road";
import Footer from "../../components/Footer";
import SectionDivider from "../../components/SectionDivider";
import ERC20ABI from "../../constants/abis/ERC20.json";

import "react-toastify/dist/ReactToastify.css";

import {
  PresaleAddress,
  PresaleTokenAddress,
  BUSDAddress,
} from "../../constants";
import PresaleABI from "../../constants/abis/Presale.json";
import WalletMenu from "../../components/Wallet";
import BlockText from "../../Blocks/BlockText";
import { saveTxHistory } from "../../utils/utils";
import { mainnetNetwork as chainConfig } from "../../utils/constants";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useAuth from "../../hooks/useAuth";

// import { testnetNetwork as chainConfig } from "../../utils/constants"
// export const chainConfig = {
//   chainId: "0xA869",
//   chainName: "Avalanche Testnet",
//   nativeCurrency: {
//     name: "AVAX",
//     symbol: "AVAX",
//     decimals: 18,
//   },
//   rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
//   blockExplorerUrls: ["https://testnet.snowtrace.io"],
// };

export const busdDecimals = 18;

let provider,
  presaleReadContract,
  busdReadContract,
  presaleContract,
  busdContract;

const Home = () => {
  const [isWalletOptionsOpen, setisWalletOptionsOpen] = useState(false);
  const [rate, setRate] = useState("40");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [claimTime, setClaimTime] = useState(0);
  const [minToVault, setMinToVault] = useState(0);
  const [totalBusd, setTotalBusd] = useState("0");
  const [totalDayl, setTotalDayl] = useState("0");
  const [totalWithdrawn, setTotalWithdrawn] = useState("0");
  const [busdBalance, setBusdBalance] = useState("0");
  const [busdAllowance, setBusdAllowance] = useState(false);
  const [whitelisted, setWhitelisted] = useState(false);
  const [minPerWallet, setMinPerWallet] = useState("0");
  const [maxPerWallet, setMaxPerWallet] = useState("0");
  const [hardCap, setHardCap] = useState("0");
  const [softCap, setSoftCap] = useState("0");
  const [claimable, setClaimable] = useState("0");
  const [depositAmount, setDepositAmount] = useState("0");
  const [withdrawable, setWithdrawable] = useState("0");
  const [presaleState, setPresaleState] = useState(0);
  const {
    library,
    chainId,
    account: wallet,
    ...web3React
  } = useActiveWeb3React();
  const { login } = useAuth();

  console.log("Cahin id: ", chainId);

  const [offsetY, setoffsetY] = useState(0);

  const handlescroll = () => {
    setoffsetY(window.pageYOffset);
  };
  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);
  useEffect(() => {
    (async () => {
      // if (!wallet) {
      //   if (window.ethereum) await login("injected");
      // }
      provider = new providers.JsonRpcProvider(chainConfig.rpcUrls[0]);
      presaleReadContract = new Contract(
        PresaleAddress,
        PresaleABI,
        new providers.JsonRpcProvider(chainConfig.rpcUrls[0])
      );
      busdReadContract = new Contract(
        BUSDAddress,
        ERC20ABI,
        new providers.JsonRpcProvider(chainConfig.rpcUrls[0])
      );

      const signer = library && library.getSigner();
      if (!!signer) {
        presaleContract = new Contract(PresaleAddress, PresaleABI, signer);
        busdContract = new Contract(BUSDAddress, ERC20ABI, signer);
      }

      const [
        rate,
        startTime,
        endTime,
        claimTime,
        minTo,
        maxTo,
        hardCap,
        softCap,
        ttlBusd,
      ] = await Promise.all([
        presaleReadContract.rate(),
        presaleReadContract.startTime(),
        presaleReadContract.endTime(),
        presaleReadContract.claimTime(),
        presaleReadContract.minPerWallet(),
        presaleReadContract.maxPerWallet(),
        presaleReadContract.hardCap(),
        presaleReadContract.softCap(),
        presaleReadContract.totalBUSD(),
      ]);

      setRate(rate.toString());
      setStartTime(startTime.toNumber());
      setEndTime(endTime.toNumber());
      setClaimTime(claimTime.toNumber());
      setMinPerWallet(minTo.toString());
      setMaxPerWallet(maxTo.toString());
      setHardCap(hardCap.toString());
      setSoftCap(softCap.toString());
      setTotalBusd(
        ttlBusd.div(BigNumber.from(10).pow(busdDecimals)).toNumber(1).toFixed(1)
      );

      // Set Presale State
      if (startTime.toNumber() < new Date() / 1000) setPresaleState(1); // If start time passed
      if (endTime.toNumber() < new Date() / 1000) setPresaleState(2); // If end time passed
      if (claimTime.toNumber() < new Date() / 1000) {
        if (ttlBusd.toNumber() > softCap.toNumber())
          setPresaleState(3); // if Claimtime passed
        else setPresaleState(4);
      }

      if (!wallet) {
        return;
      }

      const [
        userInfo,
        whitelisted,
        claimable,
        busdBalance,
        busdAllowance,
        maxPerWallet,
      ] = await Promise.all([
        presaleReadContract.userInfo(wallet),
        presaleReadContract.whitelisted(wallet),
        presaleReadContract.claimableAmount(wallet),
        busdReadContract.balanceOf(wallet),
        busdReadContract.allowance(wallet, PresaleAddress),
        presaleReadContract.maxPerWallet(),
      ]);
      console.log("BUSD allow: ", busdAllowance);

      setTotalDayl(userInfo.totalReward.toString());
      setDepositAmount(userInfo.depositAmount.toString());
      setTotalWithdrawn(userInfo.withdrawnReward.toString());
      setWhitelisted(whitelisted);
      setClaimable(claimable);
      setBusdBalance(busdBalance);
      setBusdAllowance(!busdAllowance.lte(maxTo));
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const signer = library && library.getSigner();
      console.log("Signer", signer);
      if (!!signer) {
        presaleContract = new Contract(PresaleAddress, PresaleABI, signer);
        console.log("presaleContract", presaleContract);
        busdContract = new Contract(BUSDAddress, ERC20ABI, signer);
      }
      if (!wallet) {
        return;
      }
      if (!!presaleReadContract && !!busdReadContract) {
        const [userInfo, whitelisted, claimable, busdBalance, busdAllowance, maxPerWallet] =
          await Promise.all([
            presaleReadContract.userInfo(wallet),
            presaleReadContract.whitelisted(wallet),
            presaleReadContract.claimableAmount(wallet),
            busdReadContract.balanceOf(wallet),
            busdReadContract.allowance(wallet, PresaleAddress),
            presaleReadContract.maxPerWallet(),
          ]);

        console.log("BUSD allow next: ", busdBalance, busdAllowance, maxPerWallet);
        setBusdAllowance(!busdAllowance.lte(maxPerWallet));
        setTotalDayl(userInfo.totalReward.toString());
        setDepositAmount(userInfo.depositAmount.toString());
        setTotalWithdrawn(userInfo.withdrawnReward.toString());
        setWhitelisted(whitelisted);
        setClaimable(claimable);
        setBusdBalance(busdBalance);
      }
    })();
  }, [wallet, provider, presaleReadContract, busdReadContract]);

  const addDaylToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await library.provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: PresaleTokenAddress, // The address that the token is at.
            symbol: "DAYL", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            image: "", // A string url of the token logo
          },
        },
      });

      // const wasAdded = await window.ethereum.request({
      //   method: "wallet_watchAsset",
      //   params: {
      //     type: "ERC20", // Initially only supports ERC20, but eventually more!
      //     options: {
      //       address: PresaleTokenAddress, // The address that the token is at.
      //       symbol: "DAYL", // A ticker symbol or shorthand, up to 5 chars.
      //       decimals: 18, // The number of decimals in the token
      //       image: "", // A string url of the token logo
      //     },
      //   },
      // });

      console.log("Event: ", wasAdded);
    } catch (error) {
      console.log(error);
    }
  };
  const approve = async () => {
    const signer = library.getSigner();
    busdContract = new Contract(BUSDAddress, ERC20ABI, signer);
    if (!busdContract || !presaleContract || !presaleReadContract) {
      return;
    }
    console.log("Contract: ", busdContract, BigNumber.from("10").mul(BigNumber.from(maxPerWallet)).toString());
    let tx = await busdContract.approve(
      PresaleAddress,
      BigNumber.from(10).mul(BigNumber.from(maxPerWallet)).toString(),
      {
        from: wallet,
        gasLimit: 400000
      },
    );
    await tx.wait();
    saveTxHistory(tx.hash);
    console.log("Event: ", tx);

    let allowance = await busdContract.allowance(wallet, PresaleAddress);

    setBusdAllowance(allowance);
  };
  const buyDayl = async (val) => {
    const signer = library.getSigner();
    presaleContract = new Contract(PresaleAddress, PresaleABI, signer);
    console.log("Val:", val);
    if (!busdContract || !presaleContract || !presaleReadContract) {
      return;
    }

    console.log(totalDayl, val);
    console.log(BigNumber.from(totalDayl), BigNumber.from(val.toString()));
    if (
      totalDayl === "0" &&
      BigNumber.from(totalDayl)
        .add(BigNumber.from(val).mul(BigNumber.from(rate)))
        .lt(BigNumber.from(minPerWallet).mul(BigNumber.from(rate)))
    ) {
      return toast("Smaller than minimum amount");
    }
    console.log("Not Small")
    if (
      BigNumber.from(totalDayl)
        .add(BigNumber.from(val).mul(BigNumber.from(rate)))
        .gt(BigNumber.from(maxPerWallet).mul(BigNumber.from(rate)))
    ) {
      return toast("Exceeds maximum amount");
    }
    console.log("Not Big")
    let ttlBusd = await presaleReadContract.totalBUSD();
    if (ttlBusd.add(BigNumber.from(val)).gt(BigNumber.from(hardCap))) {
      return toast("Exceeds Hard Cap");
    }
    console.log("Not Hardcap exceed")

    try {
      console.log("Tx Before: ", ttlBusd)
      let tx = await presaleContract.deposit(
        BigNumber.from(val).mul(BigNumber.from(rate)).toString(),
        {
          from: wallet,
          gasLimit: 400000
        }
      );
      console.log("Tx: ", tx)
      await tx.wait();
      console.log("Tx after: ", tx)
      saveTxHistory(tx.hash);
      toast.success("Depositing Success");
    } catch (err) {
      console.log("error:", err);
    }
    ttlBusd = await presaleReadContract.totalBUSD();
    setTotalBusd(
      ttlBusd.div(BigNumber.from(10).pow(busdDecimals)).toNumber().toFixed(1)
    );
    if (!!presaleReadContract) {
      const userInfo = await presaleReadContract.userInfo(wallet);
      setTotalDayl(userInfo.totalReward.toString());
      setDepositAmount(userInfo.depositAmount.toString());
      setClaimable(await presaleReadContract.claimableAmount(wallet));
    }
    if (!!busdReadContract) {
      const balance = await busdReadContract.balanceOf(wallet);
      setBusdBalance(await busdReadContract.balanceOf(wallet));
    }
  };
  const withdraw = async () => {
    const signer = library.getSigner();
    presaleContract = new Contract(PresaleAddress, PresaleABI, signer);
    if (Date.now() / 1000 < claimTime) {
      return toast.error("Not claim time");
    }
    let ttlBusd = await presaleReadContract.totalBUSD();
    if (ttlBusd.gte(BigNumber.from(softCap))) {
      return toast.error("Unable to withdraw");
    }
    if (withdrawable === "0") {
      return toast.error("No BUSD to withdraw");
    }
    let tx = await presaleContract.withdraw({
      from: wallet,
      gasLimit: 400000
    });
    await tx.wait();
    saveTxHistory(tx.hash);
    const userInfo = await presaleReadContract.userInfo(wallet);
    const mtv = (await presaleReadContract.minToVault()).toNumber();
    setMinToVault(mtv);
    setWithdrawable(
      userInfo.depositAmount
        .mul(BigNumber.from(100).sub(mtv))
        .div(BigNumber.from(100))
    );
    setTotalDayl(userInfo.totalReward.toString());
    setDepositAmount(userInfo.depositAmount.toString());
    setClaimable(await presaleReadContract.claimableAmount(wallet));
    ttlBusd = await presaleReadContract.totalBUSD();
    setTotalBusd(
      ttlBusd.div(BigNumber.from(10).pow(busdDecimals)).toNumber(1).toFixed(1)
    );
    toast.success("Withdraw Success");
  };
  const claim = async () => {
    const signer = library.getSigner();
    presaleContract = new Contract(PresaleAddress, PresaleABI, signer);
    if (Date.now() / 1000 < claimTime) {
      return toast.error("Not claim time");
    }
    if (claimable.toString() === "0") {
      return toast.error("Unable to claim any token");
    }
    let tx = await presaleContract.claimToken({
      from: wallet,
      gasLimit: 400000
    });
    await tx.wait();
    saveTxHistory(tx.hash);
    setClaimable(await presaleReadContract.claimableAmount(wallet));
    toast.success("Claiming Success");
  };

  return (
    <Body>
      <WalletMenu
        isWalletOptionsOpen={isWalletOptionsOpen}
        setisWalletOptionsOpen={setisWalletOptionsOpen}
      />
      <Hero
        offsetY={offsetY}
        setisWalletOptionsOpen={setisWalletOptionsOpen}
        state={presaleState}
        rate={rate}
        startTime={startTime}
        endTime={endTime}
        claimTime={claimTime}
        totalBusd={totalBusd}
        walletAddress={wallet}
        totalDayl={totalDayl}
        withdrawable={withdrawable}
        totalWithdrawn={totalWithdrawn}
        busdBalance={busdBalance}
        whitelisted={whitelisted}
        claimable={claimable}
        hardCap={hardCap}
        softCap={softCap}
        allowance={busdAllowance}
        minPerWallet={minPerWallet}
        maxPerWallet={maxPerWallet}
        approve={approve}
        addDaylToken={addDaylToken}
        buyDayl={buyDayl}
        withdraw={withdraw}
        claim={claim}
      />
      <Progress />
      <DefiAccess offsetY={offsetY} />
      <BlockText offsetY={offsetY} />
      <ChainsSection />
      <SectionDivider />
      <Litepaper />
      <SectionDivider />
      <DexSection offsetY={offsetY} />
      {/* <SectionDivider /> */}
      <Road />
      <Footer offsetY={offsetY} />
      <ToastContainer />
    </Body>
  );
};

export default Home;
