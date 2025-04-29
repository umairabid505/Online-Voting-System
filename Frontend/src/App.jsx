import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CandidateHeader from "./components/CandidateHeader"; // Import your CandidateHeader

export default function App() {
  const location = useLocation(); // get current URL location

  return (
    <>
      {location.pathname === "/" ? <Header /> : <CandidateHeader />}
      <Outlet />
      <Footer />
    </>
  );
}
