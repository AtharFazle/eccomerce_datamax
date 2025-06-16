import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Zap,
  CreditCard,
  Smartphone,
  Check,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { DataPackageDetailResponse, PaymentMethod } from "@/types";
import { getPackageById } from "@/services/packages";
import {
  createTransaction,
  CreateTransactionPayload,
  getPaymentMethods,
} from "@/services/transaction";
import { getUser } from "@/services/user";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = getUser();
  const packageId = searchParams.get("package");

  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("081234567890");
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedPackage, setSelectedPackage] =
    useState<DataPackageDetailResponse>();

  useEffect(() => {
    setPhoneNumber(user?.phone || "");
    getPaymentMethods().then((data) => {
      setSelectedPayment(data[0].id);
      setPaymentMethods(data);
    });
  }, []);
  useEffect(() => {
    getPackageById(packageId!).then((data) => setSelectedPackage(data));
  }, [packageId]);

  const handlePayment = async () => {
    if (!selectedPayment || !selectedPackage) return;

    const selectedPaymentObject = paymentMethods.find(
      (payment) => payment.id === selectedPayment
    );

    if(!selectedPaymentObject) return

    let total = selectedPackage.price
    if(selectedPaymentObject.fee > 0){
      total += selectedPaymentObject.fee
    }

    const payload: CreateTransactionPayload = {
      packageId: selectedPackage.id,
      userId: user?.id || "",
      amount: total,
      phone: phoneNumber,
      paymentMethodId: selectedPayment,
    };
    setIsProcessing(true);
    createTransaction(payload).then((res) => {
      setIsProcessing(false);
      navigate("/payment-confirmation?transaction=" + res.id);
    });
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="border-0 shadow-lg max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Paket Tidak Ditemukan
            </h2>
            <p className="text-gray-600 mb-6">
              Silakan pilih paket data terlebih dahulu
            </p>
            <Link to="/packages">
              <Button className="w-full">Pilih Paket</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const subtotal = selectedPackage.price;
  const paymentFee =
    paymentMethods.find((method) => method.id === selectedPayment)?.fee || 0;
  const total = subtotal + paymentFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/packages">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">Selesaikan pembelian paket data Anda</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  Detail Paket
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedPackage.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>{selectedPackage.data}</span>
                      <span>•</span>
                      <span>{selectedPackage.validity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      Rp {selectedPackage.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phone Number */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Nomor Tujuan</CardTitle>
                <CardDescription>
                  Pastikan nomor handphone sudah benar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Handphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="h-12"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Metode Pembayaran
                </CardTitle>
                <CardDescription>
                  Pilih metode pembayaran yang Anda inginkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                >
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label
                          htmlFor={method.id}
                          className="flex items-center justify-between w-full cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{method.icon}</span>
                            <span className="font-medium">{method.name}</span>
                          </div>
                          {method.fee > 0 && (
                            <span className="text-sm text-gray-600">
                              +Rp {method.fee.toLocaleString("id-ID")}
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Paket Data</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  {paymentFee > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Biaya Admin</span>
                      <span>Rp {paymentFee.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!selectedPayment || isProcessing}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
                >
                  {isProcessing ? "Memproses Pembayaran..." : "Bayar Sekarang"}
                </Button>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Pembayaran aman dan terenkripsi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Paket aktif otomatis setelah pembayaran</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Garansi uang kembali 100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
