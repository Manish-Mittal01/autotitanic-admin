import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const options = [
    { value: 'cars', label: 'Cars' },
    { value: 'bikes', label: 'Bikes' },
    { value: 'vans', label: 'Vans' },
    { value: 'motorhomes', label: 'Motorhomes' },
    { value: 'carvana', label: 'Carvana' },
    { value: 'trucks', label: 'Trucks' },
    { value: 'farm', label: 'Farm' },
    { value: 'plant', label: 'Plant' },
    { value: 'partAndAccessories', label: 'Part And Accessories' },
];

const MakeAndModal = ({ show1, handleClose }) => {
    const [selectedOption, setSelectedOption] = useState([]);
    console.log(selectedOption, 'selectedOption');

    const [formData, setFormData] = useState({
        label: '',
        value: '',
        logo: '',
        vehicleType: []
    });

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = () => {

        console.log(formData);
        handleClose();
    };

    return (
        <>
            <Modal show={show1} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Prompt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Label</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter label"
                                name="lable"
                                value={formData.label}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Value</Form.Label>
                            <Form.Control
                                type="value"
                                placeholder="Enter value"
                                name="value"
                                value={formData.value}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoto">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control
                                type="text"
                                name="logo"
                                placeholder='Enter Url'
                                value={formData.logo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoto">
                            <Form.Label>Vhicle Type</Form.Label>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
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

export default MakeAndModal;
