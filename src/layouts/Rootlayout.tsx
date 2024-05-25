import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"


export default function Rootlayout() {
  return (
    <main>
      <Nav/>
    <Outlet/>
    </main>
  )
}
