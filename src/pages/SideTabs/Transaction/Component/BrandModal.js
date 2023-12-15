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

const BrandModal = ({ show1, handleClose1, editValue, update, makeId }) => {
  const dispatch = useDispatch();
  const { makeallList, imageUrl } = useSelector((state) => state.makeAndModal);

  const [selectedOption, setSelectedOption] = useState([]);
  const [formData, setFormData] = useState({
    label: "",
    makeId: "",
    type: [],
  });
  console.log(formData, "formData");
  useEffect(() => {
    setFormData({
      label: "",
      makeId: makeId,
      type: [],
    });
  }, [makeId]);

  // useEffect(() => {
  //     if (imageUrl?.data?.length > 0 && imageUrl.data[0]?.url) {
  //         setFormData((prevFormData) => ({
  //             ...prevFormData,
  //             logo: imageUrl.data[0].url,
  //         }));
  //     }
  // }, [imageUrl]);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // const handleSubmit = async () => {
  //   if (!update) {
  //     const response = await dispatch(addModal(formData)).unwrap();
  //     if (response.status) {
  //       dispatch(makeList());
  //     }
  //     handleClose1();
  //   } else if (update) {
  //     dispatch(editBrand(formData));
  //     handleClose1();
  //   }
  // };

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, type: selectedValues });
    setSelectedOption(selectedOptions);
  };

  return (
    <>
      <Modal show={show1} onHide={handleClose1}>
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
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                isMulti
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button
            variant="primary"
            // onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BrandModal;
