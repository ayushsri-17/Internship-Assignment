import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from './Users'
import AddEdit from "./AddEdit";
import './App.css'

function App() {

  return (
    <>
      <div>
      <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/add-user" element={<AddEdit />} />
        <Route path="/edit-user/:index" element={<AddEdit />} />
      </Routes>
    </Router>
      </div>
    </>
  )
}

export default App
