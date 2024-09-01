import { initiateTransfer } from "../services/requests";
import { useMutation } from "react-query";
import { useAuth } from "../context/authContext";
import { InitiateTransferPayload } from "../types";

function useInitiateTransfer() {
  const { authToken } = useAuth();
  const initiateTransferMutation = useMutation({
    mutationFn: async (payload: InitiateTransferPayload) => {
      return initiateTransfer(authToken as string, payload);
    },
    onSuccess: (data) => {
      alert("Transfer Successful");
    },
    onError: () => {
      alert("Something went wrong");
    },
  });
  return { initiateTransferMutation };
}

export default useInitiateTransfer;
