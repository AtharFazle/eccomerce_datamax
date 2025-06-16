import {Link} from "react-router-dom"
import {
  Bell,
  User,
  // CreditCard,
  // History,
  Settings,
  LogOut,
  Zap,
  Wifi,
  // TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getUser } from "@/services/user"
import { User as UserType } from "@/types"
import TransactionList from "./components/transaction-list"
import StatisticsCard from "./components/statistics"
import ActivePacket from "./components/active-packet"

export default function Dashboard() {
  const user = getUser();

  const isMemberGold = (balance:UserType['balance']) => balance >= 1000;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={{pathname: "/"}} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DataMax
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>NF</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Pengaturan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Selamat Datang, {user?.name} 👋</h1>
          <p className="text-gray-600">Kelola paket data dan transaksi Anda dengan mudah</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Package Status */}
            <ActivePacket userId={user?.id!}/>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Lakukan transaksi dengan mudah</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 gap-4">
                  <Link to={{pathname: "/packages"}}>
                    <Button className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wifi className="w-6 h-6" />
                        <div className="text-left">
                          <p className="font-semibold">Beli Paket Data</p>
                          <p className="text-sm opacity-90">Pilih paket terbaik</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <TransactionList id={user?.id!}/>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-xl">AR</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{user?.name }</h3>
                  <p className="text-gray-600 mb-2">{user?.phone}</p>

                  {isMemberGold(user?.balance!) && (
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">Member Gold</span>
                  </div>
                  )}
                  {/* <Button variant="outline" size="sm" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profil
                  </Button> */}
                </div>
              </CardContent>
            </Card>

            {/* Promo Card */}
            {/* <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-pink-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="w-6 h-6" />
                  <h3 className="font-semibold">Promo Spesial!</h3>
                </div>
                <p className="text-sm mb-4 opacity-90">
                  Dapatkan cashback 20% untuk pembelian paket unlimited bulan ini!
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Klaim Sekarang
                </Button>
              </CardContent>
            </Card> */}

            <StatisticsCard userId={user?.id!}/>
          </div>
        </div>
      </div>
    </div>
  )
}
