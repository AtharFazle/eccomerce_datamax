import { Transaction } from "@/types"
import { Badge } from "./badge"

  export const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Berhasil</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Gagal</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }