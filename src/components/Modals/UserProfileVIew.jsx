import classNames from "classnames";
import moment from "moment";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ChangePassword from "./changePassword";

function ModalBody({
  data,
  toggle,
  isBlocked,
  onToggleBlock,
  setChangingPassword,
  editProfile,
  setEditingProfile,
}) {
  return (
    <>
      <Modal.Body className="px-lg-5 pt-lg-4">
        <Button
          onClick={toggle}
          className="border-0 p-0 position-absolute closeBtn"
          variant="transparent"
          style={{ top: "10px", right: "10px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M3.64004 2.27L7.50004 6.13L11.34 2.29C11.4249 2.19972 11.527 2.12749 11.6405 2.07766C11.7539 2.02783 11.8762 2.00141 12 2C12.2653 2 12.5196 2.10536 12.7071 2.29289C12.8947 2.48043 13 2.73478 13 3C13.0024 3.1226 12.9796 3.24439 12.9332 3.35788C12.8868 3.47138 12.8176 3.57419 12.73 3.66L8.84004 7.5L12.73 11.39C12.8949 11.5512 12.9915 11.7696 13 12C13 12.2652 12.8947 12.5196 12.7071 12.7071C12.5196 12.8946 12.2653 13 12 13C11.8726 13.0053 11.7454 12.984 11.6267 12.9375C11.5079 12.8911 11.4001 12.8204 11.31 12.73L7.50004 8.87L3.65004 12.72C3.56555 12.8073 3.46461 12.8769 3.35304 12.925C3.24148 12.9731 3.12151 12.9986 3.00004 13C2.73482 13 2.48047 12.8946 2.29293 12.7071C2.1054 12.5196 2.00004 12.2652 2.00004 12C1.99771 11.8774 2.02046 11.7556 2.06689 11.6421C2.11332 11.5286 2.18245 11.4258 2.27004 11.34L6.16004 7.5L2.27004 3.61C2.10523 3.44876 2.00858 3.23041 2.00004 3C2.00004 2.73478 2.1054 2.48043 2.29293 2.29289C2.48047 2.10536 2.73482 2 3.00004 2C3.24004 2.003 3.47004 2.1 3.64004 2.27Z"
              fill="black"
            />
          </svg>
        </Button>
        <div className="top d-flex align-items-center justify-content-between gap-10 pb-3">
          <div className="d-flex align-items-center profile gap-10">
            <div className="imgWrp">
              <img
                src={data.image || "/assets/images/profile.jpg"}
                alt=""
                className="img-fluid rounded-circle"
                style={{ height: "100px" }}
              />
            </div>
            <div className="content">
              <h5 className="m-0 fw-bold py-2">{data.name}</h5>
              <p className="m-0">
                {moment(data.createdAt).format("DD MMM, Y | hh:mm A")}
              </p>
            </div>
          </div>
          <div className="right">
            <span
              className={classNames(" fw-sbold statusLabel px-3 py-2", {
                successLabel: !!data.status,
                dangerLabel: !data.status,
              })}
            >
              {data.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <div className="py-2">
          <h6 className="m-0 py-2 fw-sbold">Personal Information</h6>
          <ul className="list-unstyled p s-0 mb-0 listing">
            <li className="d-flex align-items-start gap-10 py-1">
              <span className=" fw-sbold text-muted">UserName:</span>
              <span className=" fw-sbold text-dark">{data.username}</span>
            </li>
            <li className="d-flex align-items-start gap-10 py-1">
              <span className=" fw-sbold text-muted">Full Name:</span>
              <span className=" fw-sbold text-dark">{data.name}</span>
            </li>
            <li className="d-flex align-items-start gap-10 py-1">
              <span className=" fw-sbold text-muted">Mobile Number:</span>
              <span className=" fw-sbold text-dark">
                {data.full_phone_number}
              </span>
            </li>
            <li className="d-flex align-items-start gap-10 py-1">
              <span className=" fw-sbold text-muted">Email:</span>
              <span className=" fw-sbold text-dark">{data.email}</span>
            </li>
            <li className="d-flex align-items-start gap-10 py-1">
              <span className=" fw-sbold text-muted">Wallet Amount:</span>
              <span className=" fw-sbold text-dark">
                ${data.wallet_balance}
              </span>
            </li>
          </ul>
          <div className="btnWrp mt-3 d-flex align-items-center">
            {typeof isBlocked === "boolean" && (
              <Button
                onClick={() => onToggleBlock(data._id)}
                className="px-3 py-2 grey d-flex align-items-center justify-content-center me-2"
              >
                {isBlocked ? "Unblock" : "Block"}
              </Button>
            )}
            {setEditingProfile && (
              <Button
                onClick={() => {
                  setEditingProfile((prev) => !prev);
                  toggle();
                }}
                className="px-3 py-2 grey d-flex align-items-center justify-content-center mx-2"
              >
                Edit Profile
              </Button>
            )}
            {setChangingPassword && (
              <Button
                onClick={() => {
                  setChangingPassword((prev) => !prev);
                  toggle();
                }}
                className="px-3 py-2 grey d-flex align-items-center justify-content-center ms-2"
              >
                Change Password
              </Button>
            )}
          </div>
        </div>
      </Modal.Body>
    </>
  );
}

const UserProfileView = (props) => {
  return (
    <>
      <Modal
        className="profilePopup"
        show={!!props.data}
        onHide={props.toggle}
        centered
      >
        {!!props.data && <ModalBody {...props} />}
      </Modal>
    </>
  );
};

export default UserProfileView;
