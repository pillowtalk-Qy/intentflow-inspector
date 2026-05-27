export type SwapType = "exact-input" | "exact-output";

export type Chain = {
  id: number;
  name: string;
  shortName: string;
  color: string;
};

export type Token = {
  symbol: string;
  decimals: number;
  address: string;
  chainId: number;
};

export type DemoScenario = {
  id: string;
  title: string;
  useCase: string;
  fromChain: Chain;
  toChain: Chain;
  fromToken: Token;
  toToken: Token;
  amount: string;
  swapType: SwapType;
  userAddress: string;
  receiverAddress: string;
  note: string;
};

export type IntentRequest = {
  user: string;
  intent: {
    intentType: "oif-swap";
    inputs: Array<{
      user: string;
      asset: string;
      amount: string | null;
    }>;
    outputs: Array<{
      receiver: string;
      asset: string;
      amount: string | null;
    }>;
    swapType: SwapType;
  };
  supportedTypes: string[];
};

export type QuoteItem = {
  quoteId: string;
  validUntil: number;
  preview: {
    inputs: Array<{
      user: string;
      asset: string;
      amount: string;
      chainId: number;
      tokenSymbol: string;
      decimals: number;
    }>;
    outputs: Array<{
      receiver: string;
      asset: string;
      amount: string;
      chainId: number;
      tokenSymbol: string;
      decimals: number;
    }>;
  };
  metadata: {
    exclusiveFor: string | null;
    solverName: string;
    estimatedDelivery: string;
  };
  partialFill: boolean;
  failureHandling: string;
};

export type QuoteResult = {
  source: "live" | "fallback";
  quotes: QuoteItem[];
  message?: string;
};

export type SolverQuote = {
  name: string;
  feeBps: number;
  inventory: "High" | "Medium" | "Low" | "Expired";
  eta: string;
  maxAmount: number;
  selected: boolean;
};
