import axiosClient from "@/utils/axiosClient";

export async function login(credentials) {
  const res = await axiosClient().post("/user/login", credentials);

  if (!res.status === 200) throw new Error("Email or Password is incorrect.");

  return res.data;
}

export async function signup(body) {
  const res = await axiosClient().post("/user/signup", body);

  if (!res.status === 201) throw new Error("Couldn't create new user");

  return res.data;
}
