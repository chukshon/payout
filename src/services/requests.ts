import axios from "axios";
import { InitiateTransferPayload } from "../types";

export const login = (token: string) => {
  return axios({
    method: "post",
    url: "https://sandbox.monnify.com/api/v1/auth/login",
    headers: { Authorization: `${token}` },
  });
};

export const getBanks = (token: string) => {
  return axios({
    method: "get",
    url: "https://sandbox.monnify.com/api/v1/banks",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const validateAccount = (
  token: string,
  accountNumber: string,
  bankCode: string
) => {
  return axios({
    method: "get",
    url: `https://sandbox.monnify.com/api/v1/disbursements/account/validate?accountNumber=${accountNumber}&bankCode=${bankCode}`,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const initiateTransfer = (
  token: string,
  data: InitiateTransferPayload
) => {
  return axios({
    method: "post",
    url: "https://sandbox.monnify.com/api/v2/disbursements/single",
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
};
