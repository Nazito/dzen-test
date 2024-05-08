import { getCookie, setCookie } from 'cookies-next';

export const getUserId = () => {
  const id = getCookie('user_id');

  if (!id) {
    const genId = 'id' + Math.random().toString(16).slice(2);
    setCookie('user_id', genId, {
      path: '/',
    });
  } else {
    return id;
  }
};
