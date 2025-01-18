import React, { useEffect, useRef } from "react";

const ConsumptionChart = ({ used, total }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const percentage = used / total;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#E5E7EB"; // Tailwind Gray-200
    ctx.fill();

    // Draw consumption arc
    ctx.beginPath();
    ctx.arc(
      radius,
      radius,
      radius - 10,
      -Math.PI / 2,
      2 * Math.PI * percentage - Math.PI / 2
    );
    ctx.lineTo(radius, radius); // Connect to the center for a filled arc
    ctx.fillStyle = "#4ADE80"; // Tailwind Green-400
    ctx.fill();

    // Draw donut hole
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 40, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFFFFF"; // White center hole
    ctx.fill();
  }, [used, total]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl text-center">
      <p className="text-lg font-semibold text-gray-800 uppercase">
        {" "}
        predicted usage
      </p>
      <div className="relative flex flex-col items-center ">
        <canvas ref={canvasRef} width={200} height={200} />
        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-2xl font-bold text-gray-800">{used} GB</p>
          <p className="text-sm text-gray-500">of {total} GB</p>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionChart;
