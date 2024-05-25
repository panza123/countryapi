
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Home from "./components/Home";
import Rootlayout from "./layouts/Rootlayout";
import { ThemeProvider } from "./context/ThemeProvider";

import PageNotFound from "./components/PageNotFound";
import {CountryList} from "./components/CountryList";




// Creating the router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      {/* Root path renders the Home component */}
      <Route path="/" element={<Home />} />
      {/* Dynamic path renders the CountryList component with a loader */}
      <Route path="/list/:id" 
        
        element={<CountryList/>} />
      {/* Catch-all route renders the PageNotFound component */}
      <Route path="*" element={<PageNotFound />} />
      {/* Additional routes can be added here */}
    </Route>
  )
);

// Main App component with ThemeProvider and RouterProvider
export default function App() {
  return (
    <div className="w-full min-h-screen">
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}
