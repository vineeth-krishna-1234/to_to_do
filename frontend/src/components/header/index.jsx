import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/slices/user";
import FilterDropdown from "../filters";
export default function HeaderComponent() {
  const users = useSelector((state) => state.user.users) || [];
  const currentUser = useSelector((state) => state.user.currentUser) || null;
  const dispatch = useDispatch();

  return (
    <div>
      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" class="flex items-center">
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                To To Do
              </span>
            </a>

            <div class="max-w-sm mx-auto">
              {users.length && (
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    dispatch(setCurrentUser(e.target.value));
                  }}
                  // value={currentUser}
                >
                  <option selected>Choose a User</option>
                  {users.map((user) => (
                    <option value={user.id}>{user.username}</option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <FilterDropdown />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
