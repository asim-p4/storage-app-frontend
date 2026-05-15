import { axiosWithCreds, axiosWithoutCreds } from "./axiosInstances";

export const createSubscription = async (id) => {
  const { data } = await axiosWithCreds.post("/subscriptions", { id });
  return data;
};
