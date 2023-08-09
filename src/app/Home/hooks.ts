import { useEffect, useState } from "react";
import axios from "axios";

const useHome = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    fetchHistory();
  }, [paginationModel.page]);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `http://74.234.252.116:3000/api/ip-to-vulnerabilities?page=${paginationModel.page}&size=10`
      );
      setData(data);
      setIsLoading(false);
    } catch (error) {}
  };

  return {
    isLoading,
    data,
    setData,
    paginationModel,
    setPaginationModel,
  };
};

export default useHome;
