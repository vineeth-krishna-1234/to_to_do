import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../../redux/slices/todo";
import { AnimatePresence, } from "framer-motion";
import { useState } from "react";
import makeAnimated from "react-select/animated";
import {  FiPlus, } from "react-icons/fi";
import { motion } from "framer-motion";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const TaskInputForm = () => {
  const [visible, setVisible] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [tags, setTags] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();

  const handleSubmit = () => {
    const dataToPost = {
      title: title,
      description: description,
      priority: priority,
      tags: tags,
      assignedUsers: assignedUsers.map((e) => e.value),
    };
    dispatch(createTodo(dataToPost));
    setVisible(!visible);
  };

  return (
    <div
      className={`fixed ${"bottom-6"} left-1/2 w-full max-w-xl -translate-x-1/2 px-4`}
    >
      <AnimatePresence>
        {visible && (
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
          >
            <div className="w-full text-white rounded text-xl my-3">
              <input
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What do you need to do?"
              className="h-24 w-full resize-none rounded bg-zinc-900 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
            />
            <div className="flex flex-row justify-around">
              <div className="flex items-center gap-1.5">
                <Select
                  value={assignedUsers}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={users.map((user) => {
                    return { value: user.id, label: user.username };
                  })}
                  placeholder="Select users"
                  onChange={(selectedOptions) =>
                    setAssignedUsers(selectedOptions)
                  }
                />
              </div>{" "}
              <div className="flex items-center gap-1.5">
                <Select
                  className="basic-single"
                  value={priority ? { value: priority, label: priority } : null} // Ensure correct format
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={["low", "medium", "high"].map((priority) => ({
                    value: priority,
                    label: priority,
                  }))}
                  placeholder="Select priority"
                  onChange={(selectedOption) =>
                    setPriority(selectedOption.value)
                  } // Extract value
                />
              </div>
              <div className="flex items-center gap-1.5">
                <CreatableSelect
                  isMulti
                  value={tags.map((tag) => ({ value: tag, label: tag }))}
                  onChange={(selectedOptions) =>
                    setTags(selectedOptions.map((opt) => opt.value))
                  }
                  placeholder="Enter tags..."
                />
              </div>
            </div>

            <div className="flex items-center justify-between my-4">
              <button
                type="submit"
                className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500"
              >
                Submit
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <button
        onClick={() => setVisible((pv) => !pv)}
        className="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900"
      >
        <FiPlus
          className={`transition-transform ${
            visible ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
};

export default TaskInputForm;
