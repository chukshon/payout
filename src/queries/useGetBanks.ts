import { useQuery } from "react-query";
import { getBanks } from "../services/requests";
import { useAuth } from "../context/authContext";
import { BankT, optionT } from "../types";

function useGetBanks() {
  const { authToken, setIsLoggedIn } = useAuth();
  const { data, isLoading: isLoadingBanks } = useQuery({
    queryKey: [],
    queryFn: () => getBanks(authToken as string),
    onError: () => {
      setIsLoggedIn(false);
      localStorage.clear();
    },
    retry: 0,
  });

  const Banks: optionT[] = data?.data?.responseBody?.map((bank: BankT) => {
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
