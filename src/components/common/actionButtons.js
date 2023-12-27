import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as SaveIcon } from "../../assets/icons/save.svg";
import MyTooltip from "./tooltip";

export function EditButton({ onClick, tooltipText }) {
  return (
    <OverlayTrigger overlay={MyTooltip(tooltipText)}>
      <EditIcon className="m-1 pointer" onClick={onClick} />
    </OverlayTrigger>
  );
}

export function DeleteButton({ onClick, tooltipText }) {
  return (
    <OverlayTrigger overlay={MyTooltip(tooltipText)}>
      <DeleteIcon className="m-1 pointer" onClick={onClick} />
    </OverlayTrigger>
  );
}

export function SaveButton({ onClick, tooltipText }) {
  return (
    <OverlayTrigger overlay={MyTooltip(tooltipText)}>
      <SaveIcon className="m-1 pointer" onClick={onClick} />
    </OverlayTrigger>
  );
}
