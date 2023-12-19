import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import DesktopHeader from './DesktopHeader';
import Button from '../buttons/Button';
import useViewport from 'utils/address/helper';
import { useWalletSelector } from 'contexts/WalletSelectorContext';
import Modal from 'components/modals/Modal';

const DesktopHeaderBase = () => {
  const { cutAddress } = useViewport();
  const {
    dispatch,
    state: { wallet },
  } = useWalletSelector();

  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectNetwork, setSelectNetwork] = useState(false);

  const handleOptionChange = (selectedValue) => {
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

  const handleClick = () => {
    setSelectNetwork(true);
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
      <div>
        <button
          className="bg-indigo-buttonblue hover:bg-indigo-light text-white font-bold py-1 px-2 rounded border mr-2 mt-2"
          onClick={handleClick}
        >
          <div className="text-white-light">Select Network</div>
        </button>
        <Modal title={'Select Network'} visible={selectNetwork}>
          <div className="flex items-center justify-center h-full">
            <div className="fixed top-4 right-4 transform scale-100">
              <button onClick={() => setSelectNetwork(false)}>
                <img src="/images/x.png" />
              </button>
            </div>
            <div className="flex flex-col items-start justify-center mr-8">
              <a
                href="#"
                onClick={() => handleOptionChange('Near Protocol')}
                className="hover:bg-indigo-slate p-2 rounded-md text-center mb-2 border-2"
              >
                <div className="flex items-center">
                  <button className="p-2">
                    <img src="/images/near.png" width="50" height="40" />
                  </button>
                  <div className="mr-8 mb-1 text-lg">Near Protocol</div>
                </div>
              </a>

              <a
                href="#"
                onClick={() => handleOptionChange('Polygon Matic')}
                className="hover:bg-indigo-slate p-2 rounded-md text-center mb-2 border-2"
              >
                <div className="flex items-center">
                  <button className="p-2 ml-2">
                    <img src="/images/polygon.png" width="40" height="40" />
                  </button>
                  <div className="mr-8 text-lg">Polygon Matic</div>
                </div>
              </a>
            </div>
          </div>
        </Modal>
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
