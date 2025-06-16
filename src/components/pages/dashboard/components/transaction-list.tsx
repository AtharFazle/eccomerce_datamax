import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Transaction } from "@/types";
import { getTransactionsByUserId } from "@/services/transaction";
import { formatRp } from "@/lib/formatter";

const TransactionList = ({ id }: { id: string }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (id) {
      getTransactionsByUserId(id).then((data) => setTransactions(data.slice(0, 3)));
    }
  }, [id]);

  const getButtonStatus = (status: Transaction['status']) => {
      switch (status) {
          case 'success':
              return 'success'
          case 'failed':
              return 'destructive'
          case 'pending':
              return 'outline'
          default:
              return 'default'
      }
  }
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>{transactions.length} transaksi terakhir Anda</CardDescription>
          </div>
          <Link to={{ pathname: "/transactions" }}>
            <Button variant="ghost" size="sm">
              Lihat Semua
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{transaction.package.name}</p>
                    <p className="text-sm text-gray-600">{moment(transaction.date).format("YYYY-MM-DD")}</p>    
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatRp(transaction.amount)}</p>
                <Badge
                  variant={getButtonStatus(transaction.status)}
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
