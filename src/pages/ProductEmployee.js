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
import productService from '../services/ProductService'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import moment from 'moment';

const Product = () => {

  const [nameProduct, setNameProduct] = useState('')
  const [priceProduct, setPrice] = useState()
  const [typeProduct, setType] = useState('')
  const [descriptionProduct, setdescription] = useState('')
  const [validityProduct, setValidity] = useState('')
  const [quantityProduct, setquantity] = useState('')

  const [Products, setProducts] = React.useState([])

  async function handleDelete(productId) {
    await productService.deleteProduct(productId)
  }

  async function getProducts() {
    const products = await productService.findAllProducts()

    const data = await products.json()

    setProducts(data)
  }

  React.useEffect(() => {
    getProducts()
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setPrice(price)
  }

  const handleNameProductChange = (e) => {
    const name = e.target.value;
    setNameProduct(name)
  }
  const handleTypeProductChange = (e) => {
    const type = e.target.value;
    setType(type)
  }
  const handleDescriptionProductChange = (e) => {
    const description
      = e.target.value;
    setdescription(description)
  }
  const handleQuantityProductChange = (e) => {
    const quantity = e.target.value;
    setquantity(quantity)
  }

  const handleValidityProductChange = (e) => {
    const validity = e.target.value.replace(/\D/g, '');
    setValidity(validity)
  };

  const isValidDate = (date) => {
    const dateFormat = 'MM/DD/YY';

    if (!moment(date, dateFormat, true).isValid()) {
      return false;
    }

    const parsedDate = moment(date, dateFormat);
    if (!parsedDate.isValid()) {
      return false;
    }

    return true;
  }

  async function handleCreateProduct(productName, productPrice, descriptionProduct, typeProduct, validityProduct, quantityProduct) {

    const response = await productService.createProduct(productName, productPrice, descriptionProduct, typeProduct, validityProduct, quantityProduct)

    const result = await response.json()

    if (response.status !== 201) {
      toast(result.message)
    }

  }

  function handleClick(productName, productPrice, descriptionProduct, typeProduct, validityProduct, quantityProduct) {
    handleCreateProduct(productName, productPrice, typeProduct, descriptionProduct, validityProduct, quantityProduct)
    handleClose()
  }

  return (
    <Box sx={{ py: 1 }} maxWidth="97%" >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: "20px" }}>
        <Button onClick={handleClickOpen} variant='contained' sx={{ bgcolor: 'primary.main' }} >New Product</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Promotion</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  required
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
                  required
                  margin="dense"
                  id="typePdoduct"
                  label="Type Product"
                  type="txt"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onChange={handleTypeProductChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="price"
                  label="Price"
                  type="Number"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onChange={handlePriceChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="validity"
                    label="Validity"
                    type="text"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onChange={handleValidityProductChange}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="desciption"
                  label="Desciption"
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onChange={handleDescriptionProductChange}
                  multiline
                  rows={2}
                />

              </Grid>
              <Grid item xs={4}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="quantity"
                  label="Quantity"
                  type="Number"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onChange={handleQuantityProductChange}
                  rows={2}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions >
            <Button variant='contained' onClick={handleClose} >Cancel</Button>
            <Button variant='contained' onClick={() => { handleClick(nameProduct, priceProduct, typeProduct, descriptionProduct, validityProduct, quantityProduct) }}>Add</Button>
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
              {Products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.nameProduct}</TableCell>
                  <TableCell>{product.typeProduct}</TableCell>
                  <TableCell>R$ {Number(product.price).toFixed(2).replace(".", ",")}</TableCell>
                  <TableCell> {product.quantityProduct} </TableCell>
                  <TableCell > <DeleteIcon onClick={() => { handleDelete(product._id) }} sx={{ cursor: 'pointer' }} /></TableCell>
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

export default Product