import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './bannerSlider.css'

export default function BannerSlider() {

    return (
        <>
            <Carousel
                axis='horizontal'
                autoPlay={true}
                //  stopOnHover={true}
                infiniteLoop={true}
                showThumbs={false}
                swipeable={true}
                className='bannerSlider'
            >
                <div>
                    <img src="./assets/images/home/vedicstore.png" />
                </div>
                {/* <div>
                    <img src="./assets/images/home/banner01.jpg" />
                </div>
                <div>
                    <img src="./assets/images/home/banner02.jpg" />
                </div>
                <div>
                    <img src="./assets/images/home/banner03.jpg" />
                </div> */}
            </Carousel>
        </>
    )
}
