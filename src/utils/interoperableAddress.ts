import type { Chain } from "../types";

export function interoperableAddress(chain: Chain, address: string) {
  const normalizedAddress = address.toLowerCase().replace(/^0x/, "");
  const chainRef = toMinimalHexBytes(chain.id);

  return `0x00010000${toHexByte(chainRef.length / 2)}${chainRef}${toHexByte(20)}${normalizedAddress}`;
}

export function compactAddress(value: string) {
  if (value.length <= 16) {
    return value;
  }

  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

function toHexByte(value: number) {
  return value.toString(16).padStart(2, "0");
}

function toMinimalHexBytes(value: number) {
  const hex = value.toString(16);
  return hex.length % 2 === 0 ? hex : `0${hex}`;
}
