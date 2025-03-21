import React, { useEffect } from "react";
import PaginationComponent from "../components/pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../redux/slices/todo";
import { updateTodo, deleteTodo } from "../redux/slices/todo";
import TaskInputForm from "../components/taskInput";
import { Todos } from "../components/todoList";
import { SideBar } from "../components/sidebar";
export const MainSection = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {}, [todos]);

  const handleCheck = (id) => {
    dispatch(updateTodo({ id: id, updatedData: { completed: true } }));
    setTimeout(() => {
      dispatch(fetchTodos());
    }, 1000);
  };

  const removeElement = (id) => {
    dispatch(deleteTodo(id));
    setTimeout(() => {
      dispatch(fetchTodos());
    }, 1000);
  };

  return (
    <section
      className="min-h-screen bg-zinc-950 py-24"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {todos && (
        <>
          <SideBar />{" "}
          <div className="mx-auto w-full max-w-xl px-4">
            <Todos
              removeElement={removeElement}
              todos={todos}
              handleCheck={handleCheck}
            />
          </div>
          <div className="w-full flex items-center justify-evenly mt-10">
            <PaginationComponent />
          </div>{" "}
        </>
      )}

      <TaskInputForm />
    </section>
  );
};
