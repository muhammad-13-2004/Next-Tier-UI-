export function isCreditLimitError(error) {
  const message = String(error?.message ?? error ?? "").toLowerCase();

  return (
    message.includes("insufficient credit") ||
    message.includes("insufficient credits") ||
    message.includes("not enough credit") ||
    message.includes("daily limit") ||
    message.includes("credit limit") ||
    message.includes("out of credits") ||
    message.includes("no credits")
  );
}
