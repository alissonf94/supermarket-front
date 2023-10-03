import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Grid, } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import shoppingCardService from '../services/ShoppingCardService';
import buyService from "../services/BuyService"
import { Navigate, useNavigate } from 'react-router-dom';
import RemovelineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddlineIcon from '@mui/icons-material/AddCircleOutline';

// Generate Order Data

export const ShoppingList = () => {
  const navigate = useNavigate()
  const [items, setItems] = React.useState([])

  async function handleDelete(itemId) {
    await shoppingCardService.deleteItem(itemId)
  }
  async function handleLess(itemId) {
   // setQuantity (  quantotity + 1)
  }
  async function handleAdd(itemId) {
    // setQuantity (  quantotity - 1)
  }

  async function getShoppingCard() {
    const shoppingCard = await shoppingCardService.getShoppingCard()

    const data = await shoppingCard.json()

    setItems(data.items)
  }

  let somaPrice = 0;

  for (const item of items) {
    somaPrice += item.valueItem
  }

  async function handleRegisterBuy() {
    try {
      await buyService.registerBuy()
      navigate('/historyBuy')
    }
    catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getShoppingCard()
  })

  return (
    <Box sx={{ py: 1 }} maxWidth="97%" >
      <Grid container spacing={4}
        sx={{
          display: 'flex', flexDirection: 'column',
          margin: '2px', alignItems: 'right'
        }} gap="40px">
        <Card>
          <Table >
            <TableHead sx={{ fontSize: 45 }}>
              <TableRow >
                <TableCell>Name</TableCell>
                <TableCell >Description</TableCell>
                <TableCell>Type Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell> Sub-Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.product.nameProduct}</TableCell>
                  <TableCell >{item.product.description}</TableCell>
                  <TableCell>{item.product.typeProduct}</TableCell>
                  <TableCell>R$ {Number(item.product.price).toFixed(2).replace(".", ",")}</TableCell>
                  <TableCell>
                    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', paddingRight:'10px'}}>
                      <RemovelineIcon onClick={() => { handleLess(item._id) }} sx={{ cursor: 'pointer' }}/>
                       {item.quantity} 
                      <AddlineIcon onClick={() => { handleAdd(item._id) }} sx={{ cursor: 'pointer' }}/>
                    </Box>
                  </TableCell>
                  <TableCell> R$ {Number((item.valueItem)).toFixed(2).replace(".", ",")} </TableCell>
                  <TableCell > <DeleteIcon onClick={() => { handleDelete(item._id) }} sx={{ cursor: 'pointer' }} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Box
          sx={{
            height: '100%', display: 'flex',
            flexDirection: 'column', alignItems: "end"
          }} >
          <Card >
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Total de itens</TableCell>
                    <TableCell>Valor total da compra</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align='center'>{items.length}</TableCell>
                    <TableCell align='center'>R$ {Number(somaPrice).toFixed(2).replace(".", ",")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardActions sx={{
              height: '100%', display: 'flex',
              flexDirection: 'column', alignItems: "end"
            }}>
              <Button variant="outlined" onClick={() => {
                handleRegisterBuy()
              }} >Comprar</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Box>
  );
}
