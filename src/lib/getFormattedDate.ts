export default function getFormattedDate(date: Date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  } as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
