export const formatTime = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const normalizeTag = (tag) => {
  return tag.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
