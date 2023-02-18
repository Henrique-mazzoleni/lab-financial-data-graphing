const apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";

const fetchData = async () => {
  const apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";

  const now = new Date();
  const nowParsed = `${now.getFullYear()}-${now.getMonth().toString().padStart(2, '0')}-${now.getDay().toString().padStart(2, '0')}`;
  const oneYearAgoParsed = `${now.getFullYear() - 1}-${now.getMonth().toString().padStart(2, '0')}-${now.getDay().toString().padStart(2, '0')}`;
  const response = await fetch(`${apiUrl}?start=${oneYearAgoParsed}&end=${nowParsed}`);
  const data = await response.json();

  console.log(data);
};

fetchData();
