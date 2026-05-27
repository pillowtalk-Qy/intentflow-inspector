import type { DemoScenario, IntentRequest, QuoteResult } from "../types";
import { createMockQuote } from "../data/mockQuote";
import { toSmallestUnit } from "../utils/amounts";
import { interoperableAddress } from "../utils/interoperableAddress";

const QUOTE_URL = "https://order.li.fi/quote/request";
const REQUEST_TIMEOUT_MS = 8000;

export function buildIntentRequest(scenario: DemoScenario): IntentRequest {
  const amount = toSmallestUnit(scenario.amount, scenario.fromToken.decimals);
  const destinationAmount = toSmallestUnit(scenario.amount, scenario.toToken.decimals);

  return {
    user: interoperableAddress(scenario.fromChain, scenario.userAddress),
    intent: {
      intentType: "oif-swap",
      inputs: [
        {
          user: interoperableAddress(scenario.fromChain, scenario.userAddress),
          asset: interoperableAddress(scenario.fromChain, scenario.fromToken.address),
          amount: scenario.swapType === "exact-input" ? amount : null
        }
      ],
      outputs: [
        {
          receiver: interoperableAddress(scenario.toChain, scenario.receiverAddress),
          asset: interoperableAddress(scenario.toChain, scenario.toToken.address),
          amount: scenario.swapType === "exact-output" ? destinationAmount : null
        }
      ],
      swapType: scenario.swapType
    },
    supportedTypes: ["oif-escrow-v0"]
  };
}

export async function requestQuote(scenario: DemoScenario): Promise<QuoteResult> {
  const request = buildIntentRequest(scenario);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(QUOTE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`LI.FI order server returned ${response.status}`);
    }

    const data = await response.json();
    const quotes = Array.isArray(data.quotes) ? data.quotes : [];

    if (quotes.length === 0) {
      throw new Error("No live quotes were returned for this demo route.");
    }

    return {
      source: "live",
      quotes: quotes.map((quote: unknown) => normalizeQuote(quote, scenario))
    };
  } catch (error) {
    return {
      source: "fallback",
      quotes: [createMockQuote(scenario)],
      message: error instanceof Error ? error.message : "Live quote failed, using fallback quote."
    };
  } finally {
    window.clearTimeout(timeout);
  }
}

function normalizeQuote(rawQuote: unknown, scenario: DemoScenario) {
  const raw = rawQuote as Record<string, any>;
  const preview = raw.preview ?? {};
  const input = preview.inputs?.[0] ?? {};
  const output = preview.outputs?.[0] ?? {};
  const metadata = raw.metadata ?? {};
  const inputAsset = String(input.asset ?? input.token ?? scenario.fromToken.address);
  const outputAsset = String(output.asset ?? output.token ?? scenario.toToken.address);

  return {
    quoteId: String(raw.quoteId ?? raw.id ?? "live-quote"),
    validUntil: normalizeTimestamp(raw.validUntil ?? raw.expiresAt),
    preview: {
      inputs: [
        {
          user: String(input.user ?? "Unknown user"),
          asset: inputAsset,
          amount: String(input.amount ?? "0"),
          chainId: Number(input.chainId ?? scenario.fromChain.id),
          tokenSymbol: inferTokenSymbol(input, inputAsset, scenario, "input"),
          decimals: Number(input.decimals ?? scenario.fromToken.decimals)
        }
      ],
      outputs: [
        {
          receiver: String(output.receiver ?? "Unknown receiver"),
          asset: outputAsset,
          amount: String(output.amount ?? "0"),
          chainId: Number(output.chainId ?? scenario.toChain.id),
          tokenSymbol: inferTokenSymbol(output, outputAsset, scenario, "output"),
          decimals: Number(output.decimals ?? scenario.toToken.decimals)
        }
      ]
    },
    metadata: {
      exclusiveFor: metadata.exclusiveFor ?? raw.exclusiveFor ?? null,
      solverName: String(metadata.solverName ?? metadata.name ?? "Live solver"),
      estimatedDelivery: String(metadata.estimatedDelivery ?? "Depends on solver and route")
    },
    partialFill: Boolean(raw.partialFill ?? false),
    failureHandling: String(raw.failureHandling ?? "Route dependent")
  };
}

function normalizeTimestamp(value: unknown) {
  if (typeof value === "number") {
    return value > 1000000000000 ? Math.floor(value / 1000) : value;
  }

  if (typeof value === "string") {
    const numeric = Number(value);

    if (Number.isFinite(numeric)) {
      return numeric > 1000000000000 ? Math.floor(numeric / 1000) : numeric;
    }

    const parsed = Date.parse(value);

    if (Number.isFinite(parsed)) {
      return Math.floor(parsed / 1000);
    }
  }

  return Math.floor(Date.now() / 1000) + 120;
}

function inferTokenSymbol(rawToken: any, asset: string, scenario: DemoScenario, side: "input" | "output") {
  const explicitSymbol = rawToken.tokenSymbol ?? rawToken.symbol;

  if (explicitSymbol) {
    return String(explicitSymbol);
  }

  const normalizedAsset = asset.toLowerCase();

  if (normalizedAsset.includes(scenario.fromToken.address.toLowerCase())) {
    return scenario.fromToken.symbol;
  }

  if (normalizedAsset.includes(scenario.toToken.address.toLowerCase())) {
    return scenario.toToken.symbol;
  }

  return side === "input" ? scenario.fromToken.symbol : scenario.toToken.symbol;
}
