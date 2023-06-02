import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export interface AddSubtaskModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddSubtaskClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AddSubtaskModal: React.FC<AddSubtaskModalProps> = ({
  show,
  onHide,
  title,
  handleTitleChange,
  handleAddSubtaskClick,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Subtask</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formSubtaskTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subtask title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddSubtaskClick}>
          Add Subtask
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubtaskModal;
