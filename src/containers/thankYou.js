import React from "react";
import { useNavigate } from "react-router";
import Footer from "../components/default/Footer";
import Header from "../components/default/Header";

export default function ThankYou() {
    const navigate = useNavigate();
    return(
        <>
        <Header />
        <section className="main wrapper">
            <div className="thank-you">
                <p>Thank You for ordering</p>
                <p>Thank you for ordering we have recieved your request.</p>
                <p>Our will be contacting you to tell the next steps</p>

                <button onClick={() => navigate.push('/')} className="custom-btn">Continue Shopping</button>
            </div>


        </section>
        <Footer />
        </>
    )
}