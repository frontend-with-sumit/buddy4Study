import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-12">
					<Routes>
						<Route path="/products" element={<Products />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<Login />} />
					</Routes>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default App;
