import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import DesktopHeader from './DesktopHeader';
import Button from '../buttons/Button';
import useViewport from 'utils/address/helper';
import { useWalletSelector } from 'contexts/WalletSelectorContext';

const DesktopHeaderBase = () => {
  const { cutAddress } = useViewport();
  const {
    dispatch,
    state: { wallet },
  } = useWalletSelector();

  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    const env = process.env.POLYGON_ENV;
    let url;
    switch (env) {
      case 'production':
        url = 'mainnet';
        break;
      case 'development':
        url = 'testnet';
        break;
    }

    if (selectedValue === 'Near Protocol') {
      window.location.href =
        url === 'mainnet' ? 'https://app.playible.io/' : 'https://dev.app.playible.io/';
    } else if (selectedValue === 'Polygon Mainnet') {
      window.location.href =
        url === 'mainnet' ? 'https://polygon.playible.io/' : 'https://dev.polygon.playible.io/';
    }
  };

  const connectWallet = async () => {
    if (!wallet) {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setLoading(false);
      dispatch({ type: 'connect', wallet: accounts[0] });
      // @ts-ignore
      window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        dispatch({ type: 'connect', wallet: accounts[0] });
      });
    }
  };

  const disconnectWallet = async () => {
    if (wallet) {
      dispatch({ type: 'disconnect' });
    }
  };

  const renderWallet = () => {
    if (wallet) {
      return (
        <Button
          textColor="white-light font-bold"
          color="indigo-buttonblue"
          rounded="rounded-md"
          size="h-full py-1 px-1"
          onClick={disconnectWallet}
        >
          {cutAddress(wallet)}
        </Button>
      );
    } else {
      return (
        <Button
          rounded="rounded-sm "
          textColor="white-light"
          color="indigo-buttonblue"
          onClick={connectWallet}
          size="py-1 px-1 h-full"
        >
          <div className="flex flex-row text-sm h-12 items-center">
            <div className="text-xs text-light">Connect Wallet</div>
            <img className="ml-3 h-4 w-4" src="/images/wallet.png" alt="Img" />
          </div>
        </Button>
      );
    }
  };

  return (
    <DesktopHeader>
      {' '}
      <div className="flex flex-row text-sm h-12 items-center">
        <select
          className="bg-indigo-white iphone5:w-36 w-36 md:w-42 lg:w-36
    ring-2 ring-offset-4 ring-indigo-black ring-opacity-25 focus:ring-2 focus:ring-indigo-black 
    focus:outline-none cursor-pointer text-xs md:text-base mr-4 ring-offset-9 font-medium"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option className="ring-offset-9 font-medium px-4 p-1">Select Network</option>
          <option className="ring-offset-9 font-medium px-4 p-1">Near Protocol</option>
          <option className="ring-offset-9 font-medium px-4 p-1">Polygon Mainnet</option>
        </select>
      </div>
      {renderWallet()}
    </DesktopHeader>
  );
};

DesktopHeaderBase.propTypes = {
  color: PropTypes.string,
  isClosed: PropTypes.bool,
  setClosed: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

DesktopHeaderBase.defaultProps = {
  color: 'indigo-navy',
  // children: <div>Fantasy investr</div>
  children: <div />,
};

export default DesktopHeaderBase;
