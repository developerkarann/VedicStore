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
                    <img src="./assets/images/home/banner01.jpg" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="./assets/images/home/banner02.jpg" />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src="./assets/images/home/banner03.jpg" />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </>
    )
}
