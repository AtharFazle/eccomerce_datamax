import api from "@/lib/axios";
import { ActivePackage, DataPackage, LoginData, RegisterData, User } from "@/types";
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

  const userActivePackages = activePackages.data.filter(
    (activePackage: ActivePackage) => 
      activePackage.userId === userId && activePackage.status === "active"
  );


  if (!userActivePackages || userActivePackages.length === 0) return null;

  const latestActivePackage = userActivePackages.reduce((latest: ActivePackage, current: ActivePackage) => {
    const latestDate = new Date(latest.startDate);
    const currentDate = new Date(current.startDate);
    return currentDate > latestDate ? current : latest;
  });

  const user = users.data.find((u: User) => u.id === latestActivePackage.userId);
  const dataPackage = packages.data.find((p: DataPackage) => p.id === latestActivePackage.packageId);

  const totalGB = parseGB(dataPackage?.data || "0GB");
  const usedGB = parseGB(latestActivePackage?.usedGB || "0GB");

  const percentageUsedRaw = totalGB > 0 ? (usedGB / totalGB) * 100 : 0;

  console.log(latestActivePackage, 'latestActivePackage');
  console.log(dataPackage, 'dataPackage');

  return {
    ...latestActivePackage,
    user,
    package: dataPackage,
    percentageUsed: percentageUsedRaw.toFixed(2) + "%",
    percentageUsedRaw,
    totalActivePackages: userActivePackages.length,
    // allActivePackages: userActivePackages, // Jika diperlukan untuk debugging atau keperluan lain
  };
};


export const setUser = (user: User) =>
  localStorage.setItem("user", JSON.stringify(user));
