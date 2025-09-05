import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Counter from "../../pages/Counter";
import Todo from "../../pages/Todo";
import Profile from "../../pages/Profile";
import Product from "../../pages/Product";
import Comment from "../../pages/Comment";
import Weather from "../../pages/Weather";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<Product />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
