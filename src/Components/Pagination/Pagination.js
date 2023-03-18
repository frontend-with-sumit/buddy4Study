import React from "react";
import { DOTS, usePagination } from "./usePagination";
import "./Pagination.scss";

function Pagination({
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
	className,
	...props
}) {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	// If there are less than 2 items in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		props.onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		props.onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];

	return (
		<ul className={"pagination-container mb-0"}>
			{/* Left navigation arrow */}
			<li
				className={`pagination-item ${currentPage === 1 && "disabled"}`}
				onClick={onPrevious}
			>
				<i className="fa fa-chevron-left"></i>
			</li>
			{paginationRange.map((pageNumber, idx) => {
				if (pageNumber === DOTS) {
					return (
						<li className="pagination-item dots" keys={idx}>
							...
						</li>
					);
				}

				// Render Page numbers
				return (
					<li
						keys={idx}
						className={`pagination-item ${
							pageNumber === currentPage && "selected"
						}`}
						onClick={() => props.onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				);
			})}
			{/*  Right Navigation arrow */}
			<li
				className={`pagination-item ${currentPage === lastPage && "disabled"}`}
				onClick={onNext}
			>
				<i className="fa fa-chevron-right"></i>
			</li>
		</ul>
	);
}

export default Pagination;
