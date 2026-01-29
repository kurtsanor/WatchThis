import type { User } from "./user";

export interface Review {
  _id: string;
  mediaId: number;
  userId: User;
  rating: number;
  reviewText: string;
  createdAt: Date;
}
