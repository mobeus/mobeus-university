/// <reference types="vite/client" />

declare global {
  interface UIFramework {
    TeleAcknowledge: (message: string, options?: { sayExactly?: boolean, inputText?: string }) => void;
    registerTool?: (toolDefinition: any, executor: (args: any) => Promise<any>) => void;
    TellTele: (message: string) => void;
    setAvatarVolume?: (volume: number) => void;
    getAvatarVolume?: () => number;
  }

  interface Window {
    UIFramework?: UIFramework;
    teleNavigation: {
      navigateToSection: (navigationData: any) => boolean | { disableNewResponseCreation: boolean };
      getCurrentSection: () => string;
    };
    navigateToSection: (data: any) => boolean;
    teleVolume: {
      setVolume: (level: number) => void;
      adjustVolume: (delta: number) => void;
      getVolume: () => number;
    };
    updateLeaseCalculator?: (data: {
      vehicleName?: string;
      price?: number;
      leaseOption?: any;
      financeOption?: any;
      animationClass?: string;
    }) => void;
    updateFinanceAndLeaseCalculator?: (data: {
      mode?: "lease" | "finance";
      vehiclePrice?: number;
      vehicleName?: string;
      interestRate?: number;
      defaultDownPayment?: number;
      defaultTerm?: number;
      residualValue?: number;
    }) => void;
    updateMortgageReview?: (data: {
      propertyAddress?: string;
      purchasePrice?: number;
      propertyType?: "rental" | "flip";
      expectedMonthlyRent?: number;
      annualPropertyTaxes?: number;
      annualInsurance?: number;
      defaultDownPayment?: number;
      defaultInterestRate?: number;
      defaultTerm?: number;
    }) => void;
    scrollPage?: (direction: 'up' | 'down', amount?: 'little' | 'medium' | 'lot' | 'max' | number) => string;
    setPageContrast?: (mode: 'high' | 'normal' | 'low') => boolean;
    getPageContrast?: () => 'high' | 'normal' | 'low';
  }

}

export { };
