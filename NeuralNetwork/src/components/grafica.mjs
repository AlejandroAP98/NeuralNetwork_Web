import { createChart } from "lightweight-charts";

export default function Grafica(errores) {
    const datosTransformados = [];
    const updateChart = () => {
        const newDataPoint = {
            time: datosTransformados.length + 1,
            value: errores[datosTransformados.length]
        };

        datosTransformados.push(newDataPoint);
        lineSeries.setData(datosTransformados.slice()); 
        chart.timeScale().fitContent(lineSeries);
    
        if (datosTransformados.length >= errores.length) {
            clearInterval(updateInterval);
        }
    };
    const chartOptions = { 
        layout: { 
            textColor: 'black',
            background: { type: 'solid', color: 'white' },
            fontSize: 14,
        }, 
        timeScale: { visible: false },
        grid: { vertLines: { visible: false }, horzLines: { visible: false } },
    };

    const chart = createChart(document.getElementById('container'), chartOptions);
    const lineSeries = chart.addLineSeries({ color: '#000000' });
    lineSeries.applyOptions({
        priceFormat: {
            type: 'custom',
            minMove: '0.00001',
            formatter: (price) => price.toFixed(5), 
        },
        lineWidth: 3,
    });
    lineSeries.setData(datosTransformados);
    chart.timeScale().fitContent(lineSeries);
    const updateInterval = setInterval(updateChart, 100);
}
