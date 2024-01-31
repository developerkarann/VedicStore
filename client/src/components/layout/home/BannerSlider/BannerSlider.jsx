import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
            >
                <div>
                    <img src="./assets/images/home/banner1.avif" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="./assets/images/home/banner2.avif" />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src="./assets/images/home/banner3.avif" />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </>
    )
}
