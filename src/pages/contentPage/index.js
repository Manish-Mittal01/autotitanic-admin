import React, { useEffect, useState } from "react";
import NonAuthLayout from "../../Layout/NonAuthLayout";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CKEditor from "react-ckeditor-component";
import { handleApiRequest } from "../../services/handleApiRequest";
import { useSelector } from "react-redux";
import {
  getContentPage,
  getContentPageList,
  updateContentPage,
} from "../../redux/states/contentPage/thunk";

export default function ContentPage() {
  const { contentPagesList, contentPage } = useSelector(
    (state) => state.contentPage
  );
  const [pageContent, setPageContent] = useState({});
  const [selectedPage, setSelectedPage] = useState();
  const [userAction, setUserAction] = useState({});

  const handleChange = (e) => {
    setPageContent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleContentPagesList = async () => {
    await handleApiRequest(getContentPageList);
  };
  const handleContentPage = async () => {
    await handleApiRequest(getContentPage, selectedPage);
  };

  const handleUpdatePage = async () => {
    const response = await handleApiRequest(updateContentPage, pageContent);
    if (response.status) {
      setUserAction({});
      await handleContentPage();
    }
  };

  useEffect(() => {
    handleContentPagesList();
  }, []);

  useEffect(() => {
    if (selectedPage) handleContentPage();
  }, [selectedPage]);

  useEffect(() => {
    if (contentPagesList.data) {
      setSelectedPage(contentPagesList.data[0]?._id);
    }
  }, [contentPagesList]);

  useEffect(() => {
    if (contentPage.data) {
      setPageContent(contentPage.data);
    }
  }, [contentPage]);

  //   console.log("contentPagesList", contentPagesList);
  //   console.log("contentPage", contentPage);
  //   console.log("userAction", userAction);

  return (
    <NonAuthLayout>
      <section className="Transaction py-3 position-relative">
        <Container fluid>
          <Row>
            <Col lg="12" className="my-2">
              <div className="Box py-3 pt-lg-4">
                <div className="filterWrp pb-3 px-lg-3 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10 border-bottom">
                  <div className="left d-flex align-items-center gap-10 flex-wrap">
                    <h2 className="m-0 fw-bold">{contentPage.data?.page}</h2>
                    <div className="">
                      <Form.Select
                        className="form-control rounded-pill"
                        aria-label="Default select example"
                        onChange={(e) => {
                          setSelectedPage(e.target.value);
                        }}
                      >
                        {contentPagesList.data?.map((page) => (
                          <option value={page._id}>{page.page}</option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>
                  <div className="right d-flex align-items-center flex-wrap gap-10">
                    <div className="d-flex text-dark align-items-center btn justify-content-center rounded-pill gap-10">
                      <p
                        className="m-0 fw-normal text-muted"
                        onClick={() => {
                          setUserAction({
                            type: "editPage",
                            id: contentPage.data?._id,
                          });
                        }}
                      >
                        Edit this Page
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {userAction?.type === "editPage" ? (
              <>
                <Col lg={12} className="my-4">
                  <Form.Label>Page Heading</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter page heading"
                    name="page"
                    value={pageContent.page}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={12} className="mb-4">
                  <CKEditor
                    activeClass=""
                    content={pageContent.description}
                    events={{
                      change: (evt) => {
                        const newContent = evt.editor.getData();
                        setPageContent((prev) => {
                          return {
                            ...prev,
                            description: newContent,
                          };
                        });
                      },
                    }}
                  />
                </Col>
                <div className="text-center">
                  <Button className="" onClick={handleUpdatePage}>
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <Col lg="12" className="my-2">
                <div
                  className="my-5"
                  dangerouslySetInnerHTML={{
                    __html: contentPage.data?.description,
                  }}
                />
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </NonAuthLayout>
  );
}
