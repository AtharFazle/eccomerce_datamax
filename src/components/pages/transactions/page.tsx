import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { ArrowLeft, Zap, Search, Filter, Download, Eye, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTransactionsByUserId } from "@/services/transaction"
import { getUser } from "@/services/user"
import { Transaction } from "@/types"
import { getStatusBadge } from "@/components/ui/badge-status"

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all");

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const userId = getUser()?.id

  useEffect(() => {
    if (userId) {
      getTransactionsByUserId(userId).then((data) =>
        setTransactions(data)
      );
    }
  }, [userId]);


  // const transactions = [
  //   {
  //     id: "TRX001",
  //     package: "Paket Unlimited 30 Hari",
  //     amount: 85000,
  //     date: "2024-12-15T10:30:00",
  //     status: "success",
  //     paymentMethod: "GoPay",
  //     phoneNumber: "081234567890",
  //   },
  //   {
  //     id: "TRX002",
  //     package: "Paket Harian 3GB",
  //     amount: 12000,
  //     date: "2024-12-14T15:45:00",
  //     status: "success",
  //     paymentMethod: "OVO",
  //     phoneNumber: "081234567890",
  //   },
  //   {
  //     id: "TRX003",
  //     package: "Paket Mingguan 10GB",
  //     amount: 45000,
  //     date: "2024-12-10T09:15:00",
  //     status: "success",
  //     paymentMethod: "Dana",
  //     phoneNumber: "081234567890",
  //   },
  //   {
  //     id: "TRX004",
  //     package: "Paket Bulanan 25GB",
  //     amount: 75000,
  //     date: "2024-12-08T14:20:00",
  //     status: "pending",
  //     paymentMethod: "Bank Transfer",
  //     phoneNumber: "081234567890",
  //   },
  //   {
  //     id: "TRX005",
  //     package: "Paket Harian 1GB",
  //     amount: 5000,
  //     date: "2024-12-05T11:10:00",
  //     status: "failed",
  //     paymentMethod: "ShopeePay",
  //     phoneNumber: "081234567890",
  //   },
  // ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.package.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalSpent = transactions.filter((t) => t.status === "success").reduce((sum, t) => sum + t.amount, 0)

  const thisMonthTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date)
    const now = new Date()
    return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear()
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={{pathname:"/dashboard"}}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DataMax
              </span>
            </div>
          </div>
          <Link to={{pathname:"/dashboard"}}>
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Riwayat Transaksi</h1>
          <p className="text-gray-600">Kelola dan pantau semua transaksi pembelian paket data Anda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Transaksi</p>
                  <p className="text-2xl font-bold">{transactions.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Pengeluaran</p>
                  <p className="text-2xl font-bold">Rp {totalSpent.toLocaleString("id-ID")}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bulan Ini</p>
                  <p className="text-2xl font-bold">{thisMonthTransactions.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cari berdasarkan ID transaksi atau nama paket..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="success">Berhasil</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Gagal</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Daftar Transaksi</CardTitle>
            <CardDescription>
              Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Tidak ada transaksi yang ditemukan</p>
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{transaction.package.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>ID: {transaction.id}</span>
                          <span>•</span>
                          <span>{formatDate(transaction.date)}</span>
                          <span>•</span>
                          <span>{transaction.paymentMethod.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">Rp {transaction.amount.toLocaleString("id-ID")}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
