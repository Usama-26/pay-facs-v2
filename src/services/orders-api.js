import axiosClient from "@/utils/axiosClient";

export async function getAllOrders() {
  const res = await axiosClient().get("/order/GetAllOrders");

  if (res.status !== 200) throw new Error("Couldn't get orders");

  return res.data;
}

export async function getOrderById(id) {
  const res = await axiosClient().get(`/order/GetOrderById/${id}`);

  if (res.status !== 200) throw new Error("Couldn't get order details");

  return res.data;
}

export async function updateOrderById(id, body) {
  const res = await axiosClient().put(`/user/updateOrder/${id}`, body);

  if (res.status !== 200) throw new Error("Couldn't update order");

  return res.data;
}
export async function deleteOrderById(id) {
  const res = await axiosClient().delete(`/order/DeleteOrder/${id}`);

  if (res.status !== 200) throw new Error("Order Not Found");

  return res.data;
}
