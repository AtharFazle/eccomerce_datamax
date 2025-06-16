export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
}

export type RegisterData = User & { confirmPassword: string; password: string };
export type LoginData = Pick<RegisterData, "email" | "password">;

export interface DataPackage {
  id: string; 
  name: string;
  price: number;
  originalPrice: number;
  data: string;
  validity: string;
  category: "daily" | "weekly" | "monthly";
  popular: boolean;
  description?: string; // Opsional
  features: string[];
  coverage?: string; // Opsional
  networkType?: string; // Opsional
  speedRange?: string; // Opsional
  activationTime?: string; // Opsional
  usageRestriction?: string; // Opsional
  bonusApps?: string[]; // Opsional
}

export interface DataReview  {
  id: string;
  userId: string;
  packageId: string;
  rating: number;
  comment: string;
  review: string;
  verified: boolean;
  date: string;
}

export type FormattedReviews = Array<DataReview & { user: User }>;
export type FormattedReview= DataReview & { user: User };

export type DataPackageDetailResponse = DataPackage & {
  relatedPackages: DataPackage[];
  rating: number;
  reviews: FormattedReviews;
  totalReviews: number
}

export type DataPackageFilterCategory = DataPackage["category"] | "all";

export interface Transaction {
  id: string;
  packageId: string;
  userId:User['id'];
  amount: number;
  status: "pending" | "success" | "failed";
  date: string;
  phone: string;
  user: User
  paymentMethodId: PaymentMethod['id'];
  paymentMethod: PaymentMethod
  package: DataPackage
}

export interface ActivePackage {
  id: string;
  userId: string;
  packageId: string;
  status: "active" | "inactive" | "expired";
  startDate: string; // ISO format
  endDate: string;
  used:number;
  usedGb: string;
  // usage: PackageUsage;
}


export interface PaymentMethod {
  id: string;
  value: 'gopay' | 'ovo' | 'dana' | 'shopeepay' | 'bank' | 'credit';
  name: string;
  icon: string;
  fee: number;
}
