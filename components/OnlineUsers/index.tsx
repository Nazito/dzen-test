import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { getUserId } from '@/utils/user';

let socket: Socket | null = null;

const OnlineUsers = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    void socketInitializer();
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

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

  if (!count) return null;

  return <div className='d-flex align-items-end pl-3'>Users: {count}</div>;
};

export default OnlineUsers;
