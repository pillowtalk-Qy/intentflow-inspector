export function toSmallestUnit(value: string, decimals: number) {
  const [whole = "0", fraction = ""] = value.trim().split(".");
  const paddedFraction = `${fraction}${"0".repeat(decimals)}`.slice(0, decimals);
  const normalized = `${whole}${paddedFraction}`.replace(/^0+(?=\d)/, "");
  return normalized || "0";
}

export function formatTokenAmount(amount: string, decimals: number) {
  const padded = amount.padStart(decimals + 1, "0");
  const whole = padded.slice(0, -decimals);
  const fraction = padded.slice(-decimals).replace(/0+$/, "");
  return fraction ? `${whole}.${fraction}` : whole;
}
