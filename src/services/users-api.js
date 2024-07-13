import axiosClient from "@/utils/axiosClient";

export async function getAllUsers() {
  const res = await axiosClient().get("/user/allUsers");

  if (res.status !== 200) throw new Error("Couldn't get users");

  return res.data;
}

export async function getUserById(id) {
  const res = await axiosClient().get(`/user/getUserById/${id}`);

  if (res.status !== 200) throw new Error("Couldn't get user");

  return res.data;
}

export async function updateUserById(id, body) {
  const res = await axiosClient().put(`/user/updateUser/${id}`, body);

  if (res.status !== 200) throw new Error("Couldn't update user");

  return res.data;
}
export async function deleteUserById(id) {
  const res = await axiosClient().delete(`/user/deleteUser/${id}`);

  if (res.status !== 200) throw new Error("User Not Found");

  return res.data;
}
