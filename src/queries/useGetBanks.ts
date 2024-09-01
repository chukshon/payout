import { useQuery } from "react-query";
import { getBanks } from "../services/requests";
import { useAuth } from "../context/authContext";
import { BankT } from "../types";

function useGetBanks() {
  const { authToken, setIsLoggedIn } = useAuth();
  const { data, isLoading: isLoadingBanks } = useQuery({
    queryKey: [],
    queryFn: () => getBanks(authToken as string),
    onError: () => {
      setIsLoggedIn(false);
      localStorage.clear();
    },
  });

  const Banks: BankT[] = data?.data?.responseBody?.map((bank: BankT) => {
    return {
      label: bank.name,
      value: bank.code,
    };
  });

  return {
    Banks,
    isLoadingBanks,
  };
}

export default useGetBanks;
