import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
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
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Paket
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Promo
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Bantuan
            </a>
          </nav>
          <Link to={{ pathname: "/login" }}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Masuk
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Paket Data Internet Terbaik untuk Semua Kebutuhan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nikmati koneksi internet super cepat dengan paket data yang
            fleksibel dan harga terjangkau. Beli sekarang, aktif langsung!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={{ pathname: "/login" }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8"
              >
                Mulai Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Lihat Paket
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mengapa Pilih DataMax?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami memberikan layanan terbaik dengan teknologi terdepan untuk
            pengalaman internet yang tak terlupakan
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Super Cepat</h3>
              <p className="text-gray-600">
                Kecepatan internet hingga 100 Mbps untuk streaming dan gaming
                tanpa lag
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Aman & Terpercaya</h3>
              <p className="text-gray-600">
                Jaringan yang stabil dan aman dengan uptime 99.9%
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Customer Support 24/7
              </h3>
              <p className="text-gray-600">
                Tim support yang siap membantu Anda kapan saja
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Apa Kata Pelanggan Kami</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Paket data dari DataMax sangat memuaskan. Internet cepat
                    dan harga terjangkau!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      A
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">Athar Fazle Mawla</p>
                      <p className="text-sm text-gray-500">Pelanggan Setia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">DataMax</span>
              </div>
              <p className="text-gray-400">
                Penyedia paket data internet terpercaya dengan layanan terbaik
                di Indonesia.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produk</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Paket Harian
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Paket Mingguan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Paket Bulanan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Bantuan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Kontak
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Live Chat
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Karir
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DataMax. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
