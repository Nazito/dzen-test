import { useState } from 'react';

import { useAppAction } from '@/store/app/hooks';

const useApiRequest = () => {
  const { onSetAppLoading } = useAppAction();
  const [error, setError] = useState<null | string>(null);

  const sendRequest = async (url: string, options: object) => {
    onSetAppLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = await response.json();

      onSetAppLoading(false);

      return responseData;
    } catch (error) {
      setError('An error occurred while sending the request');
      onSetAppLoading(false);
    }
  };

  return {
    error,
    sendRequest,
  };
};

export default useApiRequest;
