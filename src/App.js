import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFormData } from "./redux/actions";
import FormComponent from "./components/FormComponent";
import jsonData from "./test.json";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFormData(jsonData));
  }, [dispatch]);

  return (
    <div>
      <FormComponent />
    </div>
  );
};

export default App;
