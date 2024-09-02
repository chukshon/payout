import { useQuery } from "react-query";
import { getBanks } from "../services/requests";
import { useAuth } from "../context/authContext";
import { BankT, optionT } from "../types";
import { toast } from "react-toastify";

function useGetBanks() {
  const { authToken, setIsLoggedIn } = useAuth();
  const { data, isLoading: isLoadingBanks } = useQuery({
    queryKey: [],
    queryFn: () => getBanks(authToken as string),
    onError: () => {
      toast("Session expired");
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
