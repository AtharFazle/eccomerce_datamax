import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactionsByUserId } from "@/services/transaction";
import { Transaction } from "@/types";
import { TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  userId: string;
};

const StatisticsCard = ({ userId }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (userId) {
      getTransactionsByUserId(userId).then((data) =>
        setTransactions(data)
      );
    }
  }, [userId]);

  const totalPrice = useMemo(() => transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  ), [transactions]);
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Statistik Bulan Ini
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Pembelian</span>
            <span className="font-semibold">{transactions.length} paket</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Pengeluaran</span>
            <span className="font-semibold">Rp {totalPrice}</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-gray-600">Cashback Earned</span>
            <span className="font-semibold text-green-600">Rp 15.000</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
