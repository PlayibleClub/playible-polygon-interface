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

  return <DesktopHeader>{renderWallet()}</DesktopHeader>;
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
