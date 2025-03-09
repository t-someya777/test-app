import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RouteApp from "./layouts/RouteApp";
import TopPage from "./pages/TopPage";
import Contact from "./pages/Contact";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RouteApp />}>
      <Route path="/" element={<TopPage />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
  )
)

export default routes;