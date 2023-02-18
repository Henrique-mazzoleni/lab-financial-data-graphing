const apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";

const [startDateInput] = document.getElementsByName('startDate')
const [endDateInput] = document.getElementsByName('endDate')
const currencyInput = document.getElementById('currency')
const maxValue = document.getElementById('maxValue')
const minValue = document.getElementById('minValue')
const now = new Date();
startDateInput.value = '2015-01-01'
endDateInput.valueAsDate = new Date()

const fetchData = async () => {
  const response = await fetch(`${apiUrl}?start=${startDateInput.value}&end=${endDateInput.value}&currency=${currencyInput.value}`);
  const rawData = await response.json();
    
  maxValue.innerHTML = `${Math.max(...Object.values(rawData.bpi)).toFixed(2)} ${currencyInput.value}`
  minValue.innerHTML = `${Math.min(...Object.values(rawData.bpi)).toFixed(2)} ${currencyInput.value}`

  return Object.entries(rawData.bpi).map(entry => ({date: entry[0], value: entry[1]}));
};

const canvas = document.getElementById('myChart')
let graph;

const drawGraph = async () => {
    const data = await fetchData();

    
    if (graph) graph.destroy();
    graph = new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.map(row => row.date),
            datasets: [
                {
                    label: 'Bitcoin Price Index',
                    data: data.map(row => row.value)
                }
            ]
        }
    })
}


startDateInput.addEventListener('change', drawGraph)
endDateInput.addEventListener('change', drawGraph)
currencyInput.addEventListener('change', drawGraph)

drawGraph()

