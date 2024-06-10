import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import {Home} from "./pages/Home"
import {Menu} from "./pages/Menu"
import {About} from "./pages/About"
import {RootLayout} from "./layouts/RootLayout"
import {ContactLayout} from "./layouts/ContactLayout"
import {Contactlist} from "./pages/Contactlist"
import {Contactct} from "./pages/Contactct"
import {AddContact} from "./pages/AddContact"
import { UpdateContact } from "./pages/UpdateContact"
import { DeleteContact } from "./pages/DeleteContact"
import "./App.css"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route path="about" element={<About/>}/>
      <Route path="menu" element={<Menu/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="contact" element={<ContactLayout/>}>
        <Route path="" element={<Contactlist/>}/>
        <Route path="update/:id" element={<UpdateContact/>}/>
        <Route path="delete" element={<DeleteContact/>}/>
        <Route path="create" element={<AddContact/>}/>
        <Route path="ct" element={<Contactct/>}/>
      </Route>
    </Route>
  )
)
function App(){
  return(
    <div><RouterProvider router={router}/></div>
  )
}
export default App