import React from "react";
import { Link } from "react-router-dom";

export default function BackButton({ goBackTo }) {
  return (
    <div classNameName="left d-flex align-items-center gap-10 flex-wrap">
      <Link
        className="d-flex btn align-items-center justify-content-center rounded-pill px-lg-4"
        to={goBackTo}
        style={{ minWidth: "unset;" }}
      >
        <span className="icn me-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
          >
            <path
              d="M7.70406 15.546L0.954061 8.79596C0.849182 8.69144 0.765966 8.56725 0.709186 8.4305C0.652404 8.29376 0.623174 8.14715 0.623174 7.99908C0.623174 7.85102 0.652404 7.70441 0.709186 7.56766C0.765966 7.43092 0.849182 7.30672 0.954061 7.20221L7.70406 0.452207C7.91541 0.240863 8.20205 0.122131 8.50094 0.122131C8.79982 0.122131 9.08647 0.240863 9.29781 0.452207C9.50916 0.663552 9.62789 0.950196 9.62789 1.24908C9.62789 1.54797 9.50916 1.83461 9.29781 2.04596L4.46875 6.87502L18.25 6.87502C18.5484 6.87502 18.8345 6.99355 19.0455 7.20452C19.2565 7.4155 19.375 7.70165 19.375 8.00002C19.375 8.29839 19.2565 8.58454 19.0455 8.79552C18.8345 9.00649 18.5484 9.12502 18.25 9.12502L4.46875 9.12502L9.29875 13.9541C9.51009 14.1654 9.62883 14.4521 9.62883 14.751C9.62883 15.0498 9.51009 15.3365 9.29875 15.5478C9.08741 15.7592 8.80076 15.8779 8.50187 15.8779C8.20299 15.8779 7.91634 15.7592 7.705 15.5478L7.70406 15.546Z"
              fill="#A9AEC3"
            ></path>
          </svg>
        </span>
        Back
      </Link>
      <h2 classNameName="m-0 fw-bold">Sub Admins</h2>
    </div>
  );
}
