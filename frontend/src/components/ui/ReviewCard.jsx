import React from "react";
import Loader from "./Loader";
import { Rating } from "@mui/material";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

const ReviewCard = ({ loading, review, options }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card className="max-w-[340px]">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src="https://nextui.org/avatars/avatar-1.png"
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-md font-semibold leading-none text-default-800">
                    {review.name}
                  </h4>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-500">
              <p>{review.comment}</p>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex items-center justify-center gap-1">
                <p className="font-semibold text-default-500 text-md">
                  ({review.rating})
                </p>
                <p>
                  <Rating {...options} />
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
