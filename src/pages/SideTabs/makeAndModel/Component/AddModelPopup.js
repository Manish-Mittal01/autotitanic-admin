import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import {
  createModel,
  getModelDetails,
  updateModelDetails,
} from "../../../../redux/states/makeAndModel/thunk";
import { handleApiRequest } from "../../../../services/handleApiRequest";
import { vehicleTypes } from "../../../../utils";
import { useSearchParams } from "react-router-dom";
import blockSubmitRefresh from "../../../../utils/blockSubmitRefresh";

const AddModelPopup = ({ userAction, setUserAction, handleModelList }) => {
  const [queryParam] = useSearchParams();

  const { modelDetails } = useSelector((state) => state.makeAndModel);
  const [formData, setFormData] = useState({
    label: "",
    type: [],
  });

  const handleClose = () => {
    setUserAction(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModelDetails = async () => {
    await handleApiRequest(getModelDetails, userAction.id);
  };

  const handleAddOrUpdateModel = async () => {
    const request = {
      ...formData,
      type: queryParam.get("category") || "cars",
      make: userAction.id,
    };
    let response = {};
    if (userAction.type === "editModel") {
      response = await handleApiRequest(updateModelDetails, {
        ...formData,
        type: types,
        id: formData._id,
      });
    } else {
      response = await handleApiRequest(createModel, request);
    }
    if (response.status) {
      await handleModelList();
      handleClose();
      setFormData({});
    }
  };

  useEffect(() => {
    if (userAction.type === "editModel") {
      handleModelDetails();
    }
  }, []);

  useEffect(() => {
    if (modelDetails.data) {
      const types = [];
      modelDetails.data.type.forEach((type) => {
        types.push({
          value: type,
          label: vehicleTypes.find((opt) => opt.value === type)?.label,
        });
      });
      setFormData({
        ...modelDetails.data,
        type: types,
      });
    }
  }, [modelDetails]);

  console.log(formData, "formData");
  console.log("modelDetails", modelDetails);

  return (
    <>
      <Modal show={userAction} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={blockSubmitRefresh}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Model name"
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

export default AddModelPopup;
