import { useSelector, useDispatch } from "react-redux";
import { getCinemas } from "./slice/cinemaSlice";
import { useRef, useEffect } from "react";

const GetCinemas = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCinemas("ciao"));
    return () => {};
  }, [dispatch]);

  let cinemas = useSelector((state) => state.cinemas);

  console.log("cinemas", cinemas);

  return <div> get cinema</div>;
};

export default GetCinemas;
