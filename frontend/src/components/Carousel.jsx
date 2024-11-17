import React from "react";
import Slider from "react-slick";
import { Container, ThemeProvider, Typography } from "@mui/material";
import theme from "./Theme";
import { testimonials } from "./Data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="mt-12">
        <div>
          <Typography
            className="flex md:flex-row flex-col items-center justify-center"
            variant="h2"
            color="primary.main"
            sx={{ fontSize: " 40px", fontWeight: 400, lineHeight: 1.2 }}
          >
            Meet the Caring{" "}
            <span className="ml-2 font-bold">Minds Behind Your Journey</span>
          </Typography>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card rounded-lg ${
                  index % 2 === 0 ? "mt-4" : "mt-12"
                }  p-7 mb-5 flex flex-col justify-between items-center`}
              >
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-100"
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ my: 2 }}
                >
                  {testimonial.text}
                </Typography>
                <Typography variant="text" sx={{ fontWeight: "500" }}>
                  {testimonial.name}
                </Typography>
              </div>
            ))}
          </Slider>
        </div>
      </Container>

      <div className="bg-primary mt-16 p-8">
        <Container>
          <Typography
            className="flex md:flex-row flex-col items-center justify-center"
            variant="h5"
            color="white"
            sx={{ fontSize: " 20px", fontWeight: 400, lineHeight: 1.2 }}
          >
            Your mental health is just as important as your physical health. Nurture it with care.
          </Typography>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Carousel;
