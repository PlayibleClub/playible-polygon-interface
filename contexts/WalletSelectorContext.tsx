import React, { createContext, useContext, useState, useCallback } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}
// Define the context
interface WalletSelectorContextValue {
  accountId: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const WalletSelectorContext = React.createContext<WalletSelectorContextValue | null>(null);

// Context Provider component
export const WalletSelectorContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accountId, setAccountId] = useState<string | null>(null);

  // Connect wallet function
  const connectWallet = useCallback(async () => {
    try {
      // Request access to user's MetaMask accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccountId(accounts[0] || null);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  }, []);

  // Disconnect wallet function
  const disconnectWallet = useCallback(() => {
    setAccountId(null);
  }, []);

  // Render children with context value
  return (
    <WalletSelectorContext.Provider
      value={{
        accountId,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

// Custom hook to consume the context
export function useWalletSelector() {
  const context = React.useContext(WalletSelectorContext);

  if (!context) {
    throw new Error('useWalletSelector must be used within a WalletSelectorContextProvider');
  }

  return context;
}
