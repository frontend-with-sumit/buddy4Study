import React from "react";

function Product({ title, category, description, url }) {
	return (
		<div className="product shadow-sm">
			<div className="product__header">
				<p className="product__header--title mb-0">{title}</p>
				<p className="product__header--category mb-0">{category}</p>
			</div>
			<p className="product__description">{description}</p>
			<hr />
			<p className="product__url mb-0">
				<a href={url} target="_blank" rel="noreferrer">
					{url}
				</a>
			</p>
		</div>
	);
}

export default Product;
