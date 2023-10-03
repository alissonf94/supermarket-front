
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import productService from "../services/ProductService"




const Home = () => {
    const [products, setProducts] = React.useState([])

    async function getProducs() {
        const result = await productService.findAllProducts()

        const data = await result.json()

        setProducts(data)

    }
    React.useEffect(() => {
        getProducs()
    })

    return (
        <>
            <div>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay
                    autoPlaySpeed={2500}
                    centerMode={false}
                    className=""
                    containerClass="container"
                    customTransition="all 2s linear"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 3,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {products.map((product) => (
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', margin: "25px" }}
                        >
                            <CardContent sx={{ flexGrow: 2 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.nameProduct}
                                </Typography>
                                <Typography>
                                    {product.description}
                                </Typography>
                                <Typography sx={{ marginTop: 1 }}>
                                    R$ {Number(product.price).toFixed(2).replace(".", ",")}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}

                </Carousel>
            </div>
            <div>
                tese
            </div>
        </>
    )
}

export default Home