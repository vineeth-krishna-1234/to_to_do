import HeaderComponent from "./components/header";
import { fetchUsers } from "./redux/slices/user";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "./redux/slices/todo";
import { MainSection } from "./sections/mainSection";
import FilterDropdown from "./components/filters";
function Routes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [user]);

  return (
    <>
      <HeaderComponent />
      <MainSection />
    </>
  );
}

export default Routes;
