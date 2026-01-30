import { axiosInstance } from "../utilities/axiosInstance";

export const createReview = (review) => {
  const response = axiosInstance
    .post("/reviews", review)
    .then((res) => res.data);
  return response;
};

export const findAllByMediaId = (mediaId) => {
  const response = axiosInstance
    .get(`/reviews/media/${mediaId}`)
    .then((res) => res.data);
  return response;
};

export const existsByMediaAndUser = (mediaId, userId) => {
  const response = axiosInstance
    .get("/reviews/existence", {
      params: {
        mediaId,
        userId,
      },
    })
    .then((res) => res.data);
  return response;
};

export const findByMediaAndUser = (mediaId, userId) => {
  const response = axiosInstance
    .get("/reviews/find", {
      params: {
        mediaId,
        userId,
      },
    })
    .then((res) => res.data);
  return response;
};

export const updateReview = (reviewUpdateRequest) => {
  const response = axiosInstance
    .patch(`/reviews/${reviewUpdateRequest._id}`, reviewUpdateRequest)
    .then((res) => res.data);
  return response;
};
