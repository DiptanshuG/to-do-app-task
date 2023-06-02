import React, { useContext, useState } from "react";
import { Todo, SubTask } from "../models/Todo";
import { NestedTodoItem } from "./NestedTodoItem";
import { Button, Form, Tooltip } from "react-bootstrap";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import AddSubtaskModal from "./AddSubtaskModal";
import { OverlayTrigger } from "react-bootstrap";

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { markTodoAsChecked, addSubTask, markSubtaskAsCompleted, deleteTodo } =
    useContext(AuthContext);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    markTodoAsChecked(todo, e.target.checked);
  };

  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddSubtask = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddSubtaskClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();

    if (title.trim() !== "") {
      const newSubtask: SubTask = {
        id: uuidv4(),
        title: title,
        completed: false,
      };
      addSubTask(newSubtask, todo.id);
      setTitle("");
      setShowModal(false);
    }
  };

  const tooltip = <Tooltip id={`tooltip-${todo.id}`}>Mark as complete</Tooltip>;

  const handleMarkSubtaskAsCompleted = (
    subTask: SubTask,
    todoId: string,
    checked: boolean
  ) => {
    markSubtaskAsCompleted(subTask, todoId, checked);
  };

  const handleDeleteTodo = (todoId: string) => {
    deleteTodo(todoId);
  };

  return (
    <div>
      <Card
        bg="light"
        text="dark"
        className="mb-3"
        style={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
        }}
      >
        <Card.Body className="d-flex justify-content-between align-items-center">
          <OverlayTrigger placement="top" overlay={tooltip}>
            <Form.Check
              type="checkbox"
              checked={todo.completed}
              onChange={handleCheckboxChange}
              label={todo.title}
            />
          </OverlayTrigger>

          <div className="d-flex gap-2">
            <Button onClick={handleAddSubtask}>Add Subtask Modal</Button>
            <DropdownButton
              id={`dropdown-button-${todo.id}`}
              title={<BsTrash />}
              variant="danger"
              className="ml-2"
            >
              <Dropdown.Item
                onClick={() => handleDeleteTodo(todo.id)}
                eventKey="3"
              >
                Delete
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </Card.Body>
      </Card>

      <div>
        {todo.subTasks.map((subTask: SubTask) => (
          <NestedTodoItem
            key={subTask.id}
            subTask={subTask}
            todoId={todo.id} // Pass the todo.id as the todoId prop
            markSubtaskAsCompleted={handleMarkSubtaskAsCompleted} // Pass the handler function
          />
        ))}
      </div>

      <AddSubtaskModal
        show={showModal}
        onHide={handleCloseModal}
        title={title}
        handleTitleChange={handleTitleChange}
        handleAddSubtaskClick={handleAddSubtaskClick}
      />
    </div>
  );
};
