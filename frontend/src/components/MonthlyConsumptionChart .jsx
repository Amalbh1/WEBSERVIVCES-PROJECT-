import React, { useEffect, useRef } from "react";

const ConsumptionChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const consumptionData = [
        data.month_1,
        data.month_2,
        data.month_3,
        data.month_4,
        data.month_5,
        data.month_6,
        data.month_7,
        data.month_8,
        data.month_9,
        data.month_10,
        data.month_11,
        data.month_12,
      ];

      const chartHeight = 300;
      const chartWidth = 500;
      const barWidth = 40;
      const spacing = 20;
      const maxValue = Math.max(...consumptionData);
      const yAxisMargin = 60; // Adjust this value for spacing on the left side

      // Clear canvas before drawing
      ctx.clearRect(0, 0, chartWidth + yAxisMargin, chartHeight);

      // Draw y-axis labels (from 0GB to max value)
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      const step = maxValue / 5; // Determine step size based on the max value
      for (let i = 0; i <= 5; i++) {
        const value = Math.round(step * i);
        const y = chartHeight - (value / maxValue) * chartHeight;
        ctx.fillText(`${value}GB`, yAxisMargin - 10, y); // Adding space on the left
      }

      // Draw bars
      consumptionData.forEach((value, index) => {
        const x = index * (barWidth + spacing) + spacing + yAxisMargin; // Adding space on the left
        const y = chartHeight - (value / maxValue) * chartHeight;
        const height = (value / maxValue) * chartHeight;

        // Draw bar
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(x, y, barWidth, height);

        // Add month label
        ctx.fillStyle = "#000";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(months[index], x + barWidth / 2, chartHeight + 15);
      });

      // Draw x-axis label
      ctx.fillText("Months", chartWidth / 2 + yAxisMargin, chartHeight + 40);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-4">Monthly Consumation</h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border rounded-lg p-8"
      ></canvas>
    </div>
  );
};

export default ConsumptionChart;
