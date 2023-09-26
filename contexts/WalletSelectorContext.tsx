import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface WalletSelectorContextValue {
  accountId: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  isLoading: boolean;
}

const WalletSelectorContext = React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accountId, setAccountId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accountId');
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accountId', accountId || '');
    }
  }, [accountId]);

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccountId(accounts[0] || null);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAccountId(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accountId');
    }
  }, []);

  return (
    <WalletSelectorContext.Provider
      value={{
        accountId,
        connectWallet,
        disconnectWallet,
        isLoading,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = React.useContext(WalletSelectorContext);

  if (!context) {
    throw new Error('useWalletSelector must be used within a WalletSelectorContextProvider');
  }

  return context;
}
