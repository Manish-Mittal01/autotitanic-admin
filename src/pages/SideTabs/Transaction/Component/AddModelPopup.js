import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import LogoImage from "../../../../assets/images/logo.jpg";
import {
  addBrand,
  createModel,
  editBrand,
  imageUploadUrl,
} from "../../../../redux/states/makeAndModel/thunk";
import { handleApiRequest } from "../../../../services/handleApiRequest";

const options = [
  { value: "cars", label: "Cars" },
  { value: "bikes", label: "Bikes" },
  { value: "vans", label: "Vans" },
  { value: "motorhomes", label: "Motorhomes" },
  { value: "carvana", label: "Carvana" },
  { value: "trucks", label: "Trucks" },
  { value: "farm", label: "Farm" },
  { value: "plant", label: "Plant" },
  { value: "partAndAccessories", label: "PartAndAccessories" },
];

const AddModelPopup = ({ userAction, setUserAction, handleMakeList }) => {
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

  const handleAddOrUpdateModel = async () => {
    const types = [];

    formData.type.forEach((type) => {
      types.push(type.value);
    });
    const request = {
      ...formData,
      type: types,
      makeId: userAction.id,
    };

    await handleApiRequest(createModel, request);
    await handleMakeList();
    handleClose();
  };

  console.log(formData, "formData");

  return (
    <>
      <Modal show={userAction} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter label"
                name="label"
                value={formData.label}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formtype">
              <Form.Label>Vehicle Type</Form.Label>
              <Select
                value={formData.value}
                onChange={(value) => {
                  setFormData({ ...formData, type: value });
                }}
                options={options}
                isMulti
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateModel}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddModelPopup;
