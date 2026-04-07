import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BannerMobileImage from "../assets/images/Banner-Mobile.png";
import BannerImage from "../assets/images/Banner.jpg";
import offerImage001 from "../assets/images/offer001.png";
import offerImage002 from "../assets/images/offer002.png";
import offerImage003 from "../assets/images/offer003.png";
import offerImage004 from "../assets/images/offer004.png";
import Empty from "../components/default/Empty";
import Footer from "../components/default/Footer";
import Header from "../components/default/Header";
import CategoryCard from "../components/landing/cartegoryCard";
import { fetchCategories } from "../reduxs/category/operations";
import { getCategories } from "../reduxs/category/selectors";

export default function Landing() {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const categories = getCategories(selector);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <>
            <Header />
            <section className="main-wrapper">
                <div className="banner-container">
                    <img className="banner-image" src={BannerImage} alt="Desktop Banner" />
                    <img className="banner-image-mobile" src={BannerMobileImage} alt="Mobile Banner" />
                    <div className="banner-text">
                        <p>Plotting divine clothing</p>
                        <p>Everyone's favourite</p>
                        <p>This season's most-loud-styles</p>
                    </div>
                </div>

                <div className="product-brand">
                    <p>Get up to 50% off</p>
                    <p>On all products and brands</p>
                    <div className="brand-links">
                        <Link to={{ pathname: "sign-in", search: "type=female" }}>Shop women's</Link>
                        <Link to={{ pathname: "sign-in", search: "type=male" }}>Shop men's</Link>
                    </div>
                </div>

                <div className="landing-container">
                    <div className="content-container">
                        <p className="category-title">Categories</p>
                        <div className="category">
                            {categories.results && categories.results.length > 0 ? (
                                categories.results.map((c, index) => (
                                    <CategoryCard key={index} data={c} />
                                ))
                            ) : (
                                <Empty />
                            )}
                        </div>
                    </div>

                    <div className="content-container">
                        <p className="category-title">Offers</p>
                        <div className="offer">
                            <div className="offer-items">
                                <img className="offer-image" src={offerImage001} alt="Offer 1" />
                                <div className="offer-text">
                                    <p>UP TO 25% OFF</p>
                                    <p>All the T-shirt brands</p>
                                </div>
                                <button className="offer-btn offer-001">GET NOW</button>
                            </div>

                            <div className="offer-items">
                                <img className="offer-image" src={offerImage002} alt="Offer 2" />
                                <div className="offer-text">
                                    <p>UP TO 35% OFF</p>
                                    <p>On all the Hat brands</p>
                                </div>
                                <button className="offer-btn offer-002">GET NOW</button>
                            </div>

                            <div className="offer-items">
                                <img className="offer-image" src={offerImage003} alt="Offer 3" />
                                <div className="offer-text">
                                    <p>UP TO 50% OFF</p>
                                    <p>On all the Bottom brands</p>
                                </div>
                                <button className="offer-btn offer-003">GET NOW</button>
                            </div>

                            <div className="offer-items">
                                <img className="offer-image" src={offerImage004} alt="Offer 4" />
                                <div className="offer-text">
                                    <p>UP TO 75% OFF</p>
                                    <p>On all the Shirt brands</p>
                                </div>
                                <button className="offer-btn offer-004">GET NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}