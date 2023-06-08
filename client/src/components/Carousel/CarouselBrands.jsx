import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CarouselBrands.css";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';

const CarouselBrands = () => {
  return (
    <Container>
        <Row className="bg-primary mb-2 p-4 d-none d-lg-block">
            <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: false,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            navigation={true} 
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            >
                <SwiperSlide><img src="https://www.venex.com.ar/products_images/hyperx.png" alt="hyperx" /></SwiperSlide>
                <SwiperSlide><img src="https://www.venex.com.ar/products_images/asus.png" alt="asus" /></SwiperSlide>
                <SwiperSlide><img src="https://www.venex.com.ar/products_images/logitech.png" alt="logitech" /></SwiperSlide>
                <SwiperSlide><img src="https://www.venex.com.ar/products_images/logos-2020__png__corsairlogo2020_horiz_w.png" alt="corsair" /></SwiperSlide>
                <SwiperSlide><img src="https://www.venex.com.ar/products_images/kingston.png" alt="kingston" /></SwiperSlide>
                <SwiperSlide><img src="https://www.venex.com.ar/products_images/samsung.png" alt="samsung" /></SwiperSlide>
                <SwiperSlide><img src="https://www.venex.com.ar/products_images/intelnewlogoblanco.png" alt="intel" /></SwiperSlide>
                <SwiperSlide><img src="https://www.venex.com.ar/products_images/amd.png" alt="amd" /></SwiperSlide>
                <SwiperSlide><img src="https://www.venex.com.ar/products_images/gigabyte.png" alt="gigabyte" /></SwiperSlide>
            </Swiper>
        </Row>
    </Container>
  );
};

export default CarouselBrands;
