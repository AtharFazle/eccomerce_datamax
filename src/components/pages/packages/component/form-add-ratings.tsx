import type React from "react";

import { useState } from "react";
import { MessageSquare, Send, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormattedReview, User } from "@/types";
import { addRatings } from "@/services/packages";

export interface AddReasonFormProps {
  selectedPackage: {
    id: string;
    name: string;
  };
  user: User;
  onSubmit?: (review: FormattedReview) => void;
}

export function FormAddRatings({
  selectedPackage,
  user,
  onSubmit,
}: AddReasonFormProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) return;

    setIsSubmitting(true);
    setIsSubmitted(false);

    const formattedData: FormattedReview = {
      id: crypto.randomUUID(),
      comment: reason,
      date: new Date().toISOString(),
      packageId: selectedPackage.id,
      rating: rating,
      review: reason,
      userId: "123",
      verified: false,
      user: user,
    };

    addRatings(selectedPackage.id, formattedData)
      .then((res) => onSubmit?.(res))
      .finally(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
      });
  };

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Terima Kasih!</h3>
          <p className="text-gray-600">
            Alasan Anda telah berhasil dikirim dan akan membantu pengguna lain
            dalam memilih paket ini.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Bagikan Alasan Anda
        </CardTitle>
        <CardDescription>
          Mengapa Anda memilih {selectedPackage.name}? Bagikan pengalaman Anda
          untuk membantu pengguna lain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Kategori Alasan</Label>
            <div className="flex flex-row ITEMS-CENTER gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-4 h-4 ${
                    star <= Math.floor(rating || 0)
                      ? "fill-yellow-400 text-yellow-400 cursor-pointer"
                      : "text-gray-300 cursor-pointer"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Alasan Anda</Label>
            <Textarea
              id="reason"
              placeholder="Ceritakan pengalaman Anda dengan paket ini... (minimal 20 karakter)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={500}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Minimal 20 karakter</span>
              <span>{reason.length}/500</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!reason.trim() || reason.length < 20 || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Mengirim...
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Kirim Alasan
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 <strong>Tips:</strong> Ceritakan pengalaman spesifik Anda seperti
            kecepatan internet, area coverage, atau layanan customer service
            yang Anda rasakan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
