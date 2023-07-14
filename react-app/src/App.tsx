import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeTempalte } from "./templates/home-template/layout/HomeTemplate";
import Home from "./pages/home/Home";
import { BookDetailComponent } from "./pages/home/component/book/BookDetailComponent";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeTempalte />}>
        <Route index element={<Home />} />
        <Route path="/books/:id" element={<BookDetailComponent />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
