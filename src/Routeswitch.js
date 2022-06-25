import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import App_conv from "./app/App_conv";
import App_posts from "./app/App_posts";
import * as img from "./images/icons";
import Login from "./app/Login";
import ProtectedRoute from "./app/ProtectedRoute";
import { AuthContextProvider } from "./app/UserProvider";
import Logout from "./app/Logout";
import MyProfile from "./app/MyProfile";
const RouteSwitch = () => {
 return (
  <Router>
   <AuthContextProvider>
    <nav className="navbar">
     <div className="logo">
      <img src={img.linkedin} />
     </div>
     <div className="searchbar">
      <i class="fa fa-search" aria-hidden="true"></i>{" "}
      <input
       type="text"
       placeholder="Search...
     "
      />
     </div>
     <div className="navbarpanel">
      <NavLink to="/posts">
       <img src={img.home} />
      </NavLink>
      <NavLink to="/conversations">
       <img src={img.conversation} />
      </NavLink>
      <NavLink to="/myprofile">
       <img src={img.useri} />
      </NavLink>
      <NavLink to="/logout">
       <img src={img.logout} />
      </NavLink>
     </div>
    </nav>
    <Routes>
     <Route
      path="/posts"
      element={
       <ProtectedRoute>
        <App_posts />
       </ProtectedRoute>
      }
     />
     <Route
      path="/myprofile"
      element={
       <ProtectedRoute>
        <MyProfile />
       </ProtectedRoute>
      }
     />
     <Route
      path="/conversations"
      element={
       <ProtectedRoute>
        <App_conv />{" "}
       </ProtectedRoute>
      }
     />
     <Route path="/login" element={<Login />} />
     <Route path="/logout" element={<Logout />} />
    </Routes>
   </AuthContextProvider>
  </Router>
 );
};

export default RouteSwitch;
