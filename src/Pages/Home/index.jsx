import { useEffect, useState, useContext } from "react";
import { providers, Contract, BigNumber } from "ethers";
import { ToastContainer, toast } from "react-toastify";

import { WalletWeb3Context } from "../../context/WalletWeb3Context";
import Body from "../../Blocks/Body";
import Hero from "../../Blocks/Hero";
import Progress from "../../Blocks/Progress";
import DefiAccess from "../../Blocks/DefiAccess";
import ChainsSection from "../../Blocks/Chains";
import Litepaper from "../../Blocks/Litepaper";
import DexSection from "../../Blocks/Dex";
import Road from "../../Blocks/Road";
import Footer from "../../components/Footer";
import ERC20ABI from "../../constants/abis/ERC20.json";

import "react-toastify/dist/ReactToastify.css";

import {
  PresaleAddress,
  PresaleTokenAddress,
  USDCAddress,
} from "../../constants";
import PresaleABI from "../../constants/abis/Presale.json";
import WalletMenu from "../../components/Wallet";
import BlockText from "../../Blocks/BlockText";

const chainConfig = {
  chainId: "0xA869",
  chainName: "Avalanche Testnet",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://testnet.snowtrace.io"],
};

let provider,
  presaleReadContract,
  usdcReadContract,
  presaleContract,
  usdcContract;

const Home = () => {
  const usdcDecimals = 6;
  const [isWalletOptionsOpen, setisWalletOptionsOpen] = useState(false);
  const [rate, setRate] = useState("1000000000000");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [claimTime, setClaimTime] = useState(0);
  const [minToVault, setMinToVault] = useState(0);
  const [totalUsdc, setTotalUsdc] = useState("0");
  const [totalDayl, setTotalDayl] = useState("0");
  const [totalWithdrawn, setTotalWithdrawn] = useState("0");
  const [usdcBalance, setUsdcBalance] = useState("0");
  const [usdcAllowance, setUsdcAllowance] = useState(false);
  const [whitelisted, setWhitelisted] = useState(false);
  const [minPerWallet, setMinPerWallet] = useState("0");
  const [maxPerWallet, setMaxPerWallet] = useState("0");
  const [hardCap, setHardCap] = useState("0");
  const [softCap, setSoftCap] = useState("0");
  const [claimable, setClaimable] = useState("0");
  const [depositAmount, setDepositAmount] = useState("0");
  const [withdrawable, setWithdrawable] = useState("0");
  const [presaleState, setPresaleState] = useState(0);
  const { wallet } = useContext(WalletWeb3Context);
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
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainConfig.chainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [chainConfig],
            });
          } catch (err) {
            console.log("error adding chain:", err);
          }
        }
      }
      provider = new providers.Web3Provider(window.ethereum);
      presaleReadContract = new Contract(
        PresaleAddress,
        PresaleABI,
        new providers.JsonRpcProvider(chainConfig.rpcUrls[0])
      );
      usdcReadContract = new Contract(
        USDCAddress,
        ERC20ABI,
        new providers.JsonRpcProvider(chainConfig.rpcUrls[0])
      );

      if (!!provider) {
        let signer = provider.getSigner();
        presaleContract = new Contract(PresaleAddress, PresaleABI, signer);
        usdcContract = new Contract(USDCAddress, ERC20ABI, signer);
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
        ttlUsdc,
      ] = await Promise.all([
        presaleReadContract.rate(),
        presaleReadContract.startTime(),
        presaleReadContract.endTime(),
        presaleReadContract.claimTime(),
        presaleReadContract.minPerWallet(),
        presaleReadContract.maxPerWallet(),
        presaleReadContract.hardCap(),
        presaleReadContract.softCap(),
        presaleReadContract.totalUSDC(),
      ]);

      setRate(rate.toString());
      setStartTime(startTime.toNumber());
      setEndTime(endTime.toNumber());
      setClaimTime(claimTime.toNumber());
      setMinPerWallet(minTo.toString());
      setMaxPerWallet(maxTo.toString());
      setHardCap(hardCap.toString());
      setSoftCap(softCap.toString());
      setTotalUsdc(
        ttlUsdc.div(BigNumber.from(10).pow(usdcDecimals)).toNumber(1).toFixed(1)
      );

      // Set Presale State
      if (startTime.toNumber() < new Date() / 1000) setPresaleState(1); // If start time passed
      if (endTime.toNumber() < new Date() / 1000) setPresaleState(2); // If end time passed
      if (claimTime.toNumber() < new Date() / 1000) {
        if (ttlUsdc.toNumber() > softCap.toNumber())
          setPresaleState(3); // if Claimtime passed
        else setPresaleState(4);
      }

      if (!wallet) {
        return;
      }

      const [userInfo, whitelisted, claimable, usdcBalance, usdcAllowance] =
        await Promise.all([
          presaleReadContract.userInfo(wallet),
          presaleReadContract.whitelisted(wallet),
          presaleReadContract.claimableAmount(wallet),
          usdcReadContract.balanceOf(wallet),
          usdcReadContract.allowance(wallet, PresaleAddress),
        ]);

      setTotalDayl(userInfo.totalReward.toString());
      setDepositAmount(userInfo.depositAmount.toString());
      setTotalWithdrawn(userInfo.withdrawnReward.toString());
      setWhitelisted(whitelisted);
      setClaimable(claimable);
      setUsdcBalance(usdcBalance);
      setUsdcAllowance(!usdcAllowance.lt(maxTo));
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (!!provider) {
        let signer = provider.getSigner();
        presaleContract = new Contract(PresaleAddress, PresaleABI, signer);
        usdcContract = new Contract(USDCAddress, ERC20ABI, signer);
      }
      if (!wallet) {
        return;
      }
      if (!!presaleReadContract && !!usdcReadContract) {
        const [userInfo, whitelisted, claimable, usdcBalance] =
          await Promise.all([
            presaleReadContract.userInfo(wallet),
            presaleReadContract.whitelisted(wallet),
            presaleReadContract.claimableAmount(wallet),
            usdcReadContract.balanceOf(wallet),
          ]);

        setTotalDayl(userInfo.totalReward.toString());
        setDepositAmount(userInfo.depositAmount.toString());
        setTotalWithdrawn(userInfo.withdrawnReward.toString());
        setWhitelisted(whitelisted);
        setClaimable(claimable);
        setUsdcBalance(usdcBalance);
      }
    })();
  }, [wallet, provider, presaleReadContract, usdcReadContract]);
  const addDaylToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
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
    } catch (error) {
      console.log(error);
    }
  };
  const approve = async () => {
    if (!usdcContract || !presaleContract || !presaleReadContract) {
      return;
    }
    let tx = await usdcContract.approve(
      PresaleAddress,
      usdcBalance.mul(BigNumber.from(maxPerWallet)).toString(),
      { from: wallet }
    );
    await tx.wait();
    let allowance = await usdcContract.allowance(wallet, PresaleAddress);

    setUsdcAllowance(allowance);
  };
  const buyDayl = async (percent) => {
    if (!usdcContract || !presaleContract || !presaleReadContract) {
      return;
    }
    if (
      totalDayl === "0" &&
      BigNumber.from(totalDayl)
        .add(usdcBalance.mul(BigNumber.from(rate)).mul(BigNumber.from(percent)))
        .div(BigNumber.from(100))
        .lt(BigNumber.from(minPerWallet).mul(BigNumber.from(rate)))
    ) {
      return toast("Smaller than minimum amount");
    }
    if (
      BigNumber.from(totalDayl)
        .add(usdcBalance.mul(BigNumber.from(rate)).mul(BigNumber.from(percent)))
        .div(BigNumber.from(100))
        .gt(BigNumber.from(maxPerWallet).mul(BigNumber.from(rate)))
    ) {
      return toast("Exceeds maximum amount");
    }
    let ttlUsdc = await presaleReadContract.totalUSDC();
    if (
      ttlUsdc
        .add(usdcBalance.mul(BigNumber.from(percent)))
        .div(BigNumber.from(100))
        .gt(BigNumber.from(hardCap))
    ) {
      return toast("Exceeds Hard Cap");
    }
    try {
      let tx = await presaleContract.deposit(
        usdcBalance
          .mul(BigNumber.from(rate))
          .mul(BigNumber.from(percent))
          .div(BigNumber.from(100))
          .toString(),
        { from: wallet }
      );
      await tx.wait();
      toast.success("Depositing Success");
    } catch (err) {
      console.log("error:", err);
    }
    ttlUsdc = await presaleReadContract.totalUSDC();
    setTotalUsdc(
      ttlUsdc.div(BigNumber.from(10).pow(usdcDecimals)).toNumber().toFixed(1)
    );
    if (!!presaleReadContract) {
      const userInfo = await presaleReadContract.userInfo(wallet);
      setTotalDayl(userInfo.totalReward.toString());
      setDepositAmount(userInfo.depositAmount.toString());
      setClaimable(await presaleReadContract.claimableAmount(wallet));
    }
    if (!!usdcReadContract) {
      const balance = await usdcReadContract.balanceOf(wallet);
      setUsdcBalance(await usdcReadContract.balanceOf(wallet));
    }
  };
  const withdraw = async () => {
    if (Date.now() / 1000 < claimTime) {
      return toast.error("Not claim time");
    }
    let ttlUsdc = await presaleReadContract.totalUSDC();
    if (ttlUsdc.gte(BigNumber.from(softCap))) {
      return toast.error("Unable to withdraw");
    }
    if (withdrawable === "0") {
      return toast.error("No USDC to withdraw");
    }
    let tx = await presaleContract.withdraw({ from: wallet });
    await tx.wait();
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
    ttlUsdc = await presaleReadContract.totalUSDC();
    setTotalUsdc(
      ttlUsdc.div(BigNumber.from(10).pow(usdcDecimals)).toNumber(1).toFixed(1)
    );
    toast.success("Withdraw Success");
  };
  const claim = async () => {
    if (Date.now() / 1000 < claimTime) {
      return toast.error("Not claim time");
    }
    if (claimable.toString() === "0") {
      return toast.error("Unable to claim any token");
    }
    let tx = await presaleContract.claimToken({ from: wallet });
    await tx.wait();
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
        totalUsdc={totalUsdc}
        walletAddress={wallet}
        totalDayl={totalDayl}
        withdrawable={withdrawable}
        totalWithdrawn={totalWithdrawn}
        usdcBalance={usdcBalance}
        whitelisted={whitelisted}
        claimable={claimable}
        hardCap={hardCap}
        softCap={softCap}
        allowance={usdcAllowance}
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
      <Litepaper />
      <DexSection />
      <Road />
      <Footer offsetY={offsetY} />
      <ToastContainer />
    </Body>
  );
};

export default Home;
