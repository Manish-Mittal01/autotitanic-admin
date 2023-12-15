import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import TableData from "./Component/TableData";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
import { toast } from "react-toastify";
import { listTransactions } from "../../../redux/states/transactions/thunks/listTransactions";
// import PromptModal from "./Component/PromptModal";
import userImage from "../../../assets/images/user.jpg";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getAllMake } from "../../../redux/states/makeAndModel/thunk";

const MakeAndModel = () => {
  const { allMakeList } = useSelector((state) => state.makeAndModel);
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setUpdate(false);
  };

  const handleMakeList = async () => {
    await handleApiRequest(getAllMake);
  };

  useEffect(() => {
    handleMakeList();
  }, []);

  console.log("allMakeList", allMakeList);

  return (
    <>
      <NonAuthLayout>
        <section className="Transaction py-3 position-relative">
          <Container fluid>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp pb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10 border-bottom">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <h2 className="m-0 fw-bold">Make</h2>
                    </div>
                    <div className="right d-flex align-items-center flex-wrap gap-10">
                      <div className="d-flex text-dark align-items-center btn justify-content-center rounded-pill gap-10">
                        <p
                          className="m-0 fw-normal text-muted"
                          onClick={handleShow}
                        >
                          Add Make
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <TableData
                    transactions={transactions}
                    requestDetails={requestDetails}
                    setRequestDetails={setRequestDetails}
                    handleShow={handleShow}
                    setEditValue={setEditValue}
                    update={update}
                    setUpdate={setUpdate}
                  /> */}
                </div>
              </Col>
            </Row>

            {allMakeList.data?.items?.map((data, idx) => {
              return (
                <>
                  <table className="table commonTable">
                    <thead className="border-0">
                      <tr className="secondaryColor">
                        <th className=" border-0 p-3">S.No.</th>
                        <th className=" border-0 p-3">Label</th>
                        <th className=" border-0 p-3">Logo</th>
                        <th className=" border-0 p-3">type</th>
                        <th className=" border-0 p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-0">{idx + 1}</td>
                        <td className="p-3 border-0">{data?.label}</td>
                        <td className="p-3 border-0">
                          <img
                            src={data?.logo}
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td className="p-3 border-0">
                          <EditIcon />
                          <DeleteIcon />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="table commonTable">
                    <thead className="border-0">
                      <tr>
                        <th className=" border-0 p-3">S.No.</th>
                        <th className=" border-0 p-3">Label</th>
                        <th className=" border-0 p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-0">{idx + 1}</td>
                        <td className="p-3 border-0">{data?.name}</td>

                        <td className="p-3 border-0">
                          <EditIcon />
                          <DeleteIcon />
                        </td>
                      </tr>
                      <Button className="m-3" onClick={() => handleShow1(data)}>
                        Add Modal
                      </Button>
                    </tbody>
                  </table>
                </>
              );
            })}
          </Container>
        </section>
      </NonAuthLayout>
    </>
  );
};

export default MakeAndModel;
