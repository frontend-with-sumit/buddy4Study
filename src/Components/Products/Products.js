import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Products.scss";
import Pagination from "../Pagination/Pagination";
import Product from "./Product";

const URL = "https://api.publicapis.org/entries";

function Products() {
	const ITEMS_PER_PAGE = 10;
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [currentPageItems, setCurrentPageItems] = useState([]);

	const [totalItems, setTotalItems] = useState(0);
	const [currentPage, setCurrentPage] = useState(null);

	useEffect(() => {
		fetchItems();
		setCurrentPage(1);
	}, []);

	const fetchItems = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(URL);
			setItems(res.data?.entries);
			setTotalItems(res.data?.count);
			fetchCurrentPageData(res.data?.entries, 1);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCurrentPageData(items, currentPage);
	}, [currentPage]);

	const fetchCurrentPageData = (items = null, currentPage = null) => {
		const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
		setCurrentPageItems(items?.slice(firstPageIndex, lastPageIndex));
	};

	return (
		<div className="wrapper">
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-12 text-end mb-2">
						{!isLoading && (
							<button
								className="btn btn-primary btn-sm"
								onClick={() => navigate("/")}
							>
								Logout
							</button>
						)}
					</div>
					<div className="col-sm-12">
						<div className="products">
							{isLoading ? (
								<p className="mb-0 text-center">Loading ....</p>
							) : (
								currentPageItems?.map((item, id) => (
									<Product
										title={item.API}
										category={item?.Category}
										description={item?.Description}
										url={item?.Link}
									/>
								))
							)}
						</div>
					</div>
					<div className="col-sm-12">
						<div className="pagination">
							<Pagination
								className="pagination-bar"
								currentPage={currentPage}
								totalCount={totalItems}
								pageSize={ITEMS_PER_PAGE}
								onPageChange={(page) => setCurrentPage(page)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Products;
