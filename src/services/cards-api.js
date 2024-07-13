import axiosClient from "@/utils/axiosClient";

export const getAllCards = async function () {
  const res = await axiosClient().get("/card");

  if (!res.status === 200)
    throw new Error("Something went wrong while fetching cards data");

  const { data } = res.data;

  return data;
};

export const getCardById = async function (id) {
  const res = await axiosClient().get(`/card/${id}`);

  if (!res.status === 200)
    throw new Error("Couldn't fetch card data. Please try again later.");

  const { data } = res.data;

  return data;
};

export const deleteCardById = async function (id) {
  const res = await axiosClient().delete(`/card/${id}`);

  if (!res.status === 204)
    throw new Error("Couldn't delete this card. please try again later.");
};

export const updateCardById = async function (id, data) {
  const res = await axiosClient().put(`/card/${id}`, data);

  if (!res.status === 200)
    throw new Error("Couldn't update card. please try again later");
};
