import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as StarRegular } from "../../../../assets/icons/star-regular.svg";
import { ReactComponent as LocationIcon } from "../../../../assets/icons/location.svg";
import { handleApiRequest } from "../../../../services/handleApiRequest";
import { updateVehicle } from "../../../../redux/states/vehicles/thunk";

export default function VehicleCard({ vehicle, handleVehicleList, wishlist }) {
  const navigate = useNavigate();
  const imageRef = useRef();
  const [mainImageWidth, setMainImageWidth] = useState();

  //   const handleWishlist = async () => {
  //     await handleApiRequest(getWishlist);
  //   };

  //   const handleRemoveWishlistItem = async () => {
  //     const response = await handleApiRequest(removeWishlistItem, { id: wishlist });
  //     if (response.status) {
  //       handleWishlist();
  //     }
  //   };

  const handlePost = async (feature) => {
    const request = {
      id: vehicle._id,
      ...feature,
    };
    const response = await handleApiRequest(updateVehicle, request);
    if (response.status) {
      handleVehicleList();
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      setMainImageWidth(imageRef.current.offsetWidth);
    }
  }, [imageRef.current]);

  //   console.log("vehicle", vehicle);

  return (
    <div>
      <Row className="vehicleCardWrapper pointer">
        <Col
          lg={3}
          xs={9}
          className=""
          style={{ paddingInline: 1 }}
          onClick={() => navigate(`/details/${vehicle._id}`)}
        >
          <img
            ref={imageRef}
            src={vehicle.media?.[0]?.url}
            className="mainImage w-100"
            style={{ height: mainImageWidth }}
          />
        </Col>
        <Col
          lg={1}
          xs={3}
          className="px-0 d-flex flex-column"
          onClick={() => navigate(`/details/${vehicle._id}`)}
        >
          {vehicle.media?.slice(1, 4).map((image, i) => (
            <img
              key={image}
              src={image?.url}
              className={`sideImage`}
              style={{ marginBlock: i === 1 ? 1 : 0 }}
            />
          ))}
        </Col>
        <Col lg={8} xs={12} className="my-2 my-lg-0 d-flex flex-column">
          <h6
            className="d-flex align-items-center"
            onClick={() => navigate(`/details/${vehicle._id}`)}
          >
            <p className="m-0">{vehicle?.currency} </p>
            <p className="m-0"> {vehicle?.price}</p>
          </h6>
          <div className="vehicledetails" onClick={() => navigate(`/details/${vehicle._id}`)}>
            <p>{vehicle.make.label + " " + vehicle.model.label}</p>
            <p>{vehicle.variant?.label}</p>
            <p className="my-2 fw-bold">
              {vehicle.year} | {vehicle.bodyStyle} | {vehicle.mileage}M | {vehicle.engineSize} |{" "}
              {vehicle.gearBox} | {vehicle.fuelType} | {vehicle.condition}
            </p>
            <p className="my-2">{vehicle?.user?.name}</p>
            <p>
              <StarRegular />
              {vehicle.rating || "No Rating yet"} ({vehicle.reviews?.length} reviews)
            </p>
            <p>
              <LocationIcon />
              {vehicle.country?.name}, {vehicle.city?.name}
            </p>
          </div>
          <div style={{ flex: 1 }} onClick={() => navigate(`/details/${vehicle._id}`)} />
          <div className="d-flex align-items-center">
            {vehicle?.status === "pending" ? (
              <>
                <Button
                  variant="success"
                  className="mx-1"
                  onClick={() => handlePost({ status: "approved" })}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  className="mx-1"
                  onClick={() => handlePost({ status: "rejected" })}
                >
                  Reject
                </Button>
              </>
            ) : vehicle?.status === "approved" ? (
              <p className="successMsg">Approved</p>
            ) : vehicle?.status === "rejected" ? (
              <p className="rejectMsg">Rejected</p>
            ) : vehicle?.status === "deleted" ? (
              <p className="rejectMsg">Deleted</p>
            ) : (
              ""
            )}
            {vehicle?.isFeatured ? (
              <Button className="mx-1" onClick={() => handlePost({ isFeatured: false })}>
                Remove featured
              </Button>
            ) : (
              <Button className="mx-1" onClick={() => handlePost({ isFeatured: true })}>
                Mark Featured
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
