import { initiateTransfer } from "../services/requests";
import { useMutation } from "react-query";
import { useAuth } from "../context/authContext";
import { InitiateTransferPayload } from "../types";
import { toast } from "react-toastify";

function useInitiateTransfer() {
  const { authToken } = useAuth();
  const initiateTransferMutation = useMutation({
    mutationFn: async (payload: InitiateTransferPayload) => {
      return initiateTransfer(authToken as string, payload);
    },
    onSuccess: () => {
      toast("Transfer Successful");
    },
    onError: () => {
      toast("Something went wrong");
    },
  });
  return { initiateTransferMutation };
}

export default useInitiateTransfer;
