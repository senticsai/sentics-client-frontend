function formatTimestamp(timestamp) {
  const date = new Date(Number(timestamp));
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year} ${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

function formatUnixTimestamp(timestamp) {
  const date = new Date(Number(timestamp) * 1000);
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year} ${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

export {formatTimestamp, formatUnixTimestamp};
