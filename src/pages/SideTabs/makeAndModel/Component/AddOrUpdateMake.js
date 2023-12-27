import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { handleApiRequest } from "../../../../services/handleApiRequest";
import { imageUpload } from "../../../../redux/states/common/thunk";
import {
  createMake,
  getMakeDetails,
  updateMakeDetails,
} from "../../../../redux/states/makeAndModel/thunk";
import { vehicleTypes } from "../../../../utils";
import { useSearchParams } from "react-router-dom";
import blockSubmitRefresh from "../../../../utils/blockSubmitRefresh";

const AddOrUpdateMake = ({ userAction, setUserAction, handleMakeList }) => {
  const [queryParam] = useSearchParams();

  const { makeDetails } = useSelector((state) => state.makeAndModel);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setUserAction(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    const request = {
      file,
    };
    const response = await handleApiRequest(imageUpload, request);

    if (response.status) {
      setFormData({ ...formData, logo: response.data[0].url });
    }
  };

  const handleMakeDetails = async () => {
    await handleApiRequest(getMakeDetails, userAction.id);
  };

  const handleSubmit = async () => {
    const request = {
      ...formData,
      type: queryParam.get("category") || "cars",
    };
    let response = {};
    if (userAction.type === "addMake") {
      response = await handleApiRequest(createMake, request);
    } else {
      response = await handleApiRequest(updateMakeDetails, request);
    }

    if (response.status) {
      await handleMakeList();
      setFormData({});
      handleClose();
    }
  };

  useEffect(() => {
    if (userAction.type === "editMake") {
      handleMakeDetails();
    }
  }, [userAction]);

  useEffect(() => {
    if (makeDetails.data) {
      const types = [];
      makeDetails.data.type.forEach((type) => {
        types.push({
          value: type,
          label: vehicleTypes.find((opt) => opt.value === type)?.label,
        });
      });
      setFormData({
        ...makeDetails.data,
        makeId: makeDetails.data._id,
        type: types,
      });
    }
  }, [makeDetails]);

  // console.log("formData", formData);
  // console.log("makeDetails", makeDetails);

  return (
    <>
      <Modal show={!!userAction} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {userAction.type === "editMake" ? "Update Make" : "Add Make"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={blockSubmitRefresh}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Make name"
                name="label"
                value={formData.label}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhoto">
              <Form.Label className="my-2">Make Logo</Form.Label>
              <br />
              <div className="FileExplorerBtnwrapper">
                <Button className="pointer">Upload logo</Button>
                <input type="file" onChange={handleLogoUpload} />
              </div>
            </Form.Group>

            <Form.Group controlId="formLogo">
              {formData?.logo && (
                <img
                  src={formData?.logo}
                  style={{ height: "100px", width: "100px" }}
                />
              )}
            </Form.Group>

            {/* <Form.Group controlId="formVehicleType">
              <Form.Label>Vehicle Type</Form.Label>
              <Select
                value={formData.type}
                onChange={(value) => {
                  setFormData({ ...formData, type: value });
                }}
                options={vehicleTypes}
                isMulti
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddOrUpdateMake;
