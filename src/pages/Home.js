
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from 'react'
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import promotionService from '../services/PromotionService'
import shoppingCardService from "../services/ShoppingCardService"

const Home = () => {

    const [quantity, setQuantity] = React.useState()

    async function handleAddItem(id, quantity) {
        try {
            const result = await shoppingCardService.addItem(id, quantity)
        }
        catch (error) {
            console.log(error)
        }
    }

    const [promotions, setPromotions] = React.useState([])

    async function getPromotions() {
        const promotions = await promotionService.getPromotions()
    
        const data = await promotions.json()
    
        setPromotions(data)
      }
    
      React.useEffect(() => {
        getPromotions()
      })

    return (
        <Box component="main" sx={{ marginTop: "100px" }} >
            <Box sx={{ marginInline: "10%" }}>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay
                    autoPlaySpeed={2500}
                    centerMode={true}
                    className=""
                    containerClass="container"
                    customTransition="all 2s linear"
                    dotListClass=""
                    draggable
                    focusOnSelect={true}
                    infinite={true}
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
                    shouldResetAutoplay={true}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {promotions.map((promotion) => (
                        <Card
                            sx={{ height: '100%', maxWidth: "70%", display: 'flex', flexDirection: 'column', alignItems: "center" }}
                        >
                            <CardContent sx={{ flexGrow: 2 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {promotion.product.nameProduct}
                                </Typography>
                                <Typography>
                                    {promotion.product.description}
                                </Typography>
                                <Typography sx={{ marginTop: 1 }}>
                                    R$ {Number(promotion.product.price).toFixed(2).replace(".", ",")}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', gap: '100px' }}>
                                <TextField
                                    size='small'
                                    required
                                    id='quantity'
                                    name='quantity'
                                    margin="dense"
                                    label="Quantity"
                                    type="number"
                                    variant="outlined"
                                    color="secondary"
                                    inputProps={{
                                        min: 1
                                    }}
                                    onChange={(e) => {
                                        const inputValue = e.target.value
                                        if (/^\d+$/.test(inputValue)) {
                                            if (parseInt(inputValue) >= 1) {
                                                setQuantity(inputValue);
                                            }
                                        }
                                    }}
                                />
                                <Button type='submit' variant="contained" size="small" onClick={() => handleAddItem(promotion.product._id, quantity)}>Add</Button>
                            </CardActions>
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