export function formatQuoteExpiry(unixSeconds: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Hong_Kong",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date(unixSeconds * 1000));

  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("month")} ${part("day")}, ${part("year")}, ${part("hour")}:${part("minute")} HKT`;
}
