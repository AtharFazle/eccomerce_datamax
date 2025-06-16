import { CheckCircle, Zap, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to={{ pathname: "/" }} className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DataMax
            </span>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h1>
            <p className="text-gray-600 mb-6">Paket data Anda telah aktif dan siap digunakan</p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Detail Transaksi</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>ID Transaksi:</span>
                  <span className="font-medium">TRX001234</span>
                </div>
                <div className="flex justify-between">
                  <span>Paket:</span>
                  <span className="font-medium">Unlimited 30 Hari</span>
                </div>
                <div className="flex justify-between">
                  <span>Nomor:</span>
                  <span className="font-medium">081234567890</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium text-blue-600">Rp 85.000</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link to={{ pathname: "/dashboard" }}>
                <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Kembali ke Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Button variant="outline" className="w-full h-12">
                <Download className="w-4 h-4 mr-2" />
                Download Struk
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-6">Struk pembayaran telah dikirim ke email Anda</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
