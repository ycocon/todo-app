import { AiOutlinePlus } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

const InputComponent = ({ input, setInput, inputRef, handleAdd, updating }) => {
  return (
    <div id="input-wrapper">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          // console.log(e.target.attributes.custom_attr.value);
        }}
        custom_attr=""
      />

      <button
        type="button"
        onClick={() => {
          handleAdd();
        }}>
        {updating ? <MdUpdate /> : <AiOutlinePlus />}
      </button>
    </div>
  );
};

export default InputComponent;
