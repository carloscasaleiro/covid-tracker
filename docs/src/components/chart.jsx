import React, { useEffect } from "react";
import Chart from "chart.js/auto";

function CovidChart({ data, selected, unique }) {
  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      const { cases, deaths } = data;

      const chartData = Object.keys(selected ? cases : deaths).map((date) => ({
        date,
        count: selected ? deaths[date] : cases[date],
      }));

      const chartContainer = document.getElementById("myChart");

      if (chartContainer && chartData) {
        const chartInstance = new Chart(chartContainer, {
          type: "bar",
          data: {
            labels: chartData.map((row) => row.date),
            datasets: [
              {
                label: selected ? `${unique} Deaths` : `${unique} Cases`,
                data: chartData.map((row) => row.count),
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            color: selected ? "red" : "#0dcaf0",
            borderColor: selected ? "red" : "#0dcaf0",
            backgroundColor: selected ? "red" : "#0dcaf0",
            scales: {
              y: {
                min: 0,
              },
              x: {
                ticks: {
                  callback: function (val, index) {
                    return index % 2 === 0 ? this.getLabelForValue(val) : "";
                  },
                },
              },
            },
          },
        });

        return () => {
          chartInstance.destroy();
        };
      }
    }
  }, [data, selected, unique]);

  return (
    <div className="chart-container">
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default CovidChart;
