export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
