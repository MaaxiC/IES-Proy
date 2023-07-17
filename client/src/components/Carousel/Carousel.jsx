import Carousel from 'react-bootstrap/Carousel';

const CarouselFade = () => {
  return (
    <Carousel fade >
        <Carousel.Item style={{height:"35vh"}}>
            <img
            className="d-block w-100 img-fluid"
            src="https://promotions.newegg.com/nepro/22-1921/imgs/glaptop1.jpg"
            alt="Primera Imagen"
            />
        </Carousel.Item>
        <Carousel.Item style={{height:"35vh"}}>
            <img
            className="d-block w-100 img-fluid"
            src="https://www.computerlounge.co.nz/data/media/images/Brand/HyperX/hyperx-brand-banner.jpg"
            alt="Segunda Imagen"
            />
        </Carousel.Item>
        <Carousel.Item style={{height:"35vh"}}>
            <img
            className="d-block w-100 img-fluid"
            src="https://mesajil.com/wp-content/uploads/2022/01/HYPER-X-Home-Productos.jpg"
            alt="Tercera Imagen"
            />
        </Carousel.Item>
    </Carousel>
  )
}

export default CarouselFade