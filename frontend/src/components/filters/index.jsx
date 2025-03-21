import { useState,useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFilters, fetchTodos } from "../../redux/slices/todo";
export default function FilterDropdown() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openSections, setOpenSections] = useState({
    category: true,
  });
  const [showSort, setSort] = useState(false);
  const users = useSelector((state) => state.user.users);
  const filters = useSelector((state) => state.todo.filters);
  const dispatch = useDispatch();

  

  useEffect(()=>{  console.log("Updated filters.users:", filters.users);
  },[filters])
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="relative w-72">
      <button
        onClick={() =>
          setOpenSections({ ...openSections, main: !openSections.main })
        }
        className="bg-gray-800 text-gray-200 px-4 py-2 rounded-md w-full flex justify-between items-center hover:bg-gray-700"
      >
        Filter by keywords
        <ChevronDown size={16} />
      </button>

      {openSections.main && (
        <div className="absolute mt-2 w-full bg-gray-900 shadow-lg rounded-md p-4 z-10 border border-gray-700">
          <div className="text-gray-200 font-medium flex justify-between">
            Filters
            <button
              onClick={() => {
                setSelectedCategories([]);
              }}
              className="text-blue-400 text-sm hover:text-blue-300"
            >
              Clear all
            </button>
          </div>

          <div class="max-w-xs mx-auto">
            <label
              for="quantity-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Choose Limit per page
            </label>
            <div class="relative flex items-center max-w-[8rem]">
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                onClick={()=>(dispatch(setFilters({limit:filters.limit-1})))}
              >
                <svg
                  class="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="text"
                id="quantity-input"
                data-input-counter
                aria-describedby="helper-text-explanation"
                class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={filters.limit}
                value={filters.limit}
              />
              <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                onClick={()=>(dispatch(setFilters({limit:filters.limit+1})))}

              >
                <svg
                  class="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="relative" x-data="{ openSort: true,sortType:'Sort by' }">
            <button class="flex text-white dark:text-white items-center justify-start w-40 py-2 mt-2 text-sm font-semibold text-left  rounded-lg">
              <span onClick={() => setSort(!showSort)}>sort type</span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                class="w-4 h-4 transition-transform duration-200 transform"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              x-transition:enter="transition ease-out duration-100"
              x-transition:enter-start="transform opacity-0 scale-95"
              x-transition:enter-end="transform opacity-100 scale-100"
              x-transition:leave="transition ease-in duration-75"
              x-transition:leave-start="transform opacity-100 scale-100"
              x-transition:leave-end="transform opacity-0 scale-95"
              class="absolute z-50 w-full origin-top-right"
            >
              {showSort && (
                <div class="px-2 pt-2 pb-2 bg-white rounded-md shadow-lg dark-mode:bg-gray-700">
                  <div class="flex flex-col">
                    <a
                      class="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200"
                      href="#"
                      onClick={() => {
                        dispatch(setFilters({ sortDirection: 1 }));
                        setSort(!showSort);
                      }}
                    >
                      <div class="">
                        <p class="font-semibold">Ascending</p>
                      </div>
                    </a>

                    <a
                      class="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200"
                      href="#"
                      onClick={() => {
                        dispatch(setFilters({ sortDirection: -1 }));
                        setSort(!showSort);
                      }}
                    >
                      <div class="">
                        <p class="font-semibold">Decending</p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Example for Category Section */}
          <div className="mt-3">
            <div
              className="flex justify-between items-center cursor-pointer text-gray-300 hover:text-white"
              onClick={() => toggleSection("category")}
            >
              <span className="font-medium">Category</span>
              <ChevronDown
                size={16}
                className={openSections.category ? "rotate-180" : ""}
              />
            </div>
            {openSections.category && (
              <div className="mt-2 space-y-1">
                {users.map((user) => (
                  <label
                    key={user.username}
                    className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={filters.users.includes(user.id)}
                      onChange={() => {
                        const updatedUsers = filters.users.includes(user.id)
                          ? filters.users.filter(id => id !== user.id) // Remove if already selected
                          : [...filters.users, user.id]; // Add if not selected
                          console.log(updatedUsers);
                          
                        dispatch(setFilters({ users: updatedUsers }));
                      }}
                    
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 flex items-center justify-center border rounded ${
                        selectedCategories.includes(user.username)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-800 border-gray-600"
                      }`}
                    >
                      {filters.users.includes(user.id) && (
                        <Check size={16} />
                      )}
                    </div>
                    {user.username}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3"
            onClick={() => {
              dispatch(fetchTodos());
              toggleSection();
              setSelectedCategories([]);
              setOpenSections({ ...openSections, main: !openSections.main });
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
