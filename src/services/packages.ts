import api from "@/lib/axios";
import {
  DataPackage,
  DataPackageDetailResponse,
  DataReview,
  FormattedReview,
} from "@/types";

export const getPackages = async () => {
  const response = await api.get("/dataPackages");

  return response.data;
};

export const getPackageById = async (id: string) => {
  const response = await api.get(`/dataPackages/${id}`);
  const responseRelatedPackages = await api.get(`/dataPackages`);
  
  if (!response.data) return undefined;

  const selectedPackage = response.data;

  const reviews = await api.get(`/reviews`);

  const relatedPackages = responseRelatedPackages.data.filter(
    (pkg: DataPackage) =>
      pkg.category === selectedPackage.category && pkg.id !== id
  );

  const reviewsByPackageId = reviews.data.filter(
    (review: DataReview) => review.packageId === id
  );

  const rating =
    reviewsByPackageId.length > 0
      ? reviewsByPackageId.reduce(
          (acc: DataReview["rating"], review: DataReview) => acc + review.rating,
          0
        ) / reviewsByPackageId.length
      : 0;

  const users = await api.get(`/users`);

  let formattedReviews = [] as DataPackageDetailResponse["reviews"];

  if (reviewsByPackageId.length > 0) {
    formattedReviews = reviewsByPackageId.map((review: DataReview) => ({
      ...review,
      user: users.data.find((user: any) => user.id === review.userId),
    }));
  } else {
    formattedReviews = [];
  }

  const formattedData: DataPackageDetailResponse = {
    ...selectedPackage,
    reviews: formattedReviews,
    relatedPackages,
    rating: rating,
    totalReviews: reviewsByPackageId.length,
  };

  return formattedData;
};

export const addRatings = async (
  packageId: string,
  review: FormattedReview
) => {
  const formattedData: DataReview = {
    id: crypto.randomUUID(),
    comment: review.comment,
    date: new Date().toISOString(),
    packageId: packageId,
    rating: review.rating,
    review: review.review,
    userId: review.user.id,
    verified: false,
  };
  await api.post(`/reviews`, { ...formattedData });

  return review;
};
