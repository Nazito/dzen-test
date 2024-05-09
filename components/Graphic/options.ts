import { ChartOptions } from 'chart.js';

const stepSize = 1000;
const fontSize = 16;

const tension = 0.4;
const pointRadius = 2;
const borderWidth = 2;

export const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        stepSize,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          size: fontSize,
        },
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#0BA495',
      displayColors: false,
    },
  },
};

export const datasetsOptions = {
  borderColor: '#0BA495',
  backgroundColor: '#0BA495',
  tension,
  pointRadius,
  borderWidth,
};
