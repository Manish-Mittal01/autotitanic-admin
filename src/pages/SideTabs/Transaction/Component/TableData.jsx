import React, { useState } from "react";
import moment from "moment";
import './TableData.css'
import MyPagination from "../../../../components/common/myPagination";
import DeleteIcon from "../../../../assets/images/deleteIcon.png"
import EditIcon from "../../../../assets/images/edit-icon.png"
import { Button, Col, Container, Row } from "react-bootstrap";
import MakeAndModal from "./MakeAndModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeList } from "../../../../redux/states/make/thunk";
import PromptModal from "./PromptModal";


const TableData = ({ transactions, requestDetails, setRequestDetails, handleShow }) => {
  const [show1, setShow] = useState(false);
  const [editValue, setEditValue] = useState()
  console.log(editValue, 'editValueeditValue');

  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);

  const dispatch = useDispatch()

  const { makeallList } = useSelector((state) => state.makeAndModal)
  console.log(makeallList, 'makeallListmakeallList');
  const editHandler = (value) => {
    setEditValue(value)
    handleShow()
  }

  useEffect(() => {
    dispatch(makeList())
  }, [])
  return (
    <>
      <div className="table-responsive">


        {makeallList.data &&

          makeallList.data?.map((data, idx) => {
            return (
              <>
                <table className="table commonTable">
                  <thead className="border-0">
                    <tr>
                      <th className=" border-0 p-3">S.No.</th>
                      <th className=" border-0 p-3">Label</th>
                      <th className=" border-0 p-3">Value</th>
                      <th className=" border-0 p-3">Logo</th>
                      <th className=" border-0 p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-0">{idx + 1}</td>
                      <td className="p-3 border-0">
                        {data?.label}
                      </td>
                      <td className="p-3 border-0">
                        {data?.value}
                      </td>
                      <td className="p-3 border-0">
                        <img src={data?.logo} style={{ height: '60px', width: '60px', borderRadius: '50%' }} />
                      </td>
                      <td className="p-3 border-0">
                        <img className='edit_image' src={EditIcon} onClick={() => editHandler(data)} />
                        <img className='delete_image' src={DeleteIcon} />
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
                      <td className="p-3 border-0">
                        {data?.name}
                      </td>

                      <td className="p-3 border-0">
                        <img className='edit_image' src={EditIcon} />
                        <img className='delete_image' src={DeleteIcon} />
                      </td>
                    </tr>
                    <Button className="m-3" onClick={handleShow}>Add Section</Button>
                  </tbody>
                </table>
              </>
            );
          })}


        <MakeAndModal
          show={show1}
          handleClose={handleClose1} />
        <PromptModal
          editValue={editValue}
        />
      </div>

      <MyPagination
        requestDetails={requestDetails}
        setRequestDetails={setRequestDetails}
        totalPosts={transactions.total_count}
      />
    </>
  );
};

export default TableData;
