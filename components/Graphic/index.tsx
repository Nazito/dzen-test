'use client';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  registerables as registerablesJS,
  Title,
  Tooltip,
} from 'chart.js';
import { addHours, format, startOfDay } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import io, { Socket } from 'socket.io-client';

import { getUserId } from '@/utils/user';

import { datasetsOptions, options } from './options';

let socket: Socket | null = null;

ChartJS.register(...registerablesJS);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Graphic() {
  const [count, setCount] = useState<number | null>(null);
  const [countsData, setCountsData] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('countsData');
      return storedData ? JSON.parse(storedData) : Array.from({ length: 24 }, () => 0);
    } else {
      return Array.from({ length: 24 }, () => 0);
    }
  });
  const todayStart = startOfDay(new Date());

  useEffect(() => {
    void socketInitializer();
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (count !== null) {
      setCountsData((prevCounts) => {
        const newCounts = [...prevCounts];
        const currentHourIndex = new Date().getHours();
        newCounts[currentHourIndex] = count;
        localStorage.setItem('countsData', JSON.stringify(newCounts));
        return newCounts;
      });
    }
  }, [count]);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io('', {
      path: '/api/socket_io',
    });

    socket.on('list', (count) => {
      setCount(count.length);
    });

    socket.emit('new-user-add', getUserId());
  };

  const hoursArray = Array.from({ length: 24 }, (_, index) => {
    const hour = addHours(todayStart, index);
    return format(hour, 'HH:mm');
  });

  const data: ChartData = {
    labels: hoursArray,
    datasets: [
      {
        data: countsData,
        ...datasetsOptions,
      },
    ],
  };

  return (
    <div>
      <Chart type='line' options={options} data={data} />
    </div>
  );
}

export default Graphic;
