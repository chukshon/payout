import axios from "axios";

export const login = (token: string) => {
  return axios({
    method: "post",
    url: "https://sandbox.monnify.com/api/v1/auth/login",
    headers: { Authorization: `Bearer ${token}` },
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
  bankCode: ""
) => {
  return axios({
    method: "get",
    url: `https://sandbox.monnify.com/api/v1/disbursements/account/validate?accountNumber=${accountNumber}&bankCode=${bankCode}`,
    headers: { Authorization: `Bearer ${token}` },
  });
};
