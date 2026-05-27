import type { DemoScenario } from "../types";
import { arbitrum, base, optimism, usdcArbitrum, usdcBase, usdcOptimism } from "./chains";

const userAddress = "0xA11CE00000000000000000000000000000000A11";
const merchantAddress = "0xB0B0000000000000000000000000000000000B0B";

export const scenarios: DemoScenario[] = [
  {
    id: "checkout",
    title: "Merchant invoice",
    useCase: "A buyer pays a 10 USDC invoice on Base; the merchant settles on Arbitrum.",
    fromChain: base,
    toChain: arbitrum,
    fromToken: usdcBase,
    toToken: usdcArbitrum,
    amount: "10",
    swapType: "exact-input",
    userAddress,
    receiverAddress: merchantAddress,
    note: "Best for showing a payment flow where the product cares about the merchant's received outcome, not the bridge route."
  },
  {
    id: "repayment",
    title: "Exact repayment",
    useCase: "Borrower needs an exact USDC amount to arrive on Optimism.",
    fromChain: base,
    toChain: optimism,
    fromToken: usdcBase,
    toToken: usdcOptimism,
    amount: "25",
    swapType: "exact-output",
    userAddress,
    receiverAddress: "0xCRED17d000000000000000000000000000000001",
    note: "Exact-output highlights why an app may care about the destination amount more than the source amount."
  },
  {
    id: "merchant-treasury",
    title: "Treasury refill",
    useCase: "A team moves USDC into Arbitrum inventory for payouts.",
    fromChain: optimism,
    toChain: arbitrum,
    fromToken: usdcOptimism,
    toToken: usdcArbitrum,
    amount: "50",
    swapType: "exact-input",
    userAddress: "0xF1NANCE000000000000000000000000000000001",
    receiverAddress: merchantAddress,
    note: "This frame makes the solver inventory angle natural: availability depends on who can deliver where."
  }
];
