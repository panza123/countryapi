import { NavLink } from "react-router-dom";


export default function PageNotFound() {
  return (
    <div className="w-full h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full text-4xl">
     <h1>404</h1>
     <p>NotFound</p>
     <NavLink to="/">Home</NavLink>
     
             </div>

    </div>
  )
}
