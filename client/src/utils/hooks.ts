import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export const useAxios = () => {
  const [loading, setLoading] = useState(false);

  const fetch = async <T>(options: AxiosRequestConfig) => {
    setLoading(true);
    const response = await axios<T>(options);
    setLoading(false);

    return response;
  };

  return [fetch, loading] as const;
};
