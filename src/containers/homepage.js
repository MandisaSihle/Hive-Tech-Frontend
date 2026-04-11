import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Empty from "../components/default/Empty";
import Footer from "../components/default/Footer";
import Header from "../components/default/Header";
import ProductListCard from "../components/homepage/productListCard.js";
import { Male, Female } from "../Constance";
import { fetchCarts } from "../reduxs/cart/operations.js";
import { getCarts } from "../reduxs/cart/selectors.js";
import { fetchCategories } from "../reduxs/category/operations.js";
import { getCategories } from "../reduxs/category/selectors.js";
import { fetchProducts } from "../reduxs/product/operations.js";
import { getProducts } from "../reduxs/product/selectors.js";

export default function Homepage() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const queryType = query.get("type");
	const queryCategoryId = query.get("categoryId");
	const queryCategoryName = query.get("categoryName");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const productsState = useSelector(getProducts) || {};
	const categoriesState = useSelector(getCategories) || {};
	const cartsState = useSelector(getCarts) || {};

	const products = productsState?.results || [];
	const categories = categoriesState?.results || [];
	const carts = cartsState?.results || [];
	const totalCart = cartsState?.totalCart || 0;
	const totalPages = productsState?.total_pages || 0;

	const [type, setType] = useState(queryType || "");
	const [category, setCategory] = useState({
		id: queryCategoryId || null,
		name: queryCategoryName || null,
	});
	const [activeCategory, setActiveCategory] = useState(queryCategoryId ? +queryCategoryId : 0);
	const [search, setSearch] = useState(null);
	const [page, setPage] = useState(1);

	const title = type ? (type === "male" ? Male : Female) : "Products List";
	const defaultSelect = type ? (type === "male" ? "male" : "female") : "";

	const isEmptyCategory = categories.length === 0;
	const isEmptyProduct = products.length === 0;

	const femaleProduct = products.filter((p) => p.type === "female");
	const maleProduct = products.filter((p) => p.type === "male");

	const onPageChange = (e) => {
		setPage(e.selected + 1);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		dispatch(
			fetchProducts(
				{ type, category_id: category.id, search, page },
				() => navigate("/", { replace: true })
			)
		);
	}, [dispatch, type, category.id, search, page, navigate]);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchCarts());
	}, [dispatch]);

	const categoryHandler = (selectedCategory, isReset = false) => {
		setPage(1);

		if (isReset) {
			setCategory({ id: null, name: null });
			setActiveCategory(0);
			return;
		}

		setCategory({ id: selectedCategory.id, name: selectedCategory.name });
		setActiveCategory(selectedCategory.id);
	};

	return (
		<>
			<Header totalCart={totalCart} setSearch={setSearch} setPage={setPage} />

			<section className="main-wrapper">
				<div className="homepage">
					<div className="homepage-container">
						<div className="homepage-content">
							<select
								value={type}
								onChange={(e) => setType(e.target.value)}
								className="gender-select"
							>
								<option value="">FILTER BY GENDER</option>
								<option value="male">Men's</option>
								<option value="female">Women's</option>
							</select>

							<div className="right-border">
								<p className="homepage-category-text">Category Lists</p>
								<div className="category-list">
									<ul>
										<li
											className={activeCategory === 0 ? "active" : ""}
											onClick={() => categoryHandler(null, true)}
										>
											All
										</li>

										{!isEmptyCategory &&
											categories.map((c) => (
												<li
													className={activeCategory === c.id ? "active" : ""}
													onClick={() => categoryHandler(c)}
													key={c.id}
												>
													{c.name}
												</li>
											))}
									</ul>
								</div>
							</div>
						</div>

						<div className="homepage-content">
							<div className="homepage-title">
								{title} {category.name && `- ${category.name}`}
							</div>

							{!isEmptyProduct ? (
								category.name && !type ? (
									<>
										{femaleProduct.length > 0 && (
											<ProductListCard
												labelType={Female}
												products={femaleProduct}
												carts={carts}
											/>
										)}

										{maleProduct.length > 0 && (
											<ProductListCard
												labelType={Male}
												products={maleProduct}
												carts={carts}
											/>
										)}
									</>
								) : (
									<ProductListCard products={products} carts={carts} />
								)
							) : (
								<Empty message="Products are unavailable." />
							)}
						</div>
					</div>

					<div className="product-pagination">
						<ReactPaginate
							breakLabel="..."
							onPageChange={onPageChange}
							forcePage={page - 1}
							pageRangeDisplayed={3}
							pageCount={totalPages}
							renderOnZeroPageCount={null}
							containerClassName="pagination-container"
							pageClassName="page-item"
							breakClassName="page-item"
							pageLinkClassName="page-link"
							breakLinkClassName="page-link"
							previousClassName="d-none"
							nextClassName="d-none"
							activeClassName="page-active"
						/>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}