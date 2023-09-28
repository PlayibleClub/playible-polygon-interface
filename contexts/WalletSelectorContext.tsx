import { Wallet } from 'ethers';
import React, { useEffect, type PropsWithChildren } from 'react';

declare global {
  interface Window {
    ethereum: InjectedProviders & {
      on: (...args: any[]) => void;
      removeListener?: (...args: any[]) => void;
      request<T = any>(args: any): Promise<T>;
    };
  }
}
type ConnectAction = { type: 'connect'; wallet: string };
type DisconnectAction = { type: 'disconnect' };
type PageLoadedAction = { type: 'pageLoaded'; isMetamaskInstalled: boolean };
type LoadingAction = { type: 'loading' };
type InjectedProviders = {
  isMetaMask?: true;
};

type Action = ConnectAction | DisconnectAction | PageLoadedAction | LoadingAction;

type Dispatch = (action: Action) => void;

type Status = 'loading' | 'idle' | 'pageNotLoaded';

type State = {
  wallet: string | null;
  isMetamaskInstalled: boolean;
  isSignedIn: boolean;
  status: Status;
};

const WalletSelectorContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

const initialState: State = {
  wallet: null,
  isMetamaskInstalled: false,
  status: 'loading',
  isSignedIn: false,
} as const;

const localStorageKey = 'metamaskState';
function metamaskReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'connect': {
      const { wallet } = action;
      const newState = { ...state, wallet, status: 'idle' as Status, isSignedIn: true };
      localStorage.setItem(localStorageKey, JSON.stringify(newState)); // Save state to local storage
      return newState;
    }
    case 'disconnect': {
      const newState = { ...state, wallet: null, isSignedIn: false };
      localStorage.setItem(localStorageKey, JSON.stringify(newState)); // Save state to local storage
      return newState;
    }
    case 'pageLoaded': {
      const { isMetamaskInstalled } = action;
      const storedState = localStorage.getItem(localStorageKey);
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return { ...parsedState, isMetamaskInstalled }; // Load state from local storage
      }
      return { ...state, isMetamaskInstalled };
    }
    case 'loading': {
      return { ...state, status: 'loading' };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}

function WalletSelectorContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(metamaskReducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    if (typeof window !== undefined) {
      // start by checking if window.ethereum is present, indicating a wallet extension
      const ethereumProviderInjected = typeof window.ethereum !== 'undefined';
      // this could be other wallets so we can verify if we are dealing with metamask
      // using the boolean constructor to be explicit and not let this be used as a falsy value (optional)
      const isMetamaskInstalled = ethereumProviderInjected && Boolean(window.ethereum.isMetaMask);

      dispatch({ type: 'pageLoaded', isMetamaskInstalled });
    }
  }, []);

  return <WalletSelectorContext.Provider value={value}>{children}</WalletSelectorContext.Provider>;
}

function useWalletSelector() {
  const context = React.useContext(WalletSelectorContext);
  if (context === undefined) {
    throw new Error('useMetamask must be used within a MetamaskProvider');
  }
  return context;
}

export { WalletSelectorContextProvider, useWalletSelector };
