import React from 'react'
import playstore from '../../../assets/image/playstore.png'
import appstore from '../../../assets/image/appstore.png'
import logoImg from '../../../assets/image/logo.png'
import './footer.css'

export default function Footer() {
    return (
        <>
            <footer id='footer'>

                <div className="leftFooter">
                    <h4>DOWNLOAD OUR APP</h4>
                    <p>Download App for andoroid and IOS mobile app</p>
                    <img src={playstore} alt="" />
                    <img src={appstore} alt="" />
                </div>

                <div className="midFooter">
                    {/* <h1>E-COMMERCE</h1> */}
                    <img src={logoImg} alt="" />
                    <p>High quality is our first priority</p>
                    <p>Copyrights 2024 &copy; DeveloperKarann</p>
                </div>
                <div className="rightFooter">
                   <h4>Follow Us</h4>
                   <a href="">Instagram</a>
                   <a href="">Youtube</a>
                   <a href="">Linkedin</a>
                </div>

            </footer>
        </>
    )
}
