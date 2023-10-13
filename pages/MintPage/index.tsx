import { utils, providers } from 'near-api-js';
import Container from '../../components/containers/Container';
import Main from '../../components/Main';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import 'regenerator-runtime/runtime';
import Select from 'react-select';
import Usdc from '../../public/images/SVG/usdc';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import BigNumber from 'bignumber.js';
import { getRPCProvider } from '../../utils/near';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/modals/Modal';
import PortfolioContainer from '../../components/containers/PortfolioContainer';
import { POL141USDC } from '../../data/constants/polygonConstants';
import { MINT_STORAGE_COST, DEFAULT_MAX_FEES } from 'data/constants/gasFees';
import { execute_claim_soulbound_pack, query_claim_status } from 'utils/near/helper';
import Link from 'next/link';
import { SPORT_TYPES, getSportType, SPORT_NAME_LOOKUP } from 'data/constants/sportConstants';
import ModalPortfolioContainer from 'components/containers/ModalPortfolioContainer';
import usdcABI from 'utils/polygon/ABI/usdcABI.json';
import { packStorageABI } from 'utils/polygon/ABI/pack_nft';
import { ERC20ABI } from 'utils/polygon/ABI/usdcABI';
import pack_nft_storage from 'utils/polygon/ABI/pack_nft.json';
import Web3 from 'web3';
import {
  getIsPromoRedux,
  getSportTypeRedux,
  setSportTypeRedux,
  setIsPromoRedux,
} from 'redux/athlete/sportSlice';
import { persistor } from 'redux/athlete/store';
import { getUTCDateFromLocal } from 'utils/date/helper';
import moment from 'moment';
import {
  // claimSoulboundPack,
  // fetchClaimSoulboundStatus,
  fetchRegularPackPrice,
  fetchAccountBalance,
} from 'utils/polygon/ethers';
const NANO_TO_SECONDS_DENOMINATOR = 1000000;
const DECIMALS_USDC = 1000000;
export default function Home(props) {
  const {
    dispatch,
    state: { status, isMetamaskInstalled, isSignedIn, wallet },
  } = useWalletSelector();
  // const { contract } = selector.store.getState();

  const showInstallMetamask = status !== 'pageNotLoaded' && !isMetamaskInstalled;

  const reduxDispatch = useDispatch();
  const [positionList, setPositionList] = useState(SPORT_TYPES[0].positionList);
  const sportObj = SPORT_TYPES.filter(
    (x) => x.sport !== SPORT_NAME_LOOKUP.cricket && x.sport !== SPORT_NAME_LOOKUP.basketball
  ).map((x) => ({
    name: x.sport,
    isActive: false,
  }));
  const [sportFromRedux, setSportFromRedux] = useState(useSelector(getSportTypeRedux));
  const [isPromoFromRedux, setIsPromoFromRedux] = useState(useSelector(getIsPromoRedux));
  const [categoryList, setCategoryList] = useState([...sportObj]);
  const [currentSport, setCurrentSport] = useState(sportObj[0].name);
  // Re-use this data to display the state
  const [minterConfig, setMinterConfig] = useState({
    minting_price_decimals_6: '',
    minting_price_decimals_18: '',
    admin: '',
    usdc_account_id: '',
    usdt_account_id: '',
    private_sale_start: 0,
    public_sale_start: 0,
    nft_pack_contract: '',
    nft_pack_supply_index: 0,
    nft_pack_max_sale_supply: 0,
    nft_pack_mint_counter: 0,
  });
  // Storage deposit is used to check if balance available to mint NFT and pay the required storage fee
  const [storageDepositAccountBalance, setStorageDepositAccountBalance] = useState(0);
  const [selectedMintAmount, setSelectedMintAmount] = useState(0);
  const [minted, setMinted] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [accountERC20ApprovalAmount, setAccountERC20ApprovalAmount] = useState(0);
  const [mintedNba, setMintedNba] = useState(0);
  const [mintedMlb, setMintedMlb] = useState(0);
  const [mintedIpl, setMintedIpl] = useState(0);
  const [usePOL141, setUsePOL141] = useState(POL141USDC);
  const [intervalSale, setIntervalSale] = useState(0);
  const [balanceErrorMsg, setBalanceErrorMsg] = useState('');
  const [isClaimedFootball, setIsClaimedFootball] = useState(false);
  const [isClaimedBasketball, setIsClaimedBasketball] = useState(false);
  const [isClaimedBaseball, setIsClaimedBaseball] = useState(false);
  const [isClaimedCricket, setIsClaimedCricket] = useState(false);
  const router = useRouter();
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [discountDay, setDiscountDay] = useState(0);
  const [discountHour, setDiscountHour] = useState(0);
  const [discountMinute, setDiscountMinute] = useState(0);
  const [discountSecond, setDiscountSecond] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [installMetamaskModal, setInstallMetamaskModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [remountComponent, setRemountComponent] = useState(0);
  const nflRegImage = '/images/packimages/nflStarterPack.png';
  const nbaRegImage = '/images/packimages/nbaStarterPack.png';
  const mlbRegImage = '/images/packimages/mlbStarterPack.png';
  const cricketRegImage = '/images/packimages/cricketStarterPack.png';
  const nflSbImage = '/images/packimages/NFL-SB-Pack.png';
  const nbaSbImage = '/images/packimages/nbaStarterPackSoulbound.png';
  const mlbSbImage = '/images/packimages/MLB-Lock-Pack.png';
  const cricketSbImage = '/images/packimages/Cricket-SB-Pack.png';
  const [modalImage, setModalImage] = useState(nflSbImage);

  const [mintingComplete, setMintingComplete] = useState(false);
  const [approvedComplete, setApprovedComplete] = useState(false);
  const packStorageNFLContractABI = pack_nft_storage as unknown as packStorageABI;
  const regularPackNFLStorageContractAddress = '0x00AdA1B38dFF832A8b85935B8B8BC9234024084A';

  const changeCategoryList = (name) => {
    const tabList = [...categoryList];
    tabList.forEach((item) => {
      if (item.name === name) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
    setCategoryList([...tabList]);
    setCurrentSport(name);
  };

  function selectMint() {
    let optionMint = [];
    for (let x = 1; x < 11; x++) {
      optionMint.push({ value: x, label: `${x} ${x > 1 ? 'packs' : 'pack'}` });
    }
    return (
      <Select
        onChange={(event) => {
          setSelectedMintAmount(event.value);
          setBalanceErrorMsg('');
          setApprovedComplete(false);
          setRemountComponent(Math.random());
        }}
        options={optionMint}
        className="md:w-1/3 w-4/5 mr-9 mt-5"
      />
    );
  }

  function selectMintNba() {
    let optionMint = [];
    for (let x = 1; x < 11; x++) {
      optionMint.push({ value: x, label: `${x} ${x > 1 ? 'packs' : 'pack'}` });
    }
    return (
      <Select
        onChange={(event) => setSelectedMintAmount(event.value)}
        options={optionMint.splice(0, 5)}
        className="md:w-1/3 w-4/5 mr-9 mt-5"
      />
    );
  }

  function selectMintMlb() {
    let optionMint = [];
    for (let x = 1; x < 11; x++) {
      optionMint.push({ value: x, label: `${x} ${x > 1 ? 'packs' : 'pack'}` });
    }
    return (
      <Select
        onChange={(event) => setSelectedMintAmount(event.value)}
        options={optionMint.splice(0, 5)}
        className="md:w-1/3 w-4/5 mr-9 mt-5"
      />
    );
  }

  function selectMintIpl() {
    let optionMint = [];
    for (let x = 1; x < 11; x++) {
      optionMint.push({ value: x, label: `${x} ${x > 1 ? 'packs' : 'pack'}` });
    }
    return (
      <Select
        onChange={(event) => setSelectedMintAmount(event.value)}
        options={optionMint.splice(0, 5)}
        className="md:w-1/3 w-4/5 mr-9 mt-5"
      />
    );
  }

  function format_price() {
    let price = Math.floor(
      Number(
        usePOL141.decimals === 1000000
          ? minterConfig.minting_price_decimals_6
          : minterConfig.minting_price_decimals_18
      ) / usePOL141.decimals
    );
    return price;
  }
  const launchTimer = 1675296000000;
  // 1675296000000
  const launchDate = moment().unix() - launchTimer / 1000;
  // const launchDate = 1;
  const discountTimer = 1677715200000;
  const discountDate = moment().unix() - discountTimer / 1000;

  function counter() {
    const seconds = Math.floor((intervalSale / 1000) % 60);
    const minutes = Math.floor((intervalSale / 1000 / 60) % 60);
    const hours = Math.floor((intervalSale / (1000 * 60 * 60)) % 24);
    const days = Math.floor(intervalSale / (1000 * 60 * 60 * 24));

    let format_seconds = seconds < 0 ? 0 : seconds < 10 ? '0' + seconds : seconds;
    let format_minutes = minutes < 0 ? 0 : minutes < 10 ? '0' + minutes : minutes;
    let format_hours = hours < 0 ? 0 : hours < 10 ? '0' + hours : hours;
    let format_days = days < 0 ? 0 : days < 10 ? '0' + days : days;

    return {
      minute: format_minutes,
      seconds: format_seconds,
      hours: format_hours,
      days: format_days,
    };
  }
  const regularPackStorageContractAddress = '0x00AdA1B38dFF832A8b85935B8B8BC9234024084A';
  const usdcContractAddress = '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23';
  async function fetchUserERC20Allowance() {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);

        const usdcERC20ContractABI = usdcABI as unknown as ERC20ABI;
        const usdcContract = new web3.eth.Contract(usdcERC20ContractABI, usdcContractAddress, {
          from: wallet,
        });

        const allowance = await usdcContract.methods
          .allowance(wallet, regularPackStorageContractAddress)
          .call();

        setAccountERC20ApprovalAmount(Number(allowance));
      }
    } catch (error) {
      console.error('Error fetching allowance:', error);
    }
  }

  async function approveERC20TokenSpending() {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);

        let amountToApprove = 1;

        const usdcERC20ContractABI = usdcABI as unknown as ERC20ABI;
        const usdcContract = new web3.eth.Contract(usdcERC20ContractABI, usdcContractAddress, {
          from: wallet,
        });

        const usdcGasEstimate = await usdcContract.methods
          .approve(regularPackStorageContractAddress, amountToApprove)
          .estimateGas();

        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: wallet,
          to: usdcContractAddress,
          //@ts-ignore
          gas: parseInt(usdcGasEstimate),
          gasPrice: gasPrice,
          data: usdcContract.methods
            .approve(regularPackStorageContractAddress, amountToApprove)
            .encodeABI(),
        };

        web3.eth
          .sendTransaction(tx)
          .on('transactionHash', function (hash) {
            console.log('Transaction Hash:', hash);
            setLoading(true);
          })
          //@ts-ignore
          .on('confirmation', function (confirmationNumber, receipt) {
            console.log('Confirmation Number:', confirmationNumber);
            console.log('Receipt:', receipt);
            setApprovedComplete(true);
            setLoading(false);
            setRemountComponent(Math.random());
          })
          .on('error', function (error) {
            console.error('Error:', error);
          });
      }
    } catch (error) {
      console.error('Error approving metamask address:', error);
    }
  }

  async function executeMintRegularPacks() {
    let mint_cost =
      (Number(minterConfig.minting_price_decimals_6) * selectedMintAmount) / DECIMALS_USDC;
    if (accountERC20ApprovalAmount / DECIMALS_USDC < mint_cost) {
      setBalanceErrorMsg(
        'Not enough approved ERC20 amount,' +
          ' ' +
          'you approved' +
          ' ' +
          accountERC20ApprovalAmount / DECIMALS_USDC +
          ' ' +
          usePOL141.title +
          ' ' +
          'you need' +
          ' ' +
          mint_cost +
          ' ' +
          usePOL141.title
      );
      return;
    }

    console.log(mint_cost);
    if (accountBalance < mint_cost && currentSport === 'FOOTBALL') {
      setBalanceErrorMsg(
        'Error you need ' +
          mint_cost +
          ' ' +
          usePOL141.title +
          ', You have ' +
          accountBalance.toFixed(2) +
          ' ' +
          usePOL141.title
      );
      return;
    }
    setBalanceErrorMsg('');

    try {
      if (window.ethereum) {
        console.log('Mint packs function called');
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const web3 = new Web3(window.ethereum);

        const contract = new web3.eth.Contract(
          packStorageNFLContractABI,
          regularPackNFLStorageContractAddress
        );

        // Estimate gas for mintPacks function
        console.log('Amount:', selectedMintAmount);
        const gasEstimate = await contract.methods
          .mintPacks(selectedMintAmount)
          .estimateGas({ from: wallet });
        console.log('Estimated Gas:', gasEstimate);

        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: wallet,
          to: regularPackNFLStorageContractAddress,
          //@ts-ignore
          gas: parseInt(gasEstimate),
          gasPrice: gasPrice,
          data: contract.methods.mintPacks(selectedMintAmount).encodeABI(),
        };
        // Call mint regular packs function
        web3.eth
          .sendTransaction(tx)
          .on('transactionHash', function (hash) {
            console.log('Transaction Hash:', hash);
            setLoading(true);
          })
          //@ts-ignore
          .on('confirmation', function (confirmationNumber, receipt) {
            console.log('Confirmation Number:', confirmationNumber);
            console.log('Receipt:', receipt);
            console.log('Regular Pack minted successfully');
            setMintingComplete(true);
          })
          .on('error', function (error) {
            setLoading(false);
            console.error('Error:', error);
          });
      }
    } catch (error) {
      console.error('Error minting regular pack:', error);
    }
  }

  // async function fetchClaimStatus(accountId) {
  //   const isClaimed = await fetchClaimSoulboundStatus(accountId);
  //   setIsClaimedFootball(isClaimed);
  // }

  // const handleClaimButton = async () => {
  //   try {
  //     await claimSoulboundPack()
  //       .then((txHash) => {
  //         console.log('Transaction Hash:', txHash);
  //         // Handle the transaction hash as needed (e.g., display it on the UI)
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //         // Handle the error (e.g., display an error message on the UI)
  //       });
  //   } catch (error) {
  //     console.error('Error claiming Soulbound Pack:', error);
  //   }
  // };

  async function fetchPackPrice() {
    try {
      const regularPackPrice = await fetchRegularPackPrice(); // Assuming this function returns a BigNumber

      // Convert the price to a string with 18 decimal places
      const priceString = Number(regularPackPrice);

      setMinterConfig({
        ...minterConfig,
        minting_price_decimals_6: priceString.toString(),
      });
    } catch (error) {
      console.error('Error fetching regular pack price:', error);
    }
  }

  async function fetchUserAccountBalance() {
    try {
      const accountBalance = await fetchAccountBalance(wallet);

      setAccountBalance(Number(accountBalance));
      console.log(accountBalance);
    } catch (error) {
      console.error('Error fetching account balance:', error);
    }
  }

  useEffect(() => {
    if (mintingComplete) {
      sportFromRedux === SPORT_NAME_LOOKUP.basketball
        ? setModalImage(nbaRegImage)
        : sportFromRedux === SPORT_NAME_LOOKUP.football
        ? setModalImage(nflRegImage)
        : sportFromRedux === SPORT_NAME_LOOKUP.baseball
        ? setModalImage(mlbRegImage)
        : setModalImage(cricketRegImage);

      console.log(mintingComplete);
      setLoading(false);
      setEditModal(true);
    }
  }, [mintingComplete, sportFromRedux, loading]);

  useEffect(() => {
    fetchPackPrice();
  }, [currentSport, usePOL141, accountBalance, accountERC20ApprovalAmount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIntervalSale(
        Math.floor(minterConfig.public_sale_start / NANO_TO_SECONDS_DENOMINATOR) - Date.now()
      );
      if (intervalSale > 0) {
        counter();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [intervalSale]);

  useEffect(() => {
    fetchUserERC20Allowance();
    fetchUserAccountBalance();
    console.log('Approved Amount:', accountERC20ApprovalAmount);
  }, [currentSport, minterConfig, wallet, remountComponent, approvedComplete]);

  useEffect(() => {
    if (!isMetamaskInstalled) {
      setInstallMetamaskModal(true);
    } else {
      setInstallMetamaskModal(false);
    }
  }, [status, isMetamaskInstalled]);

  useEffect(() => {
    if (remountComponent !== 0) {
    }
  }, [remountComponent]);

  function formatTime(time) {
    return time < 10 ? '0' + time : time;
  }

  useEffect(() => {
    setDay(0);
    setHour(0);
    setMinute(0);
    setSecond(0);
    const id = setInterval(() => {
      const currentDate = getUTCDateFromLocal();
      // const end = moment.utc(1674144000000);
      const end = moment.utc(launchTimer);
      setDay(formatTime(Math.floor(end.diff(currentDate, 'second') / 3600 / 24)));
      setHour(formatTime(Math.floor((end.diff(currentDate, 'second') / 3600) % 24)));
      setMinute(formatTime(Math.floor((end.diff(currentDate, 'second') / 60) % 60)));
      setSecond(formatTime(Math.floor(end.diff(currentDate, 'second') % 60)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Container activeName="MINT">
        <div className="flex flex-col w-screen md:w-full overflow-y-auto h-screen justify-center self-center text-indigo-black">
          <Main color="indigo-white">
            <div className="flex-initial iphone5:mt-20 md:ml-6 md:mt-8">
              <div className="flex md:flex-row md:float-right iphone5:flex-col md:mt-0">
                {/* <div className="md:mr-5 md:mt-4 iphone5:mt-10">
                  <form>
                    <select
                      onChange={(e) => {
                        setCurrentSport(e.target.value);
                        setUseNEP141(NEP141NEAR);
                      }}
                      className="bg-filter-icon bg-no-repeat bg-right bg-indigo-white ring-2 ring-offset-8 ring-indigo-black ring-opacity-25 focus:ring-2 focus:ring-indigo-black 
                        focus:outline-none cursor-pointer text-xs iphone5:ml-8 iphone5:w-4/6 md:text-base md:ml-8 md:mt-0 md:w-72 md:p-2 md:block lg:block"
                    >
                      {categoryList.map((x) => {
                        return <option value={x.name}>{x.name}</option>;
                      })}
                    </select>
                  </form>
                </div> */}
              </div>
              <div className="ml-8">
                <ModalPortfolioContainer title="MINT PACKS" textcolor="text-indigo-black" />
              </div>
              {/* {accountId ? (
                <div className="ml-12 mt-4 md:flex md:flex-row md:ml-8">
                  {isClaimedFootball ? (
                    ''
                  ) : (
                    <button
                      className="w-60 flex text-center justify-center items-center iphone5:w-64 bg-indigo-buttonblue font-montserrat text-indigo-white p-3 mb-4 md:mr-4 text-xs "
                      onClick={(e) => handleClaimButton()}
                    >
                      CLAIM FOOTBALL PACK
                    </button>
                  )}
                </div>
              ) : (
                <div className="ml-12 mt-4 md:flex md:flex-row md:ml-8">
                  {isClaimedFootball ? (
                    ''
                  ) : (
                    <button
                      className="w-60 flex text-center justify-center items-center iphone5:w-64 bg-indigo-buttonblue font-montserrat text-indigo-white p-3 mb-4 md:mr-4 text-xs "
                      // onClick={logIn}
                    >
                      CLAIM FOOTBALL PACK
                    </button>
                  )}
                </div>
              )} */}

              <div className="md:mr- md:mt-0 ml-6 mt-4">
                <form>
                  <select
                    onChange={(e) => {
                      setCurrentSport(e.target.value);
                    }}
                    className="bg-filter-icon bg-no-repeat bg-right bg-indigo-white ring-2 ring-offset-8 ring-indigo-black ring-opacity-25 focus:ring-2 focus:ring-indigo-black 
                        focus:outline-none cursor-pointer text-xs iphone5:ml-8 hidden iphone5:w-60 md:hidden lg:hidden md:text-base md:ml-8 md:mt-5 md:w-36"
                  >
                    {categoryList.map((x) => {
                      return <option value={x.name}>{x.name}</option>;
                    })}
                  </select>
                </form>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:ml-12">
              <div className="md:w-full overflow-x-hidden">
                <div className="flex md:flex-row flex-col md:ml-2 mt-12">
                  {currentSport === SPORT_NAME_LOOKUP.football ? (
                    <div className="md:w-1/2 w-full ">
                      <Image
                        src={'/images/mintpage.png'}
                        width={400}
                        height={400}
                        alt="pack-image"
                      />
                    </div>
                  ) : currentSport === SPORT_NAME_LOOKUP.basketball ? (
                    <div className="md:w-1/2 w-full ">
                      <Image
                        src={'/images/mintpagebasketball.png'}
                        width={400}
                        height={400}
                        alt="pack-image"
                      />
                    </div>
                  ) : currentSport === SPORT_NAME_LOOKUP.baseball ? (
                    <div className="md:w-1/2 w-full ">
                      <Image
                        src={'/images/mintpagebasketballupdated.jpg'}
                        width={400}
                        height={400}
                        alt="pack-image"
                      />
                    </div>
                  ) : (
                    <div className="md:w-1/2 w-full ">
                      <Image
                        src={'/images/mintpagecricket.png'}
                        width={400}
                        height={400}
                        alt="pack-image"
                      />
                    </div>
                  )}
                  <div className="md:w-1/2 w-full md:mt-0 mt-5 ml-8 ">
                    <div className="text-xl font-bold font-monument ml-0">
                      <ModalPortfolioContainer
                        title="STARTER PACK MINT"
                        textcolor="text-indigo-black"
                      />
                    </div>
                    {currentSport === SPORT_NAME_LOOKUP.basketball ? '' : ''}

                    <div className="flex justify-between w-4/5 md:w-1/2 mt-5">
                      <div>
                        <div className="text-xs">PRICE</div>

                        {usePOL141 === POL141USDC ? (
                          <div className="font-black"> {format_price()}USDC</div>
                        ) : (
                          <div className="font-black"> {format_price()}USDT</div>
                        )}
                      </div>

                      <div className="border">
                        <div>
                          {/* <button
                            onClick={() => setUseNEP141(NEP141USDT)}
                            className={
                              'p-3 ' +
                              (useNEP141.title == NEP141USDT.title
                                ? 'bg-indigo-black'
                                : 'hover:bg-indigo-slate')
                            }
                          >
                            <Usdt
                              hardCodeMode={useNEP141.title == NEP141USDT.title ? '#fff' : '#000'}
                            ></Usdt>
                          </button> */}
                          <button
                            onClick={() => setUsePOL141(POL141USDC)}
                            className={
                              'p-3 ' +
                              (usePOL141.title == POL141USDC.title
                                ? 'bg-indigo-black'
                                : 'hover:bg-indigo-slate')
                            }
                          >
                            <Usdc
                              hardCodeMode={usePOL141.title == POL141USDC.title ? '#fff' : '#000'}
                            ></Usdc>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-16">
                      <div className="border border-indigo-lightgray rounded-2xl text-center p-4 w-40 flex flex-col justify-center  mt-8">
                        <div className="text-2xl font-black font-monument ">
                          {currentSport === SPORT_NAME_LOOKUP.football
                            ? minted
                            : currentSport === SPORT_NAME_LOOKUP.basketball
                            ? mintedNba
                            : currentSport === SPORT_NAME_LOOKUP.baseball
                            ? mintedMlb
                            : mintedIpl}
                        </div>
                        <div className="text-xs">YOU HAVE MINTED</div>
                      </div>
                    </div>
                    <div className="mt-8 mb-0 p-0 w-9/12"></div>
                    <div className="text-xs "></div>
                    <div>
                      {currentSport === 'FOOTBALL'
                        ? selectMint()
                        : currentSport === 'BASKETBALL'
                        ? selectMintNba()
                        : currentSport === 'BASEBALL'
                        ? selectMintMlb()
                        : selectMintIpl()}
                    </div>
                    {/*TODO: start styling */}
                    {/*<div>*/}
                    {/*  <p>Receipt total price ${Math.floor((selectedMintAmount * parseInt(minterConfig.minting_price)) / STABLE_DECIMAL)}</p>*/}
                    {/*  <p>Gas price {utils.format.formatNearAmount(BigInt(selectedMintAmount * MINT_STORAGE_COST).toString()).toString()}N</p>*/}
                    {/*</div>*/}
                    {Math.floor(minterConfig.public_sale_start / NANO_TO_SECONDS_DENOMINATOR) <=
                      Date.now() && isSignedIn ? (
                      {
                        /*parseInt(String(storageDepositAccountBalance)) >= selectedMintAmount * MINT_STORAGE_COST*/
                      } ? (
                        <>
                          {loading ? (
                            <div className="flex w-full mt-10">
                              <div className="w-5 h-5 rounded-full bg-indigo-buttonblue animate-bounce mr-5"></div>
                              <div className="w-5 h-5 rounded-full bg-indigo-buttonblue animate-bounce mr-5"></div>
                              <div className="w-5 h-5 rounded-full bg-indigo-buttonblue animate-bounce"></div>
                            </div>
                          ) : (
                            accountERC20ApprovalAmount !== null && (
                              <button
                                className="w-9/12 flex text-center justify-center items-center bg-indigo-buttonblue font-montserrat text-indigo-white p-4 text-xs mt-8"
                                onClick={
                                  accountERC20ApprovalAmount <= 0 ||
                                  accountERC20ApprovalAmount <
                                    Number(minterConfig.minting_price_decimals_6) *
                                      selectedMintAmount
                                    ? () => approveERC20TokenSpending()
                                    : () => executeMintRegularPacks()
                                }
                                key={remountComponent}
                              >
                                {accountERC20ApprovalAmount <= 0 ||
                                accountERC20ApprovalAmount <
                                  Number(minterConfig.minting_price_decimals_6) * selectedMintAmount
                                  ? 'APPROVE THIS SMART CONTRACT TO CONTINUE MINTING'
                                  : `Mint ${Math.floor(selectedMintAmount * format_price())} USDT`}
                              </button>
                            )
                          )}
                          {currentSport === 'FOOTBALL' ? (
                            <div className="flex-col mt-10 hidden">
                              <div>
                                Launching: 12am UTC{' '}
                                {moment.utc(launchTimer).local().format('MMMM D')}
                              </div>
                              <div>
                                <div className="flex space-x-2 mt-2">
                                  <div className="bg-indigo-darkgray text-indigo-white w-9 h-9 rounded justify-center flex pt-2">
                                    {day || ''}
                                  </div>
                                  <div className="bg-indigo-darkgray text-indigo-white w-9 h-9 rounded justify-center flex pt-2">
                                    {hour || ''}
                                  </div>
                                  <div className="bg-indigo-darkgray text-indigo-white w-9 h-9 rounded justify-center flex pt-2">
                                    {minute || ''}
                                  </div>
                                  <div className="bg-indigo-darkgray text-indigo-white w-9 h-9 rounded justify-center flex pt-2">
                                    {second || ''}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : launchDate > 0 ? (
                            ''
                          ) : (
                            <div className="flex flex-col mt-10">
                              <div>
                                Launching: 12am UTC{' '}
                                {moment.utc(launchTimer).local().format('MMMM D')}
                              </div>
                              <div>
                                <div className="flex space-x-2 mt-2">
                                  <div className="bg-indigo-darkgray text-indigo-white w-9 h-9 rounded justify-center flex pt-2">
                                    {day || ''}
                                  </div>
                                  <div className="bg-indigo-darkgray text-indigo-white w-9 h-9 rounded justify-center flex pt-2">
                                    {hour || ''}
                                  </div>
                                  <div className="bg-indigo-darkgray text-indigo-white w-9 h-9 rounded justify-center flex pt-2">
                                    {minute || ''}
                                  </div>
                                  <div className="bg-indigo-darkgray text-indigo-white w-9 h-9 rounded justify-center flex pt-2">
                                    {second || ''}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        // {minted > "10" }
                        <button
                          className="w-9/12 flex text-center justify-center items-center bg-indigo-buttonblue font-montserrat text-indigo-white p-4 text-xs mt-8 "
                          onClick={() => ''}
                        >
                          Storage deposit required{' '}
                          {utils.format.formatNearAmount(
                            BigInt(
                              selectedMintAmount * MINT_STORAGE_COST - storageDepositAccountBalance
                            ).toString()
                          )}
                          N
                        </button>
                      )
                    ) : isSignedIn ? (
                      //Change "MINT BASKETBALL STARTER PACK SOON" based on new sport that will be added
                      <div className="w-9/12 flex text-center justify-center items-center bg-indigo-buttonblue font-montserrat text-indigo-white p-4 text-xs mt-8 ">
                        MINT {currentSport} STARTER PACK SOON
                      </div>
                    ) : (
                      <div
                        // onClick={logIn}
                        className="w-9/12 flex text-center justify-center items-center bg-indigo-lightgray font-montserrat text-indigo-white p-4 text-xs mt-8 "
                      >
                        WALLET CONNECTION REQUIRED
                      </div>
                    )}
                    <p className="text-xs text-indigo-red font-bold">{balanceErrorMsg}</p>
                    {/*TODO: end */}
                  </div>
                </div>
                <div className="iphone5:mt-5 md:mt-0 ml-8 md:ml-2">
                  <div className="text-xl font-bold font-monument ml-0 md:-mt-6 w-1/3">
                    <ModalPortfolioContainer title="PACK DETAILS" textcolor="text-indigo-black" />
                  </div>
                  {currentSport === SPORT_NAME_LOOKUP.football ? (
                    <div className="mt-10">
                      This pack will contain 8 randomly generated <br></br>
                      American Football players.
                    </div>
                  ) : currentSport === SPORT_NAME_LOOKUP.basketball ? (
                    <div className="mt-10">
                      This pack will contain 8 randomly generated <br></br>
                      American Basketball players.
                    </div>
                  ) : currentSport === SPORT_NAME_LOOKUP.baseball ? (
                    <div className="mt-10">
                      This pack will contain 10 randomly generated <br></br>
                      American Baseball players.
                    </div>
                  ) : (
                    <div className="mt-10">
                      This pack will contain 12 randomly generated <br></br>
                      Cricket players.
                    </div>
                  )}
                  <div className="mt-5 mb-12">
                    {currentSport === SPORT_NAME_LOOKUP.baseball ||
                    currentSport === SPORT_NAME_LOOKUP.cricket ||
                    currentSport === SPORT_NAME_LOOKUP.football ? (
                      <div className="mb-5">An amount for each of the positions below:</div>
                    ) : (
                      <div className="mb-5">1 for each of the positions below:</div>
                    )}
                    {currentSport === SPORT_NAME_LOOKUP.football ? (
                      <ul className="marker list-disc pl-5 space-y-3 ">
                        <li>1 Quarter Back (QB)</li>
                        <li>2 Running Back (RB) </li>
                        <li>2 Wide Receivers (WR) </li>
                        <li>1 Tight End (TE)</li>
                        <li>1 Flex (RB/WR/TE) </li>
                        <li>1 Super Flex (QB/RB/WR/TE) </li>
                      </ul>
                    ) : currentSport === SPORT_NAME_LOOKUP.basketball ? (
                      <ul className="marker list-disc pl-5 space-y-3 ">
                        <li>1 Point Guard (PG)</li>
                        <li>1 Shooting Guard (SG) </li>
                        <li>1 Small Forward (SF) </li>
                        <li>1 Power Forward (PF)</li>
                        <li>1 Center (C) </li>
                        <li>1 Guard (PG/SG) </li>
                        <li>1 Forward (SF/PF) </li>
                        <li>1 Any (ANY) </li>
                      </ul>
                    ) : currentSport === SPORT_NAME_LOOKUP.baseball ? (
                      <ul className="marker list-disc pl-5 space-y-3 ">
                        <li>2 Pitchers (P)</li>
                        <li>1 Catcher (C)</li>
                        <li>1 First Baseman (1B) </li>
                        <li>1 Second Baseman (2B)</li>
                        <li>1 Third Baseman (3B)</li>
                        <li>1 Shortstop (SS) </li>
                        <li>2 Outfielder (OF) </li>
                        <li>1 Designated Hitter (DH) </li>
                      </ul>
                    ) : (
                      //Ask for the amount for each position
                      <ul className="marker list-disc pl-5 space-y-3 ">
                        <li>2 Bowlers (BOWL)</li>
                        <li>1 Wicket Keeper (WK) </li>
                        <li>2 Batsman (BAT) </li>
                        <li>2 All rounders (AR)</li>
                        <li>5 Any (BOWL/WK/BAT/AR)</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <Modal
                title={'CONGRATULATIONS'}
                visible={editModal}
                onClose={() => {
                  setEditModal(false);
                }}
              >
                Your pack has been minted successfully!
                <button
                  className="fixed top-4 right-4"
                  onClick={() => {
                    setEditModal(false);
                  }}
                >
                  <img src="/images/x.png" />
                </button>
                <div className="flex flex-wrap flex-col mt-10 mb-5 bg-opacity-70 z-50 w-full">
                  <div className="ml-20 mb-12">
                    <img width={240} height={340} src={modalImage}></img>
                  </div>
                  <Link href={'/Packs'}>
                    <button
                      className="bg-indigo-buttonblue text-indigo-white w-full h-14 text-center tracking-widest text-md font-monument"
                      onClick={() => {
                        setEditModal(false);
                      }}
                    >
                      CONFIRM
                    </button>
                  </Link>
                </div>
              </Modal>
              <Modal title={'METAMASK NOT INSTALLED'} visible={installMetamaskModal}>
                Install Metamask in your browser to proceed.
                <img src="/images/MetamaskLogo.png" />
                <div className="flex flex-wrap flex-col mt-10 mb-5 bg-opacity-70 z-50 w-full">
                  <Link href={'https://metamask.io/download/'}>
                    <button className="bg-indigo-buttonblue text-indigo-white w-full h-14 text-center tracking-widest text-md font-monument">
                      INSTALL METAMASK
                    </button>
                  </Link>
                </div>
              </Modal>
            </div>
          </Main>
        </div>
      </Container>
    </>
  );
}
