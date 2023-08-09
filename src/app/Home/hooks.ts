import { useEffect, useState } from "react";
import axios from "axios";

const useHome = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://74.234.252.116:3000/api/ip-to-vulnerabilities?page=${page}&size=10`
        );
        setData(data);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchHistory();
  }, [page]);

  return {
    isLoading,
    data,
    setData,
    setPage,
    page,
  };
};

export default useHome;
