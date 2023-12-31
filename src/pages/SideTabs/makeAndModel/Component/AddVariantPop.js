import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import {
  createModel,
  createVariant,
  getModelDetails,
  getVariantDetails,
  updateModelDetails,
  updateVariantDetails,
} from "../../../../redux/states/makeAndModel/thunk";
import { handleApiRequest } from "../../../../services/handleApiRequest";
import { vehicleTypes } from "../../../../utils";
import { useSearchParams } from "react-router-dom";
import blockSubmitRefresh from "../../../../utils/blockSubmitRefresh";

const AddVariantPopup = ({ userAction, setUserAction, handleVariantList }) => {
  const { variantDetails } = useSelector((state) => state.makeAndModel);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setUserAction(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVariantDetails = async () => {
    await handleApiRequest(getVariantDetails, userAction.id);
  };

  const handleAddOrUpdateModel = async () => {
    const request = {
      ...formData,
      model: userAction.id,
    };
    let response = {};
    if (userAction.type === "editVariant") {
      response = await handleApiRequest(updateVariantDetails, request);
    } else {
      response = await handleApiRequest(createVariant, request);
    }
    if (response.status) {
      await handleVariantList();
      handleClose();
      setFormData({});
    }
  };

  useEffect(() => {
    if (userAction.type === "editVariant") {
      handleVariantDetails();
    }
  }, []);

  useEffect(() => {
    if (variantDetails.data) {
      setFormData({
        ...variantDetails.data,
      });
    }
  }, [variantDetails]);

  console.log("formData", formData);
  console.log("variantDetails", variantDetails);

  return (
    <>
      <Modal show={userAction} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Variant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={blockSubmitRefresh}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Variant name"
                name="label"
                value={formData.label}
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group controlId="formtype">
              <Form.Label>Vehicle Type</Form.Label>
              <Select
                value={formData.type}
                onChange={(value) => {
                  setFormData({ ...formData, type: value });
                }}
                options={options}
                isMulti
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateModel}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddVariantPopup;
