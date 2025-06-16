import api from "@/lib/axios";
import { LoginData, RegisterData, User } from "@/types";
import { toast } from "react-toastify";

export const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const login = async (form: LoginData, navigate: any) => {
  try {
    const response = await api.get("/users");
    const users = response.data;

    const user = users.find(
      (u: any) => u.email === form.email && u.password === form.password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast("Login berhasil", { type: "success" });
      navigate("/dashboard");
      return true;
    } else {
      toast("Email atau password salah", { type: "error" });
      return false;
    }
  } catch (error) {
    console.error(error);
    toast("Terjadi kesalahan saat login", { type: "error" });
    return false;
  }
};

export const createUser = async (user: RegisterData) => {
  try {
    await api.post("/users", user);
  } catch (error) {
    console.error(error);
  }
};

export const getUserActivePackages = async (userId: string) => {
  const activePackages = await api.get("/activePackages");

  const [users, packages] = await Promise.all([
    api.get("/users"),
    api.get("/dataPackages"),
  ]);

  const parseGB = (val: string) =>
    parseFloat(val.toUpperCase().replace("GB", "").trim());

  const userActive = activePackages.data.find(
    (activePackage: any) => activePackage.userId === userId
  );

  if (!userActive) return null;

  const user = users.data.find((u: any) => u.id === userActive.userId);
  const dataPackage = packages.data.find((p: any) => p.id === userActive.packageId);

  const totalGB = parseGB(dataPackage?.data || "0GB");
  const usedGB = parseGB(userActive?.usedGB || "0GB");

  const percentageUsedRaw = totalGB > 0 ? (usedGB / totalGB) * 100 : 0;

  return {
    ...userActive,
    user,
    package: dataPackage,
    percentageUsed: percentageUsedRaw.toFixed(2) + "%",
    percentageUsedRaw,
  };
};


export const setUser = (user: User) =>
  localStorage.setItem("user", JSON.stringify(user));
