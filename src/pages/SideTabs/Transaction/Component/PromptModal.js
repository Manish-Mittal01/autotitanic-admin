import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import LogoImage from "../../../../assets/images/logo.jpg";
import {
  addBrand,
  editBrand,
  imageUploadUrl,
} from "../../../../redux/states/makeAndModel/thunk";

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

const PromptModal = ({ show, handleClose, editValue, update }) => {
  const dispatch = useDispatch();
  const { makeallList, imageUrl } = useSelector((state) => state.makeAndModal);

  const [selectedOption, setSelectedOption] = useState([]);
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    photo: null,
    logo: "",
    makeId: "",
    type: [],
  });
  console.log(formData, "formData");

  useEffect(() => {
    if (editValue) {
      setFormData({
        ...editValue,
        makeId: editValue?._id,
      });
    }
  }, [editValue]);

  useEffect(() => {
    if (imageUrl?.data?.length > 0 && imageUrl.data[0]?.url) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        logo: imageUrl.data[0].url,
      }));
    }
  }, [imageUrl]);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (!update) {
      try {
        const response = await dispatch(addBrand(formData)).unwrap();
        if (response.status) {
          // dispatch(makeList());
        }
        console.log(response, "response");
      } catch (error) {
        console.log(error);
      }
      formData("");
      handleClose();
    } else if (update) {
      try {
        const response = await dispatch(editBrand(formData)).unwrap();
        if (response.status) {
          // dispatch(makeList());
        }
        console.log(response, "response");
      } catch (error) {
        console.log(error);
      }
      formData("");
      handleClose();
    }
  };
  const uploadImage = () => {
    if (formData?.photo) {
      dispatch(imageUploadUrl(formData?.photo));
    }
  };
  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, vehicleType: selectedValues });
    setSelectedOption(selectedOptions);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{update ? "Update Make" : "Add Make"}</Modal.Title>
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

            <Form.Group controlId="formPhoto">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control type="file" name="photo" onChange={handleChange} />
              <Button className="m-3" onClick={uploadImage}>
                Create Image Url
              </Button>
            </Form.Group>

            <Form.Group controlId="formLogo">
              {formData?.logo && (
                <img
                  src={formData?.logo}
                  style={{ height: "100px", width: "100px" }}
                />
              )}
            </Form.Group>

            <Form.Group controlId="formVehicleType">
              <Form.Label>Vehicle Type</Form.Label>
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
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
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PromptModal;
