import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { handleApiRequest } from "../../../../services/handleApiRequest";
import { imageUpload } from "../../../../redux/states/common/thunk";
import {
  createCountry,
  getCountryDetails,
  updateCountryDetails,
} from "../../../../redux/states/country/thunk";

const AddOrUpdateCountry = ({ userAction, setUserAction, handleMakeList }) => {
  const { countryDetails } = useSelector((state) => state.countryAndCity);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setUserAction(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFlagUpload = async (e) => {
    const file = e.target.files[0];

    const response = await handleApiRequest(imageUpload, { file });

    if (response.status) {
      setFormData({ ...formData, flag: response.data[0].url });
    }
  };

  const handleCountryDetails = async () => {
    await handleApiRequest(getCountryDetails, userAction.id);
  };

  const handleSubmit = async () => {
    const request = {
      ...formData,
    };

    let response = {};
    if (userAction.type === "addCountry") {
      response = await handleApiRequest(createCountry, request);
    } else {
      response = await handleApiRequest(updateCountryDetails, request);
    }

    if (response.status) {
      await handleMakeList();
      setFormData({});
      handleClose();
    }
  };

  useEffect(() => {
    if (userAction.type === "editCountry") {
      handleCountryDetails();
    }
  }, [userAction]);

  useEffect(() => {
    if (countryDetails.data) {
      setFormData({
        ...countryDetails.data,
      });
    }
  }, [countryDetails]);

  console.log("countryDetails", countryDetails);

  return (
    <>
      <Modal show={!!userAction} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {userAction.type === "editCountry" ? "Update Country" : "Add Country"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhoto">
              <Form.Label className="my-2">Country Flag</Form.Label>
            </Form.Group>

            <Form.Group controlId="formLogo">
              {formData?.flag && (
                <img src={formData?.flag} style={{ height: "100px", width: "100px" }} />
              )}
            </Form.Group>

            <div className="FileExplorerBtnwrapper">
              <Button className="pointer">Upload Flag</Button>
              <input type="file" onChange={handleFlagUpload} />
            </div>

            <Form.Group controlId="formName">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country code"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
              />
            </Form.Group>
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

export default AddOrUpdateCountry;
