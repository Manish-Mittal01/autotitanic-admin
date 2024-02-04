import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import MediaCarousel from "./components/mediaCrousel";
import SharePop from "./components/sharePop";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { parseCamelKey } from "../../../utils/parseKey";
import { getVehicleDetails, updateVehicle } from "../../../redux/states/vehicles/thunk";

export default function VehicleDetails() {
  const { id } = useParams();
  const { vehicleDetails } = useSelector((state) => state.vehicles);
  const detail = vehicleDetails.data;
  const [action, setAction] = useState(null);

  const handleVehicleDetails = async () => {
    await handleApiRequest(getVehicleDetails, id);
  };

  const handlePost = async (feature) => {
    const request = {
      id: id,
      ...feature,
    };
    const response = await handleApiRequest(updateVehicle, request);
    if (response.status) {
      handleVehicleDetails();
    }
  };

  useEffect(() => {
    handleVehicleDetails();
  }, [id]);

  //   console.log("vehicleDetails", vehicleDetails);

  return (
    <>
      <section className="pt-3 bg-white">
        <Row className=" mx-lg-5">
          <Col lg={8}>
            <div className="parentCrousel">
              <MediaCarousel media={detail?.media} />
            </div>
            <div className="d-flex justify-content-between my-2 border-bottom my-4">
              <div className="d-flex justify-content-between">
                <p
                  className="whatsappMsgBtn small pointer rounded-pill text-center m-0 p-1 px-2 mx-2"
                  onClick={() => {}}
                >
                  <FaWhatsapp className="text-success me-1" />
                  Message on Whatsapp
                </p>

                {detail?.status === "pending" ? (
                  <>
                    <p
                      className="small pointer text-center m-0 p-2"
                      onClick={() => handlePost({ status: "approved" })}
                    >
                      Approve
                    </p>
                    <p
                      className="small pointer text-center m-0 p-2"
                      onClick={() => handlePost({ status: "rejected" })}
                    >
                      Reject
                    </p>
                  </>
                ) : detail?.status === "approved" ? (
                  <p className="successMsg rounded-pill m-0" style={{ height: "fit-content" }}>
                    Approved
                  </p>
                ) : detail?.status === "rejected" ? (
                  <p className="rejectMsg rounded-pill m-0" style={{ height: "fit-content" }}>
                    Rejected
                  </p>
                ) : detail?.status === "deleted" ? (
                  <p className="rejectMsg rounded-pill m-0" style={{ height: "fit-content" }}>
                    Deleted
                  </p>
                ) : (
                  ""
                )}

                {detail?.isFeatured ? (
                  <p
                    className="small pointer text-center m-0 p-2 d-flex align-items-center"
                    onClick={() => handlePost({ isFeatured: false })}
                  >
                    <MdOutlineFeaturedPlayList className="mx-1" />
                    Remove featured
                  </p>
                ) : (
                  <p
                    className="small pointer text-center m-0 p-2 d-flex align-items-center"
                    onClick={() => handlePost({ isFeatured: false })}
                  >
                    <MdOutlineFeaturedPlayList className="mx-1" />
                    Mark Featured
                  </p>
                )}
              </div>
              <p
                className="small pointer text-center m-0 p-2"
                onClick={() => {
                  setAction({ type: "sharePost" });
                }}
              >
                Share
                <IoMdShare className="mx-1 text-danger" />
              </p>
            </div>
            <div>
              <h5>Description</h5>
              <div
                dangerouslySetInnerHTML={{ __html: detail?.description }}
                className="border-bottom"
              ></div>
            </div>
          </Col>
          <Col lg={4}>
            <h4>{[detail?.make.label, detail?.model.label].join(" ")}</h4>
            <p>{[detail?.year, detail?.make.label, detail?.model.label].join("  ")}</p>
            <p className="d-flex align-items-center justify-content-between">
              <div>
                {detail?.city.name + ", " + detail?.country.name}
                <img src={detail?.country.flag} className="ms-1" style={{ width: 22 }} />
              </div>
              <div className="d-flex align-items-center text-danger">
                <p className="m-0">{detail?.currency}</p>
                <p className="m-0">{detail?.price}</p>
              </div>
            </p>
            <div className="detailsWrapper p-3">
              <h6 className="detailsHeading">Details</h6>
              {Object.keys(detail || {}).map(
                (key) =>
                  key !== "_id" &&
                  key !== "createdAt" &&
                  key !== "media" &&
                  key !== "reviews" &&
                  key !== "country" &&
                  key !== "city" &&
                  key !== "description" &&
                  key !== "price" &&
                  key !== "currency" &&
                  key !== "updatedAt" && (
                    <Row className="">
                      <Col xs={5} className="small">
                        {parseCamelKey(key)}
                      </Col>
                      <Col xs={7} className="small">
                        {typeof detail[key] !== "object"
                          ? detail[key]?.toString()
                          : detail[key]?.name || detail[key]?.label}
                      </Col>
                    </Row>
                  )
              )}
            </div>
          </Col>
        </Row>
      </section>

      {action?.type === "sharePost" && <SharePop action={action} setAction={setAction} />}
    </>
  );
}
