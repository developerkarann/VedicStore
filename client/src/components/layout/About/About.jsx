import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedinIcon from "@material-ui/icons/LinkedIn";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://karandeveloper.vercel.app/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dnxuag27j/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1706459054/personal%20pictures/profile_jgzyl3.jpg"
              alt="Founder"
            />
            <Typography>Karan Pal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Portoflio
            </Button>
            <span>
              Hello , I'm Karan Pal, a software developer and the founder of Vedic Store. Our aim is distribute our vedic products in all over Bharat. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Let's Connect!</Typography>
            <a href="https://www.linkedin.com/in/karan-pal-developer/" target="blank">
              <LinkedinIcon className="LinkedinSvgIcon" />
            </a>

            <a href="https://instagram.com/krnn_sanatani" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>

            <a href="https://www.youtube.com/channel/UCK70BnONGiUUaZ49O2BOaBw" target="blank">
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
