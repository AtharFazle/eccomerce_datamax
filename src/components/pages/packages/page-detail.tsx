import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Zap,
  Check,
  Star,
  Clock,
  Wifi,
  Smartphone,
  Shield,
  Users,
  TrendingUp,
  MessageCircle,
  Share2,
  Heart,
  ChevronRight,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPackageById } from "@/services/packages";
import { DataPackageDetailResponse, FormattedReview } from "@/types";
import moment from "moment";
import { FormAddRatings } from "./component/form-add-ratings";
import { getUser } from "@/services/user";

export default function PackageDetailPage() {
  const params = useParams();
  const user = getUser();
  const packageId = params.id as string;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<DataPackageDetailResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPackageById(packageId).then((data) => {
      setSelectedPackage(data);
      setIsLoading(false);
    });
  }, [packageId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="border-0 shadow-lg max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Loading...</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="border-0 shadow-lg max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Paket Tidak Ditemukan
            </h2>
            <p className="text-gray-600 mb-6">
              Paket yang Anda cari tidak tersedia
            </p>
            <Link to="/packages">
              <Button className="w-full">Kembali ke Daftar Paket</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const discount = Math.round(
    ((selectedPackage?.originalPrice - selectedPackage?.price) /
      selectedPackage?.originalPrice) *
      100
  );

  const handleSubmitAddRatings = async (review: FormattedReview) => {
    if (!selectedPackage || !selectedPackage.id) return;
    
    setSelectedPackage({
      ...selectedPackage,
      reviews: [...selectedPackage.reviews, review],
    });
  };

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
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? "text-red-500" : ""}
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Header */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">
                        {selectedPackage.name}
                      </h1>
                      {selectedPackage.popular && (
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Terpopuler
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {selectedPackage.description}
                      {Math.floor(selectedPackage.rating || 0)}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.floor(selectedPackage.rating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm font-medium ml-1">
                          {Math.floor(selectedPackage.rating || 0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({selectedPackage.totalReviews} ulasan)
                      </span>
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    {selectedPackage.data === "Unlimited" ? (
                      <Wifi className="w-10 h-10 text-white" />
                    ) : (
                      <Smartphone className="w-10 h-10 text-white" />
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedPackage.data}
                    </div>
                    <div className="text-sm text-gray-600">Kuota Data</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedPackage.validity}
                    </div>
                    <div className="text-sm text-gray-600">Masa Aktif</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedPackage.speedRange}
                    </div>
                    <div className="text-sm text-gray-600">Kecepatan</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Details Tabs */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <Tabs defaultValue="features" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
                    <TabsTrigger value="features">Fitur</TabsTrigger>
                    <TabsTrigger value="coverage">Jangkauan</TabsTrigger>
                    <TabsTrigger value="terms">Syarat</TabsTrigger>
                    <TabsTrigger value="reviews">Ulasan</TabsTrigger>
                  </TabsList>

                  <TabsContent value="features" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">
                        Fitur Paket
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedPackage.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 space-y-4">
                        <h4 className="font-semibold">Aplikasi Bonus</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedPackage.bonusApps?.map((app, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="px-3 py-1"
                            >
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">Jangkauan:</span>
                          </div>
                          <p className="text-gray-600 ml-6">
                            {selectedPackage.coverage}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span className="font-medium">Aktivasi:</span>
                          </div>
                          <p className="text-gray-600 ml-6">
                            {selectedPackage.activationTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="coverage" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">
                        Jangkauan Jaringan
                      </h3>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Globe className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Seluruh Indonesia</h4>
                            <p className="text-sm text-gray-600">
                              Jaringan 4G LTE tersedia di 500+ kota
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Jawa & Bali</span>
                            <div className="flex items-center gap-2">
                              <Progress value={98} className="w-20 h-2" />
                              <span className="text-sm font-medium">98%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Sumatera</span>
                            <div className="flex items-center gap-2">
                              <Progress value={95} className="w-20 h-2" />
                              <span className="text-sm font-medium">95%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Kalimantan</span>
                            <div className="flex items-center gap-2">
                              <Progress value={90} className="w-20 h-2" />
                              <span className="text-sm font-medium">90%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Sulawesi & Papua</span>
                            <div className="flex items-center gap-2">
                              <Progress value={85} className="w-20 h-2" />
                              <span className="text-sm font-medium">85%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="terms" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">
                        Syarat & Ketentuan
                      </h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-medium mb-2">
                            Penggunaan Fair Usage Policy (FUP)
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {selectedPackage.usageRestriction}
                          </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-medium mb-2">Aktivasi Paket</h4>
                          <p className="text-gray-600 text-sm">
                            Paket akan aktif otomatis setelah pembayaran
                            berhasil diverifikasi (maksimal 5 menit)
                          </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-medium mb-2">Masa Berlaku</h4>
                          <p className="text-gray-600 text-sm">
                            Paket berlaku selama {selectedPackage.validity}{" "}
                            sejak aktivasi. Kuota yang tidak terpakai akan
                            hangus setelah masa berlaku berakhir.
                          </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                          <h4 className="font-medium mb-2">Refund Policy</h4>
                          <p className="text-gray-600 text-sm">
                            Pengembalian dana dapat dilakukan dalam 24 jam
                            pertama jika terdapat masalah teknis yang tidak
                            dapat diselesaikan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          Ulasan Pelanggan
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.floor(selectedPackage.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">
                            {selectedPackage.rating.toFixed(1) || "0.0"}
                          </span>
                          <span className="text-gray-600">
                            ({selectedPackage.totalReviews} ulasan)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {selectedPackage?.reviews.map((review) => (
                          <div
                            key={review.id}
                            className="border-b pb-4 last:border-b-0"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>
                                  {review.user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">
                                    {review.user.name}
                                  </span>
                                  {review.verified && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      <Check className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-3 h-3 ${
                                          star <= review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {moment(review.date).fromNow()}
                                  </span>
                                </div>
                                <p className="text-gray-700 text-sm">
                                  {review.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <FormAddRatings
              selectedPackage={{
                id: selectedPackage.id,
                name: selectedPackage.name,
              }}
              user={user!}
              onSubmit={handleSubmitAddRatings}
            />

            {/* Related Packages */}
            {selectedPackage.relatedPackages.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Paket Serupa</CardTitle>
                  <CardDescription>
                    Paket lain yang mungkin Anda sukai
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedPackage.relatedPackages.map((pkg) => (
                      <Link key={pkg.id} to={`/packages/${pkg.id}`}>
                        <Card className="border hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{pkg.name}</h4>
                              {pkg.popular && (
                                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-600">
                                {pkg.data} • {pkg.validity}
                              </div>
                              <div className="text-lg font-bold text-blue-600">
                                Rp {pkg.price.toLocaleString("id-ID")}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-blue-600">
                      Rp {selectedPackage.price.toLocaleString("id-ID")}
                    </span>
                    {discount > 0 && (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        -{discount}%
                      </Badge>
                    )}
                  </div>
                  {discount > 0 && (
                    <div className="text-sm text-gray-500 line-through">
                      Rp {selectedPackage.originalPrice.toLocaleString("id-ID")}
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mt-1">
                    Hemat Rp{" "}
                    {(
                      selectedPackage.originalPrice - selectedPackage.price
                    ).toLocaleString("id-ID")}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Aktivasi otomatis setelah pembayaran</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Berlaku {selectedPackage.validity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>{selectedPackage.totalReviews}+ pelanggan puas</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to={`/checkout?package=${selectedPackage.id}`}>
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold text-lg">
                      Beli Sekarang
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-12">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Tanya Customer Service
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Trending</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {Math.floor(Math.random() * 50) + 20} orang membeli paket
                      ini dalam 24 jam terakhir
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">
                    Bagaimana cara aktivasi paket?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Paket akan aktif otomatis setelah pembayaran berhasil,
                    maksimal 5 menit.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    Apakah bisa digunakan untuk hotspot?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Ya, semua paket dapat digunakan untuk hotspot/tethering.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    Bagaimana jika kuota habis?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Anda dapat membeli paket tambahan atau menunggu periode
                    berikutnya.
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  Lihat FAQ Lengkap
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
