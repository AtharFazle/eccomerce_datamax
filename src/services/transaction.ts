import api from "@/lib/axios";
import { DataPackage, PaymentMethod, Transaction, User } from "@/types";

export interface CreateTransactionPayload {
  packageId: string;
  userId: string;
  amount: number;
  phone: string;
  paymentMethodId: string;
}

export const updateStatusTransaction = async (transactionId: string) => {
  await api.patch(`/transactions/${transactionId}`, { status: "success" });

  const { data: transactions } = await api.get("/transactions");
  const transaction = transactions.find(
    (t: Transaction) => t.id === transactionId
  );

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  // Ambil semua data paket
  const { data: dataPackages } = await api.get("/dataPackages");
  const dataPackage = dataPackages.find(
    (p: DataPackage) => p.id === transaction.packageId
  );

  if (!dataPackage) {
    throw new Error("Data package not found");
  }

  const validityStr = dataPackage.validity || "0 Hari";
  const durationDays = parseInt(validityStr.replace(/\D/g, ""), 10);

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + durationDays);

  const activePackage = {
    id: crypto.randomUUID(),
    userId: transaction.userId,
    packageId: transaction.packageId,
    transactionId: transactionId,
    status: "active",
    usedGB: "0GB",
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  await api.post("/activePackages", activePackage);

  return true;
};

export async function createTransaction(payload: CreateTransactionPayload) {
  const transaction = {
    ...payload,
    id: crypto.randomUUID(),
    status: "pending",
    date: new Date().toISOString(),
  };

  await api.post("/transactions", transaction);
  return transaction;
}

export async function getTransactionsByUserId(userId: string) {
  const [transactions, users, packages, paymentMethods] = await Promise.all([
    api.get("/transactions"),
    api.get("/users"),
    api.get("/dataPackages"),
    api.get("/paymentMethods"),
  ]);

  const filteredTransactions = transactions.data.filter(
    (transaction: any) => transaction.userId === userId
  );

  filteredTransactions.forEach((transaction: Transaction) => {
    transaction.user = users.data.find(
      (user: User) => user.id === transaction.userId
    );
    transaction.package = packages.data.find(
      (packageData: DataPackage) => packageData.id === transaction.packageId
    );

    transaction.paymentMethod = paymentMethods.data.find(
      (paymentMethod: PaymentMethod) =>
        paymentMethod.id === transaction.paymentMethodId
    );

  });


  return filteredTransactions;
}

export async function getTransactionById(transactionId: string) {
  const response = await api.get(`/transactions`);

  if (!response.data?.length) return undefined;

  const selectedTransaction = response.data.find(
    (transaction: any) => transaction.id === transactionId
  );

  const [users, packages, paymentMethodIds] = await Promise.all([
    api.get("/users"),
    api.get("/dataPackages"),
    api.get("/paymentMethods"),
  ]);

  selectedTransaction.user = users.data.find(
    (user: any) => user.id === selectedTransaction.userId
  );
  selectedTransaction.package = packages.data.find(
    (packageData: any) => packageData.id === selectedTransaction.packageId
  );
  selectedTransaction.paymentMethod = paymentMethodIds.data.find(
    (paymentMethod: any) =>
      paymentMethod.id === selectedTransaction.paymentMethodId
  );

  return selectedTransaction;
}

export async function getPaymentMethods() {
  const response = await api.get("/paymentMethods");
  return response.data;
}
