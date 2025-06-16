"use client";

import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
  Zap,
  Clock,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  getTransactionById,
  updateStatusTransaction,
} from "@/services/transaction";
import { Transaction } from "@/types";
import moment from "moment";
import { formatRp } from "@/lib/formatter";

export default function PaymentConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const [transactionData, setTransactionData] = useState<Transaction>();

  const transactionId = searchParams.get("transaction");

  useEffect(() => {
    if (!transactionId) return;
    getTransactionById(transactionId!).then((data) => setTransactionData(data));
  }, []);

  const handlePaymentConfirmation = async () => {
    setIsConfirming(true);

    updateStatusTransaction(transactionId!).then(() => {
      setIsConfirming(false);
      setPaymentConfirmed(true);
      setTimeout(() => {
        navigate("/payment-success");
      }, 2000);
    });
  };

  const copyTransactionId = () => {
    navigator.clipboard.writeText(transactionId!);
    // You could add a toast notification here
  };

  if (!transactionData?.package || !transactionData?.paymentMethod) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="border-0 shadow-lg max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Data Tidak Lengkap</h2>
            <p className="text-gray-600 mb-6">Silakan ulangi proses checkout</p>
            <Link to="/packages">
              <Button className="w-full">Kembali ke Paket</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="border-0 shadow-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              Pembayaran Dikonfirmasi!
            </h1>
            <p className="text-gray-600 mb-4">
              Sedang memproses aktivasi paket Anda...
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Mengalihkan ke halaman sukses...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DataMax
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Konfirmasi Pembayaran</h1>
          <p className="text-gray-600">
            Silakan lakukan pembayaran sesuai instruksi di bawah
          </p>
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Detail Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">ID Transaksi</span>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                    {transactionId}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyTransactionId}
                    className="h-8 w-8"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Paket</span>
                <span className="font-medium">
                  {transactionData?.package.name}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Kuota & Masa Aktif</span>
                <span>
                  {transactionData?.package.data} •{" "}
                  {transactionData?.package.validity}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Metode Pembayaran</span>
                <div className="flex items-center gap-2">
                  <span>{transactionData?.paymentMethod.icon}</span>
                  <span>{transactionData?.paymentMethod.name}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Waktu Pemesanan</span>
                <span className="text-sm text-gray-600">
                  {moment(transactionData?.date).fromNow()}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total Pembayaran</span>
                <span className="text-blue-600">
                  Rp {Number(transactionData?.amount).toLocaleString("id-ID")}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Instruksi Pembayaran</CardTitle>
              <CardDescription>
                Ikuti langkah-langkah berikut untuk menyelesaikan pembayaran
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactionData?.paymentMethod.value === "bank" && (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Transfer ke rekening berikut dan gunakan ID Transaksi
                      sebagai berita acara
                    </AlertDescription>
                  </Alert>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank</span>
                      <span className="font-medium">BCA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">No. Rekening</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">1234567890</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Atas Nama</span>
                      <span className="font-medium">PT DataMax Indonesia</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah Transfer</span>
                      <span className="font-medium text-blue-600">
                        {formatRp(transactionData?.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {(transactionData?.paymentMethod.value === "gopay" ||
                transactionData?.paymentMethod.value === "ovo" ||
                transactionData?.paymentMethod.value === "dana" ||
                transactionData?.paymentMethod.value === "shopeepay") && (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Buka aplikasi {transactionData?.paymentMethod.name} dan
                      lakukan pembayaran sebesar Rp{" "}
                      {Number(transactionData?.amount).toLocaleString("id-ID")}
                    </AlertDescription>
                  </Alert>

                  <div className="text-center">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Buka Aplikasi {transactionData?.paymentMethod.name}
                    </Button>
                  </div>
                </div>
              )}

              {transactionData?.paymentMethod.value === "credit" && (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Pembayaran kartu kredit akan diproses melalui gateway
                      pembayaran yang aman
                    </AlertDescription>
                  </Alert>

                  <div className="text-center">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Lanjut ke Payment Gateway
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">
                    Batas Waktu Pembayaran
                  </span>
                </div>
                <p className="text-sm text-yellow-700">
                  Selesaikan pembayaran dalam 24 jam. Pesanan akan otomatis
                  dibatalkan jika melewati batas waktu.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Confirmation */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">
                  Sudah Melakukan Pembayaran?
                </h3>
                <p className="text-gray-600 text-sm">
                  Klik tombol di bawah setelah Anda menyelesaikan pembayaran.
                  Kami akan memverifikasi dan mengaktifkan paket Anda.
                </p>

                <Button
                  onClick={handlePaymentConfirmation}
                  disabled={isConfirming}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 font-semibold text-lg"
                >
                  {isConfirming ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Memverifikasi Pembayaran...
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Saya Sudah Membayar
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <Link
                    to="/packages"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Kembali ke Paket
                  </Link>
                  <span>•</span>
                  <Link
                    to="/dashboard"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <h4 className="font-medium">Butuh Bantuan?</h4>
                <p className="text-sm text-gray-600">
                  Tim customer service kami siap membantu Anda 24/7
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" size="sm">
                    💬 Live Chat
                  </Button>
                  <Button variant="outline" size="sm">
                    📞 Call Center
                  </Button>
                  <Button variant="outline" size="sm">
                    📧 Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
