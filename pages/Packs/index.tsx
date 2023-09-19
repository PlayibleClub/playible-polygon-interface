import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  claimSoulboundPack,
  fetchClaimSoulboundStatus,
  fetchTokensByOwner,
  fetchTokenSupplyByOwner,
} from 'utils/polygon/ethers';
import PortfolioContainer from '../../components/containers/PortfolioContainer';
import Container from '../../components/containers/Container';
import Main from '../../components/Main';
import 'regenerator-runtime/runtime';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PackComponent from './components/PackComponent';
import ReactPaginate from 'react-paginate';

import { getIsPromoRedux, getSportTypeRedux, setSportTypeRedux } from 'redux/athlete/sportSlice';
import { persistor } from 'redux/athlete/store';
import Modal from 'components/modals/Modal';
import { SPORT_TYPES, getSportType, SPORT_NAME_LOOKUP } from 'data/constants/sportConstants';
export default function Packs() {
  const router = useRouter();
  const dispatch = useDispatch();

  // const provider = new ethers.providers.JsonRpcProvider(
  //   'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'
  // );
  // const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const [packs, setPacks] = useState([]);
  const [soulboundPacks, setSoulboundPacks] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [packOffset, setPackOffset] = useState(0);
  const [packLimit, setPackLimit] = useState(30);
  const [totalPacks, setTotalPacks] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);
  const [totalSoulboundPacks, setTotalSoulboundPacks] = useState(0);
  const [activeCategory, setCategory] = useState('NEW');
  const nflImage = '/images/packimages/NFL-SB-Pack.png';
  const nbaImage = '/images/packimages/nbaStarterPackSoulbound.png';
  const mlbSBImage = '/images/packimages/MLB-Lock-Pack.png';
  const cricketSBImage = '/images/packimages/Cricket-SB-Pack.png';
  const [modalImage, setModalImage] = useState(nflImage);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [copiedSportList, setCopiedSportList] = useState([]);
  const [categoryList, setcategoryList] = useState([
    {
      name: 'ALL',
      isActive: true,
    },
    {
      name: 'PROMOTIONAL',
      isActive: false,
    },
    {
      name: 'STARTER',
      isActive: false,
    },
  ]);
  const sportObj = SPORT_TYPES.map((x) => ({ ...x, isActive: false }));
  sportObj[0].isActive = true;
  const [sportList, setSportList] = useState([...sportObj]);
  const [currentSport, setCurrentSport] = useState(sportObj[0].sport);
  const [footballPacks, setFootballPacks] = useState([]);
  const [basketballPacks, setBasketballPacks] = useState([]);
  const [baseballPacks, setBaseballPacks] = useState([]);
  const [cricketPacks, setCricketPacks] = useState([]);
  const [footballSbPacks, setFootballSbPacks] = useState([]);
  const [basketballSbPacks, setBasketballSbPacks] = useState([]);
  const [baseballSbPacks, setBaseballSbPacks] = useState([]);
  const [cricketSbPacks, setCricketSbPacks] = useState([]);
  const [totalSupply, setTotalSupply] = useState(0);
  const allPacks = [
    ...baseballSbPacks,
    ...baseballPacks,
    ...basketballSbPacks,
    ...basketballPacks,
    ...footballSbPacks,
    ...footballPacks,
    ...cricketSbPacks,
    ...cricketPacks,
  ];
  //for soulbound claiming, redirecting, and displaying the corresponding pack image
  const [sportFromRedux, setSportFromRedux] = useState(useSelector(getSportTypeRedux));
  const [isPromoFromRedux, setIsPromoFromRedux] = useState(useSelector(getIsPromoRedux));
  const [remountComponent, setRemountComponent] = useState(0);
  const changecategoryList = (name) => {
    const tabList = [...categoryList];
    setPackOffset(0);
    // setPackLimit(10);
    setRemountComponent(Math.random());
    const prevSport = [...sportList];

    switch (name) {
      case 'ALL':
        if (sportList.length > 0) {
          setSportList([]);
        }
        break;
      case 'PROMOTIONAL':
        if ((sportList.length = 0)) {
          setSportList(prevSport);
        }
        setCurrentTotal(soulboundPacks.length);
        break;
      case 'STARTER':
        if ((sportList.length = 0)) {
          setSportList(prevSport);
        }
        setCurrentTotal(packs.length);
        break;
    }

    tabList.forEach((item) => {
      if (item.name === name) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });

    setcategoryList([...tabList]);
  };
  const changeSportList = (name) => {
    const sports = [...sportList];
    sports.forEach((item) => {
      if (item.sport === name) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
    setSportList(sports);
    setCurrentSport(name);
  };

  function getPackLimit() {
    try {
      if (categoryList[0].isActive && totalSupply > 30) {
        const _packLimit = 15;
        console.log('Reloading packs');
        setPackLimit(_packLimit);
      } else if (!categoryList[0].isActive && totalPacks > 30) {
        const _packLimit = 15;
        console.log('Reloading packs');
        setPackLimit(_packLimit);
      } else {
        const defaultPackLimit = 30;
        setPackLimit(defaultPackLimit);
      }
    } catch (e) {
      const defaultPackLimit = 30;
      setPackLimit(defaultPackLimit);
    }
  }

  const handlePageClick = (event) => {
    const newOffset = categoryList[0].isActive
      ? (event.selected * packLimit) % totalSupply
      : (event.selected * packLimit) % totalPacks;
    setPackOffset(newOffset);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    dispatch(setSportTypeRedux(currentSport));
  };
  const userAccount = '0x8F60285800f298F24244ECfe969F2c8A3D2Cb2BC';
  async function fetchTokens() {
    try {
      const tokens = await fetchTokensByOwner(userAccount, packOffset, packLimit);

      //change metadata to contents instead of just retrieving the IPFS Link
      const updatedTokens = await Promise.all(
        tokens.metadata
          .filter((metadataObject) => metadataObject) // Filter out empty metadataObjects
          .map(async (metadataObject) => {
            const metadata = JSON.parse(metadataObject).metadata;
            const response = await fetch(metadata);
            return response.json(); // Directly parse the response as JSON
          })
      );

      const tokenIdsArray = Object.values(tokens.tokenIds);
      //restructures array for better mapping
      const structuredTokens = tokenIdsArray
        .filter((_, index) => updatedTokens[index] !== undefined)
        .map((tokenId, index) => {
          return {
            token_id: Number(tokenId),
            metadata: updatedTokens[index], // Assuming updatedTokens is an array of objects
          };
        });

      setFootballSbPacks(structuredTokens);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  async function fetchTokenSupply() {
    try {
      const resultFootballSb = await fetchTokenSupplyByOwner(userAccount);
      setTotalSupply(Number(resultFootballSb));
      console.log('totalSupply:', totalSupply);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchClaimStatus(accountId) {
    const isClaimed = await fetchClaimSoulboundStatus(accountId);
    setIsClaimed(isClaimed);
  }

  const handleClaimButton = async () => {
    try {
      await claimSoulboundPack()
        .then((txHash) => {
          console.log('Transaction Hash:', txHash);
          // Handle the transaction hash as needed (e.g., display it on the UI)
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error (e.g., display an error message on the UI)
        });
    } catch (error) {
      console.error('Error claiming Soulbound Pack:', error);
    }
  };

  useEffect(() => {
    fetchTokenSupply();
    getPackLimit();
    setPageCount(
      categoryList[0].isActive
        ? Math.floor(totalSupply / packLimit)
        : Math.ceil(totalPacks / packLimit)
    );
    const endOffset = packOffset + packLimit;
    console.log(`Loading packs from ${packOffset} to ${endOffset}`);
    fetchTokens();
    console.log('isClaimedStatus', isClaimed);
  }, [totalPacks, packLimit, packOffset, currentSport, totalSupply, categoryList, sportList]);

  useEffect(() => {
    // fetchSoulboundTokenSupply();
    // fetchSoulboundTokens();
    fetchClaimStatus(userAccount);
  }, [currentSport]);

  useEffect(() => {
    if (remountComponent !== 0) {
    }
  }, [remountComponent]);

  useEffect(() => {
    if (router.asPath.indexOf('transactionHashes') > -1 && isPromoFromRedux === false) {
      {
        //add checking here, use sportFromRedux variable
        sportFromRedux === SPORT_NAME_LOOKUP.basketball
          ? setModalImage(nbaImage)
          : sportFromRedux === SPORT_NAME_LOOKUP.football
          ? setModalImage(nflImage)
          : sportFromRedux === SPORT_NAME_LOOKUP.baseball
          ? setModalImage(mlbSBImage)
          : setModalImage(cricketSBImage);
      }
      setTimeout(() => persistor.purge(), 200);
      setEditModal(true);
    } else if (router.asPath.indexOf('transactionHashes') > -1) {
      {
        sportFromRedux === 'BASKETBALL'
          ? setModalImage(nbaImage)
          : sportFromRedux === 'FOOTBALL'
          ? setModalImage(nflImage)
          : sportFromRedux === 'BASEBALL'
          ? setModalImage(mlbSBImage)
          : setModalImage(cricketSBImage);
      }
      setTimeout(() => persistor.purge(), 200);
      setEditModal(true);
    }
  }, []);
  useEffect(() => {
    setCopiedSportList([...sportList]);
  }, []);

  useEffect(() => {
    if (categoryList.length > 0 && categoryList[0].isActive) {
      setSportList([]);
    } else {
      setSportList([...copiedSportList]);
    }
  }, [categoryList, copiedSportList]);
  useEffect(() => {}, [currentSport]);
  return (
    <Container activeName="SQUAD">
      <div className="flex flex-col w-full overflow-y-auto h-screen">
        <Main color="indigo-white">
          <div className="iphone5:mt-20 md:ml-6 md:mt-8">
            <PortfolioContainer textcolor="indigo-black" title="PACKS">
              <div className="">
                <div className="flex flex-col mt-6">
                  <div className="flex font-bold md:ml-7 iphone5:-mt-6 iphone5:ml-7 md:mt-0 font-monument">
                    {categoryList.map(({ name, isActive }) => (
                      <div
                        className={`cursor-pointer mr-6 ${
                          isActive ? 'border-b-8 border-indigo-buttonblue' : ''
                        }`}
                        onClick={() => {
                          changecategoryList(name);
                          setCategory(name);
                        }}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <hr className="opacity-10 -ml-6" />
                {/* <div className="flex flex-row first:md:ml-10 iphone5:ml-2">
                  {sportList.map((x, index) => {
                    return (
                      <button
                        className={`rounded-lg border mt-4 px-8 p-1 iphone5:ml-2 text-xs md:font-medium font-monument ${
                          index === 0 ? `md:ml-7` : 'md:ml-4'
                        } ${
                          x.isActive
                            ? 'bg-indigo-buttonblue text-indigo-white border-indigo-buttonblue'
                            : ''
                        }`}
                        onClick={() => {
                          changeSportList(x.sport);
                        }}
                      >
                        {x.sport}
                      </button>
                    );
                  })}
                </div> */}
                <div className="iphone5:ml-6 md:ml-9 iphone5:mr-0 md:mr-4 iphone5:mt-4">
                  {categoryList[0].isActive ? null : isClaimed ? (
                    ''
                  ) : (
                    <div
                      className={`${
                        currentSport !== SPORT_NAME_LOOKUP.baseball &&
                        currentSport !== SPORT_NAME_LOOKUP.football
                          ? 'hidden'
                          : ''
                      }`}
                    >
                      <button
                        className="bg-indigo-buttonblue text-indigo-white iphone5:w-full md:w-80 h-10 
      text-center font-bold text-xs"
                        onClick={(e) => handleClaimButton()}
                      >
                        {currentSport === SPORT_NAME_LOOKUP.basketball
                          ? 'CLAIM BASKETBALL PACK'
                          : currentSport === SPORT_NAME_LOOKUP.football
                          ? 'CLAIM FOOTBALL PACK'
                          : currentSport === SPORT_NAME_LOOKUP.baseball
                          ? 'CLAIM BASEBALL PACK'
                          : 'CLAIM CRICKET PACK'}
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid iphone5:grid-cols-2 gap-y-8 mt-4 md:grid-cols-4 iphone5:mt-8 iphone5:ml-2 md:ml-7 md:mt-9 ">
                  {categoryList[0].isActive
                    ? (categoryList[0].isActive ? allPacks : packs).length > 0 &&
                      (categoryList[0].isActive ? allPacks : packs)
                        .filter((data, i) => i >= packOffset && i < packOffset + packLimit)
                        .map(({ metadata, token_id }) => (
                          <PackComponent
                            key={token_id}
                            image={metadata.image}
                            id={token_id}
                            sport={currentSport}
                            media={metadata.name}
                          ></PackComponent>
                        ))
                    : (categoryList[1].isActive ? soulboundPacks : packs).length > 0 &&
                      (categoryList[1].isActive ? soulboundPacks : packs)
                        .filter((data, i) => i >= packOffset && i < packOffset + packLimit)
                        .map(({ metadata, token_id }) => (
                          <PackComponent
                            key={token_id}
                            image={metadata.image}
                            id={token_id}
                            sport={currentSport}
                            media={metadata.name}
                          ></PackComponent>
                        ))}
                </div>
              </div>
            </PortfolioContainer>
            <div className="absolute bottom-10 right-10">
              <div key={remountComponent}>
                <ReactPaginate
                  className="p-2 bg-indigo-buttonblue text-indigo-white flex flex-row space-x-4 select-none ml-7"
                  pageClassName="hover:font-bold"
                  activeClassName="rounded-lg bg-indigo-white text-indigo-black pr-1 pl-1 font-bold"
                  pageLinkClassName="rounded-lg hover:font-bold hover:bg-indigo-white hover:text-indigo-black pr-1 pl-1"
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                />
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
                <Link href={router.pathname}>
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
          </div>
        </Main>
      </div>
    </Container>
  );
}
