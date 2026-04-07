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
    const query = new URLSearchParams(useLocation().search);
    const queryType = query.get("type");
    const queryCategoryId = query.get("categoryId");
    const queryCategoryName = query.get("categoryName");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const selector = useSelector((state) => state);
    const products = getProducts(selector) || {}; // Fallback to empty object
    const categories = getCategories(selector) || {};
    const carts = getCarts(selector) || { results: [] };

    const [type, setType] = useState(queryType);
    const [category, setCategory] = useState({ id: queryCategoryId, name: queryCategoryName });
    const [activeCategory, setActiveCategory] = useState(+queryCategoryId || 0);
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);

    const title = type ? (type === "male" ? Male : Female) : "productsList";
    const defaultSelect = type ? (type === "male" ? "male" : "female") : "";

    // Safely check for results length using optional chaining
    const isEmptyCategory = !(categories?.results?.length > 0);
    const isEmptyProduct = !(products?.results?.length > 0);

    // FIX: Added optional chaining here to prevent "Cannot read properties of undefined (reading 'filter')"
    const femaleProduct = products?.results?.filter((p) => p.type === "female") || [];
    const maleProduct = products?.results?.filter((p) => p.type === "male") || [];

    const onPageChange = (selectedItem) => {
        setPage(selectedItem.selected + 1); // react-paginate uses .selected
        window.scroll(0, 0);
    };

    useEffect(() => {
        dispatch(
            fetchProducts({ type, category_id: category.id, search, page }, () => 
                navigate("/", { replace: true }) // Fixed navigate syntax
            )
        );
    }, [type, category, search, page, dispatch, navigate]);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchCarts());
    }, [dispatch]);

    const categoryHandler = (cat, isReset = false) => {
        setPage(1);
        if (isReset) {
            setCategory({ id: null, name: null });
            setActiveCategory(0);
            return;
        }
        setCategory({ id: cat.id, name: cat.name }); // Fixed 'Id' typo to 'id'
        setActiveCategory(cat.id);
    };

    return (
        <>
            <Header totalCart={carts.totalCart} setSearch={setSearch} setPage={setPage} />

            <section className="main-wrapper">
                <div className="homepage">
                    <div className="homepage-container">
                        <div className="homepage-content">
                            <select
                                defaultValue={defaultSelect}
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
                                            categories.results.map((c) => (
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
                                                carts={carts.results}
                                            />
                                        )}
                                        {maleProduct.length > 0 && (
                                            <ProductListCard
                                                labelType={Male}
                                                products={maleProduct}
                                                carts={carts.results}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <ProductListCard products={products.results} carts={carts.results} />
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
                            pageCount={products.total_pages || 0}
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