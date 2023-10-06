import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import productService from "../services/ProductService"

import shoppingCardService from "../services/ShoppingCardService"

export default function Products() {
  
  const [products, setProducts] = React.useState([])

  async function getProducs() {
    const result = await productService.findAllProducts()
    
    const data = await result.json()
    
    setProducts(data)
    
  }

  React.useEffect(() => {
    getProducs()
  })
  const [quantity, setQuantity] = React.useState()
  
  async function handleAddItem(id,quantity){
    try {
      const result = await shoppingCardService.addItem(id, quantity)
    } 
    catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 3 }} maxWidth="lg">
          <Box>
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 2 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Nome: {product.nameProduct}
                      </Typography>
                      <Typography>
                        Descrição: {product.description}
                      </Typography>
                      <Typography sx={{marginTop: 1}}>
                      Preço: R$ {Number(product.price).toFixed(2).replace(".", ",")}
                      </Typography>
                      <Typography>
                        validade: {product.validity}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', gap: '100px'}}>
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
                      <Button type='submit' variant="contained" size="small" onClick={()=>handleAddItem(product._id, quantity)}>Add</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

        </Container>
      </main>
    </>
  );
}