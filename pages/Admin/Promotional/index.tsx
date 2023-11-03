import Container from 'components/containers/Container';
import { useState } from 'react';
import { SPORT_TYPES, getSportType, SPORT_NAME_LOOKUP } from 'data/constants/sportConstants';
import { useWalletSelector } from 'contexts/WalletSelectorContext';
import { DEFAULT_MAX_FEES, MINT_STORAGE_COST } from 'data/constants/gasFees';
import BigNumber from 'bignumber.js';
import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { promoPackStorageABI } from 'utils/polygon/ABI/promo_pack_nft';
import { promoPackLogicABI } from 'utils/polygon/ABI/promo_pack_nft_logic';
import promo_pack_nft_storage from 'utils/polygon/ABI/promo_pack_nft.json';
import promo_pack_nft_logic from 'utils/polygon/ABI/promo_pack_nft_logic.json';
import { PROMO_PACK_NFL_POLYGON } from 'data/constants/polygonContracts';

const promoPackStorageNFLContractABI = promo_pack_nft_storage as unknown as promoPackStorageABI;
const promoPackLogicNFLContractABI = promo_pack_nft_logic as unknown as promoPackLogicABI;

export default function Promotional(props) {
  const {
    dispatch,
    state: { status, isMetamaskInstalled, isSignedIn, wallet },
  } = useWalletSelector();

  const [loading, setLoading] = useState(false);
  const [whitelistInfoNFL, setWhitelistInfoNFL] = useState(null);
  const [whitelistInfoNBA, setWhitelistInfoNBA] = useState(null);
  const [whitelistInfoMLB, setWhitelistInfoMLB] = useState(null);
  const [whitelistInfoCRICKET, setWhitelistInfoCRICKET] = useState(null);
  const [currentSport, setCurrentSport] = useState(null);
  const [detailsNFL, setDetailsNFL] = useState({
    receiverAccount: '',
  });
  const [detailsNBA, setDetailsNBA] = useState({
    receiverAccount: '',
  });
  const [detailsMLB, setDetailsMLB] = useState({
    receiverAccount: '',
  });
  const [detailsCRICKET, setDetailsCRICKET] = useState({
    receiverAccount: '',
  });
  async function execute_send_type_1_pack() {
    let receiverId =
      currentSport === SPORT_NAME_LOOKUP.football
        ? whitelistInfoNFL?.toString()
        : currentSport === SPORT_NAME_LOOKUP.baseball
        ? whitelistInfoMLB?.toString()
        : currentSport === SPORT_NAME_LOOKUP.basketball
        ? whitelistInfoNBA?.toString()
        : whitelistInfoCRICKET?.toString();
    try {
      if (window.ethereum) {
        console.log('Fetch send promo pack function called');
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const web3 = new Web3(window.ethereum);

        const contract = new web3.eth.Contract(
          promoPackLogicNFLContractABI,
          PROMO_PACK_NFL_POLYGON.logic
        );

        // Estimate gas for mintPacks function
        console.log('Account:', wallet);
        const gasEstimate = await contract.methods
          .sendPromoTokensForMinting(receiverId)
          .estimateGas({ from: wallet });
        console.log('Estimated Gas:', gasEstimate);

        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: wallet,
          to: PROMO_PACK_NFL_POLYGON.logic,
          //@ts-ignore
          gas: parseInt(gasEstimate),
          gasPrice: gasPrice,
          data: contract.methods.sendPromoTokensForMinting(receiverId).encodeABI(),
        };
        // Call mint regular packs function
        web3.eth
          .sendTransaction(tx)
          .on('transactionHash', function (hash) {
            console.log('Transaction Hash:', hash);
          })
          //@ts-ignore
          .on('confirmation', function (confirmationNumber, receipt) {
            console.log('Confirmation Number:', confirmationNumber);
            console.log('Receipt:', receipt);
            setLoading(false);
            alert('Promo Pack minted successfully!');
          })
          .on('error', function (error) {
            console.error('Error:', error);
            setLoading(false);
            alert('Promo Pack minting failed!');
          });
      }
    } catch (error) {
      alert('Promo pack sending failed!');
      console.error('Error sending Promo Pack:', error);
    }
  }

  const onChangeWhitelistNFL = (e) => {
    if (e.target.name === 'receiverAccount') {
      if (e.target.value !== '') {
        const whitelistArray = e.target.value.split('\n').filter((n) => n);
        setWhitelistInfoNFL(whitelistArray);
        setDetailsNFL({
          ...detailsNFL,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.value.length === 0) {
        setWhitelistInfoNFL(null);
        setDetailsNFL({
          ...detailsNFL,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const onChangeWhitelistNBA = (e) => {
    if (e.target.name === 'receiverAccount') {
      if (e.target.value !== '') {
        const whitelistArray = e.target.value.split('\n').filter((n) => n);
        setWhitelistInfoNBA(whitelistArray);
        setDetailsNBA({
          ...detailsNBA,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.value.length === 0) {
        setWhitelistInfoNBA(null);
        setDetailsNBA({
          ...detailsNBA,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const onChangeWhitelistMLB = (e) => {
    if (e.target.name === 'receiverAccount') {
      if (e.target.value !== '') {
        const whitelistArray = e.target.value.split('\n').filter((n) => n);
        setWhitelistInfoMLB(whitelistArray);
        setDetailsMLB({
          ...detailsMLB,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.value.length === 0) {
        setWhitelistInfoMLB(null);
        setDetailsMLB({
          ...detailsMLB,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const onChangeWhitelistCRICKET = (e) => {
    if (e.target.name === 'receiverAccount') {
      if (e.target.value !== '') {
        const whitelistArray = e.target.value.split('\n').filter((n) => n);
        setWhitelistInfoCRICKET(whitelistArray);
        setDetailsCRICKET({
          ...detailsCRICKET,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.value.length === 0) {
        setWhitelistInfoCRICKET(null);
        setDetailsCRICKET({
          ...detailsCRICKET,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setLoading(true);
    execute_send_type_1_pack();
  };

  return (
    <Container>
      <div className="grid grid-cols-2">
        {loading ? (
          <div className="flex w-full ml-24 mt-24">
            <div className="w-5 h-5 rounded-full bg-indigo-buttonblue animate-bounce mr-5"></div>
            <div className="w-5 h-5 rounded-full bg-indigo-buttonblue animate-bounce mr-5"></div>
            <div className="w-5 h-5 rounded-full bg-indigo-buttonblue animate-bounce"></div>
          </div>
        ) : (
          <div className="flex flex-col w-1/2 ml-24 mt-24">
            <label className="font-monument" htmlFor="duration">
              SEND TYPE 1 FOOTBALL PACK
            </label>
            <input
              className="border outline-none rounded-lg px-3 p-2"
              id="receiverAccount"
              name="receiverAccount"
              type="text"
              placeholder="Enter account to send type 1 pack to."
              onChange={(e) => {
                setCurrentSport('FOOTBALL'), onChangeWhitelistNFL(e);
              }}
              value={detailsNFL.receiverAccount}
            />
            <div className="  mt-6">
              <button
                className=" flex text-center justify-center items-center iphone5:w-64 bg-indigo-buttonblue font-montserrat text-indigo-white p-3 mb-4 md:mr-4 text-xs"
                onClick={(e) => handleButtonClick(e)}
              >
                Send
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col w-1/2 ml-24 mt-24">
          <label className="font-monument" htmlFor="duration">
            SEND TYPE 1 BASKETBALL PACK
          </label>
          <input
            className="border outline-none rounded-lg px-3 p-2"
            id="receiverAccount"
            name="receiverAccount"
            type="text"
            placeholder="Enter account to send type 1 pack to."
            onChange={(e) => {
              setCurrentSport('BASKETBALL'), onChangeWhitelistNBA(e);
            }}
            value={detailsNBA.receiverAccount}
          />
          <div className="  mt-6">
            <button
              className=" flex text-center justify-center items-center iphone5:w-64 bg-indigo-buttonblue font-montserrat text-indigo-white p-3 mb-4 md:mr-4 text-xs"
              onClick={(e) => handleButtonClick(e)}
            >
              Send
            </button>
          </div>
        </div>
        <div className="flex flex-col w-1/2 ml-24 mt-24">
          <label className="font-monument" htmlFor="duration">
            SEND TYPE 1 BASEBALL PACK
          </label>
          <input
            className="border outline-none rounded-lg px-3 p-2"
            id="receiverAccount"
            name="receiverAccount"
            type="text"
            placeholder="Enter account to send type 1 pack to."
            onChange={(e) => {
              setCurrentSport('BASEBALL'), onChangeWhitelistMLB(e);
            }}
            value={detailsMLB.receiverAccount}
          />
          <div className="  mt-6">
            <button
              className=" flex text-center justify-center items-center iphone5:w-64 bg-indigo-buttonblue font-montserrat text-indigo-white p-3 mb-4 md:mr-4 text-xs"
              onClick={(e) => handleButtonClick(e)}
            >
              Send
            </button>
          </div>
        </div>
        <div className="flex flex-col w-1/2 ml-24 mt-24">
          <label className="font-monument" htmlFor="duration">
            SEND TYPE 1 CRICKET PACK
          </label>
          <input
            className="border outline-none rounded-lg px-3 p-2"
            id="receiverAccount"
            name="receiverAccount"
            type="text"
            placeholder="Enter account to send type 1 pack to."
            onChange={(e) => {
              setCurrentSport('CRICKET'), onChangeWhitelistCRICKET(e);
            }}
            value={detailsCRICKET.receiverAccount}
          />
          <div className="  mt-6">
            <button
              className=" flex text-center justify-center items-center iphone5:w-64 bg-indigo-buttonblue font-montserrat text-indigo-white p-3 mb-4 md:mr-4 text-xs"
              onClick={(e) => handleButtonClick(e)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
