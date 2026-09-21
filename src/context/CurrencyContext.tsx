import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'ARS' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  usdRate: number;
  formatPrice: (arsAmount: number) => string;
  convertToUsd: (arsAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Reference exchange rate (1 USD = 1,250 ARS)
const USD_RATE = 1250;

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ondigu_currency') as Currency;
      if (saved === 'ARS' || saved === 'USD') return saved;
    }
    return 'ARS';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('ondigu_currency', c);
    } catch {
      // ignore
    }
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'ARS' ? 'USD' : 'ARS');
  };

  const convertToUsd = (arsAmount: number) => {
    return Math.round(arsAmount / USD_RATE);
  };

  const formatPrice = (arsAmount: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(arsAmount / USD_RATE);
      return `u$s ${usd.toLocaleString('en-US')}`;
    }
    return `$${arsAmount.toLocaleString('es-AR')}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        usdRate: USD_RATE,
        formatPrice,
        convertToUsd,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
