import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Zap,
  Check,
  Star,
  Clock,
  Wifi,
  Smartphone,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataPackage, DataPackageFilterCategory } from "@/types";
import { getPackages } from "@/services/packages";

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<DataPackageFilterCategory>("all");
  const [packages, setPackages] = useState<DataPackage[]>([]);

  useEffect(() => {
    getPackages().then((data) => setPackages(data));
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as DataPackageFilterCategory);
  };

  const filteredPackages =
    selectedCategory === "all"
      ? packages
      : packages.filter((pkg) => pkg.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
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
          <Link to="/">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pilih Paket Data Terbaik
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan paket data yang sesuai dengan kebutuhan Anda. Semua paket
            aktif langsung setelah pembayaran!
          </p>
        </div>

        {/* Category Filter */}
        <Tabs
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          className="mb-8"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="daily">Harian</TabsTrigger>
            <TabsTrigger value="weekly">Mingguan</TabsTrigger>
            <TabsTrigger value="monthly">Bulanan</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                pkg.popular ? "ring-2 ring-blue-500 scale-105" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Terpopuler
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {pkg.data === "Unlimited" ? (
                    <Wifi className="w-8 h-8 text-white" />
                  ) : (
                    <Smartphone className="w-8 h-8 text-white" />
                  )}
                </div>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription className="text-3xl font-bold text-blue-600 mt-2">
                  Rp {pkg.price.toLocaleString("id-ID")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{pkg.data}</div>
                  <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.validity}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={`/packages/${pkg.id}`}>
                  <Button
                    className={`w-full h-12 font-semibold ${
                      pkg.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : ""
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    Beli Sekarang
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
