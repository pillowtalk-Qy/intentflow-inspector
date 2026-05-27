import type { DemoScenario, QuoteItem, SolverQuote } from "../types";
import { formatTokenAmount, toSmallestUnit } from "../utils/amounts";

export function createMockQuote(scenario: DemoScenario): QuoteItem {
  const sourceAmount = toSmallestUnit(scenario.amount, scenario.fromToken.decimals);
  const destinationAmount = toSmallestUnit(scenario.amount, scenario.toToken.decimals);
  const inputAmount = scenario.swapType === "exact-output" ? `${Math.round(Number(sourceAmount) * 1.01)}` : sourceAmount;
  const outputAmount = scenario.swapType === "exact-input" ? `${Math.max(1, Math.floor(Number(destinationAmount) * 0.9976))}` : destinationAmount;
  const solverAddress = "0x51A1F1Solver00000000000000000000000000001";

  return {
    quoteId: `demo-${scenario.id}-quote-001`,
    validUntil: Math.floor(Date.now() / 1000) + 180,
    preview: {
      inputs: [
        {
          user: scenario.userAddress,
          asset: scenario.fromToken.address,
          amount: inputAmount,
          chainId: scenario.fromChain.id,
          tokenSymbol: scenario.fromToken.symbol,
          decimals: scenario.fromToken.decimals
        }
      ],
      outputs: [
        {
          receiver: scenario.receiverAddress,
          asset: scenario.toToken.address,
          amount: outputAmount,
          chainId: scenario.toChain.id,
          tokenSymbol: scenario.toToken.symbol,
          decimals: scenario.toToken.decimals
        }
      ]
    },
    metadata: {
      exclusiveFor: solverAddress,
      solverName: "Demo Solver A",
      estimatedDelivery: "12-25 seconds"
    },
    partialFill: false,
    failureHandling: "refund-automatic"
  };
}

export function createSolverQuotes(scenario: DemoScenario): SolverQuote[] {
  const amount = Number(scenario.amount);

  return [
    {
      name: "Solver A",
      feeBps: scenario.id === "repayment" ? 8 : 6,
      inventory: "High",
      eta: "12-25s",
      maxAmount: Math.max(1000, amount * 50),
      selected: true
    },
    {
      name: "Solver B",
      feeBps: 9,
      inventory: "Medium",
      eta: "35-50s",
      maxAmount: Math.max(250, amount * 12),
      selected: false
    },
    {
      name: "Solver C",
      feeBps: 4,
      inventory: amount > 20 ? "Low" : "Expired",
      eta: amount > 20 ? "Unavailable" : "Expired",
      maxAmount: Math.max(10, amount / 2),
      selected: false
    }
  ];
}

export function quoteSummary(quote: QuoteItem) {
  const input = quote.preview.inputs[0];
  const output = quote.preview.outputs[0];

  return {
    inputText: `${formatTokenAmount(input.amount, input.decimals)} ${input.tokenSymbol}`,
    outputText: `${formatTokenAmount(output.amount, output.decimals)} ${output.tokenSymbol}`
  };
}
