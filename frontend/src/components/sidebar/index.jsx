"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodoData, toggleSidebar } from "../../redux/slices/todo";
import { updateTodo } from "../../redux/slices/todo";

export function SideBar() {
  const open = useSelector((state) => state.todo.sideBar.visible);
  const task = useSelector((state) => state.todo.sideBar.data);
  const dispatch = useDispatch();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      dispatch(
        updateTodo({
          id: task.id,
          updatedData: {
            notes: [
              ...task.notes.map((note) => ({
                content: note.content,
                date: new Date(note.date),
              })),
              { content: newNote, date: new Date() },
            ],
          },
        })
      );
      setShowNoteInput(false); // Hide input after submission

      setTimeout(() => {
        dispatch(fetchTodoData(task.id));
      }, 1000);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(toggleSidebar());
      }}
      className="relative z-10 "
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className=" bg-black pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => dispatch(toggleSidebar())}
                    className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <div aria-hidden="true" className="size-6 bg-white" />
                  </button>
                </div>
              </TransitionChild>
              <div className="  flex h-full flex-col overflow-y-scroll  py-6 shadow-xl">
                <div className=" sm:px-6">
                  <DialogTitle className="text-base font-semibold text-white">
                    {/* Title */}
                    {task && (
                      <>
                        <h2 className="text-2xl font-bold mb-2">
                          {task?.title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-300 mb-4">
                          {task?.description}
                        </p>

                        {/* Priority & Status */}
                        <div className="flex justify-between items-center mb-4">
                          <span
                            className={`px-3 py-1 text-sm font-semibold rounded-full ${
                              task.priority === "high"
                                ? "bg-red-600"
                                : task.priority === "medium"
                                ? "bg-yellow-600"
                                : "bg-green-600"
                            }`}
                          >
                            {task?.priority?.toUpperCase()}
                          </span>
                          <span
                            className={`px-3 py-1 text-sm font-semibold rounded-full ${
                              task.completed ? "bg-green-500" : "bg-gray-500"
                            }`}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold">Tags:</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {task.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Assigned Users */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold">
                            Assigned Users:
                          </h3>
                          <ul className="list-disc list-inside text-gray-300">
                            {task.assignedUsers?.map((user, index) => (
                              <li key={index}>{user}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Notes */}
                        <div>
                          <h3 className="text-lg font-semibold">Notes:</h3>
                          <div className="max-h-70 overflow-y-auto bg-gray-800 p-3 rounded-md mt-2">
                            {task.notes?.map((note, index) => (
                              <div
                                key={index}
                                className="border-b border-gray-700 pb-2 mb-2"
                              >
                                <p className="text-gray-300">
                                  "{note.content}"
                                </p>
                                <span className="text-xs text-gray-400">
                                  {new Date(note.date).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Add Note Button */}
                        {!showNoteInput && (
                          <button
                            onClick={() => setShowNoteInput(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2"
                          >
                            + Add Note
                          </button>
                        )}

                        {/* Note Input Form */}
                        {showNoteInput && (
                          <div className="mt-3">
                            <textarea
                              className="w-full p-2 text-white rounded-md"
                              rows="2"
                              black
                              placeholder="Enter your note..."
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                            />
                            <button
                              onClick={handleAddNote}
                              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                            >
                              Submit Note
                            </button>
                          </div>
                        )}

                        {/* Created & Updated Time */}
                        <p className="text-xs text-gray-400 mt-4">
                          Created: {new Date(task.createdAt).toLocaleString()} |
                          Updated: {new Date(task.updatedAt).toLocaleString()}
                        </p>
                      </>
                    )}
                  </DialogTitle>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
