
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from 'react'
import { Box, Card, CardContent,Typography } from '@mui/material';
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
        <Box component="main" sx={{marginTop: "100px"}} >
            <Box sx={{ marginInline:"20%" }}>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay
                    autoPlaySpeed={2500}
                    centerMode = {true}
                    className=""
                    containerClass="container"
                    customTransition="all 2s linear"
                    dotListClass=""
                    draggable
                    focusOnSelect={true}
                    infinite = {true}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={200}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={true}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 1,
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
                            items: 1,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={true}
                    rewindWithAnimation={true}
                    rtl={false}
                    shouldResetAutoplay ={true}
                    showDots = {false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {products.map((product) => (
                        <Card
                            sx={{ height: '100%', width: "80%", display: 'flex', flexDirection: 'column', marginTop: "20px", alignItems:"center"}}
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
            </Box>
            {/* <Box>
                tese
            </Box> */}
        </Box>
    )
}

export default Home