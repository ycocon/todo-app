import { AiFillDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

const ListComponent = ({ todos, handleUpdate, handleRemove }) => {
  if (todos.length == 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        Nothing to see here yet
      </div>
    );
  }
  return (
    <div id="to-do-list">
      {todos.map((item, index) => (
        <div className="list" key={index}>
          <div className="task-text">
            <span className="number">{index + 1}. </span>
            <span>{item}</span>
          </div>
          <div className="list-buttons">
            <button
              className="update"
              onClick={() => {
                handleUpdate(index, item);
              }}>
              <MdUpdate />
            </button>
            <button
              className="remove"
              onClick={() => {
                handleRemove(index);
              }}>
              <AiFillDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
