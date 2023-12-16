import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
// import PromptModal from "./Component/PromptModal";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getAllMake } from "../../../redux/states/makeAndModel/thunk";
import AddModelPopup from "./Component/AddModelPopup";
import AddOrUpdateMake from "./Component/AddOrUpdateMake";

const MakeAndModel = () => {
  const { allMakeList } = useSelector((state) => state.makeAndModel);
  const [userAction, setUserAction] = useState(null);
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);

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
                          onClick={() => {
                            setUserAction({ type: "addMake" });
                          }}
                        >
                          Add Make
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {allMakeList.data?.items?.map((make, idx) => {
              return (
                <>
                  <Table className="table  mt-4">
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
                        <td className="p-3 border-0">{make?.label}</td>
                        <td className="p-3 border-0">
                          <img
                            src={make?.logo}
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td className="p-3 border-0">{make?.type}</td>
                        <td className="p-3 border-0">
                          <EditIcon className="m-1" />
                          <DeleteIcon className="m-1" />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="mx-5">
                    <div className="d-flex align-items-center justify-content-between my-2">
                      <h4>Models</h4>
                      <button
                        className="primaryBtn"
                        onClick={() =>
                          setUserAction({ type: "addModel", id: make._id })
                        }
                      >
                        Add Model
                      </button>
                    </div>
                    <table className="table  mb-0">
                      {/* <thead className="border-0">
                          <tr>
                            <th className="border-0 p-3">S.No.</th>
                            <th className="border-0 p-3">Label</th>
                            <th className="border-0 p-3">Type</th>
                            <th className="border-0 p-3">Action</th>
                          </tr>
                        </thead> */}
                      <tbody>
                        {make.models?.map((model, i) => (
                          <tr className="secondaryColor">
                            <td className="secondaryColor p-3 border-0">
                              {i + 1}
                            </td>
                            <td className="secondaryColor p-3 border-0">
                              {model?.label}
                            </td>
                            <td className="secondaryColor p-3 border-0">
                              {model?.type}
                            </td>
                            <td className="secondaryColor p-3 border-0">
                              <EditIcon className="m-1" />
                              <DeleteIcon className="m-1" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })}
          </Container>
        </section>
      </NonAuthLayout>
      {userAction?.type === "addModel" && (
        <AddModelPopup
          userAction={userAction}
          setUserAction={setUserAction}
          handleMakeList={handleMakeList}
        />
      )}
      {userAction?.type === "addMake" && (
        <AddOrUpdateMake
          userAction={userAction}
          setUserAction={setUserAction}
          handleMakeList={handleMakeList}
        />
      )}
    </>
  );
};

export default MakeAndModel;
