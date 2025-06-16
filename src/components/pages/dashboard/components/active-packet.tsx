import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Smartphone } from "lucide-react";
import { getUserActivePackages } from "@/services/user";
import moment from "moment";

type Props = {
  userId: string;
};

type ActivePackage = {
  id: string;
  package: {
    name: string;
    data: string;
  };
  startDate: string;
  endDate: string;
  usedGB: string;
  percentageUsed: string;
  percentageUsedRaw: number;
};

const ActivePacket = ({ userId }: Props) => {
  const [packages, setPackages] = useState<ActivePackage>();

  useEffect(() => {
    if (userId) {
      getUserActivePackages(userId).then((data) => {
        setPackages(data);
      });
    }
  }, [userId]);

  if (!packages) {
    return null;
  }

  return (
    <>
      <Card className="border-0 shadow-lg mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                Paket Aktif
              </CardTitle>
              <CardDescription>Status paket data Anda saat ini</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Aktif
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  {packages.package.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Berakhir: {moment(packages.endDate).format("DD MMMM YYYY")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {packages.package.data}
                </p>
                <p className="text-sm text-gray-600">Kuota</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Penggunaan Fair Usage Policy</span>
                <span>
                  {packages.percentageUsed} dari {packages.package.data}
                </span>
              </div>
              <Progress value={packages.percentageUsedRaw} className="h-2" />
              <p className="text-xs text-gray-500">
                Setelah kuota habis, kecepatan mungkin akan dikurangi.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ActivePacket;
