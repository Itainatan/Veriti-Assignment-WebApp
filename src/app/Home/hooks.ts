import { useEffect, useState } from "react";
import axios from "axios";

const useHome = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const { data: newData } = await axios.get(
        `http://74.234.252.116:3000/api/ip-to-vulnerabilities?page=${page}&size=10`
      );
      setData([...data, ...newData]);
      setIsLoading(false);

      if (!newData.length) setIsFinished(true)
    } catch (error) {}
  };

  return {
    isLoading,
    data,
    setData,
    setPage,
    page,
  };
};

export default useHome;
