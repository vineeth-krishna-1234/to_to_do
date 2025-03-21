import { useDispatch } from "react-redux";
import { fetchTodoData } from "../../redux/slices/todo";
import { toggleSidebar } from "../../redux/slices/todo";
import { AnimatePresence } from "framer-motion";

import { Todo } from "../todo";
const Todos = ({ todos, handleCheck, removeElement }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full space-y-3">
      <AnimatePresence>
        {todos.map((t) => (
          <Todo
            handleCheck={handleCheck}
            removeElement={removeElement}
            id={t.id}
            key={t.id}
            checked={t.completed}
            children={t}
          >
            <p
              onClick={() => {
                dispatch(fetchTodoData(t.id));
                dispatch(toggleSidebar());
              }}
            >
              {t.title}
            </p>
          </Todo>
        ))}
      </AnimatePresence>
    </div>
  );
};

export { Todos };
