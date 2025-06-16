import type React from "react";

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/services/user";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailParam = queryParams.get("email");

  useEffect(() => {
    if (emailParam) {
      setForm((prevForm) => ({ ...prevForm, email: emailParam }));
    }
  }, [emailParam]);

  const handleChangeForm = ({ value, key }: { value: string; key: string }) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, []);

 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(form, navigate);

    setIsLoading(false);

    if (!success) {
      console.log("Login gagal");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to={{
              pathname: "/",
            }}
            className="inline-flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DataMax
            </span>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Selamat Datang</CardTitle>
            <CardDescription>
              Masuk ke akun Anda untuk mulai berbelanja paket data
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  className="h-12"
                  value={form.email}
                  onChange={(e) =>
                    handleChangeForm({ value: e.target.value, key: "email" })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-email">Password</Label>
                <div className="relative">
                  <Input
                    id="password-email"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    className="h-12 pr-10"
                    value={form.password}
                    onChange={(e) =>
                      handleChangeForm({
                        value: e.target.value,
                        key: "password",
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Ingat saya</span>
                </label>
                {/* <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      Lupa password?
                    </Link> */}
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
