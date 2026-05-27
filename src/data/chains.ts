import type { Chain, Token } from "../types";

export const base: Chain = {
  id: 8453,
  name: "Base",
  shortName: "base",
  color: "#2f6df6"
};

export const arbitrum: Chain = {
  id: 42161,
  name: "Arbitrum",
  shortName: "arb",
  color: "#28a0f0"
};

export const optimism: Chain = {
  id: 10,
  name: "Optimism",
  shortName: "op",
  color: "#ff4a4a"
};

export const usdcBase: Token = {
  symbol: "USDC",
  decimals: 6,
  chainId: base.id,
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
};

export const usdcArbitrum: Token = {
  symbol: "USDC",
  decimals: 6,
  chainId: arbitrum.id,
  address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
};

export const usdcOptimism: Token = {
  symbol: "USDC",
  decimals: 6,
  chainId: optimism.id,
  address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"
};
