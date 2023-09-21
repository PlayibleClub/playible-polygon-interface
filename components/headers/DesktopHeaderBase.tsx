import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import DesktopHeader from './DesktopHeader';
import Button from '../buttons/Button';
import { ethers } from 'ethers';
import useViewport from 'utils/address/helper';
import { useWalletSelector } from 'contexts/WalletSelectorContext';

const DesktopHeaderBase = () => {
  const { cutAddress } = useViewport();
  const { accountId, connectWallet, disconnectWallet } = useWalletSelector();

  const renderWallet = () => {
    if (accountId) {
      return (
        <Button
          textColor="white-light font-bold"
          color="indigo-buttonblue"
          rounded="rounded-md"
          size="h-full py-1 px-1"
          onClick={disconnectWallet}
        >
          {cutAddress(accountId)}
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
