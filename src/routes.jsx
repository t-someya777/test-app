import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RouteApp from "./layouts/RouteApp";
import TopPage from "./pages/TopPage";
import Contact from "./pages/Contact";
import Post from "./pages/post/Post";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RouteApp />}>
        <Route path="/" element={<TopPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts/:id" element={<Post />} />
      </Route>
    </>

  )
)

export default routes;