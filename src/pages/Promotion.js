import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';

import promotionService from '../services/PromotionService'
import {  Await, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Promotion = () => {
  const navigate = useNavigate()

  const [nameProduct, setNameProduct] = useState('')
  const [priceProduct, setPrice] = useState('')

  const [promotions, setPromotions] = React.useState([])

  async function handleDelete(productId) {
    await promotionService.deletePromotion(productId)
  }
 
  async function getPromotions() {
    const promotions = await promotionService.getPromotions()

    const data = await promotions.json()

    setPromotions(data)
  }

  React.useEffect(() => {
    getPromotions()
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   const handlePriceChange = (e)=>{
    const price = e.target.value;
    setPrice(price)
   }

   const handleNameProductChange = (e)=>{
    const name = e.target.value;
    setNameProduct(name)
   }
   
   async function handleCreatePromotion (productName, productPrice){
     const response = await promotionService.createPromotion(productName, productPrice)
     
     const result = await response.json()

     if(response.status !== 201){
      toast(result.message)
    }

   }

   function handleClick(productName, productPrice){
    handleCreatePromotion(productName, productPrice)
    handleClose()
   }

  return (
    <Box sx={{ py: 1 }} maxWidth="97%" >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: "20px" }}>
        <Button onClick={handleClickOpen} variant='contained' sx={{ bgcolor: 'primary.main' }} >New promotion</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Promotion</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="product"
                  label="Product"
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onChange={handleNameProductChange}
                />
              </Grid>
             
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="price"
                  label="Price"
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onChange={handlePriceChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions >
            <Button variant='contained' onClick={handleClose} >Cancel</Button>
            <Button variant='contained' onClick={()=>{handleClick(nameProduct, priceProduct)}}>Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
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
                <TableCell>Type Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promotions.map((promotion) => (
                <TableRow key={promotion._id}>
                  <TableCell>{promotion.product.nameProduct}</TableCell>
                  <TableCell>{promotion.product.typeProduct}</TableCell>
                  <TableCell>R$ {Number(promotion.product.price).toFixed(2).replace(".", ",")}</TableCell>
                  <TableCell>
                    <Box>{promotion.product.quantityProduct}</Box>
                  </TableCell>
                  <TableCell > <DeleteIcon onClick={() => { handleDelete(promotion._id) }} sx={{ cursor: 'pointer' }} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <ToastContainer />
      </Grid>
    </Box>
  );
}

export default Promotion