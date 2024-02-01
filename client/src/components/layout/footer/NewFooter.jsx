import React from 'react'
import './newfooter.css'

export default function NewFooter() {
    return (
        <>
            <section id="footer">
                <div class="main-footer">
                    <div class="logoinfo" data-aos="fade-up">
                        {/* <h2>Responsive Footer</h2>
                        <p>By Nikhil</p> */}
                        <img src="./whitelogo.png" alt="" />



                        <div class="contact-details">
                            <h1>Contact Us</h1>
                            <li>
                                <div class="fa fa-phone"></div><a href="tel:+918869012507">+91 8869012507</a></li>
                            <li>
                                <div class="fa fa-envelope"></div><a href="mailto:karanpal03040@gmail.com">karanpal03040@gmail.com</a>

                            </li>
                        </div>
                    </div>
                    <div class="com " data-aos="fade-up">
                        <h1>Quick Links</h1>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/cart">Cart</a></li>
                            <li><a href="/account">Account</a></li>
                        </ul>
                    </div>
                    <div class="info" data-aos="fade-up">
                        <h1>Social Media</h1>
                        <div class="sociallogos">
                            <div class="logobox">
                                <a href="https://instagram.com/krnn_sanatani " class="fa fa-instagram"></a>
                                <a href="https://www.linkedin.com/in/karan-pal-developer/" class="fa fa-linkedin"></a>
                                <a href="https://www.youtube.com/channel/UCK70BnONGiUUaZ49O2BOaBw" class="fa fa-youtube-play"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>© Vedic Store 2024 All Rights Reserved</footer>
            </section >

        </>
    )
}
