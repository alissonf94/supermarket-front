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
import httpservices from '../services/httpServices';
import RemovelineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddlineIcon from '@mui/icons-material/AddCircleOutline';

// Generate Order Data
function createData(id, validity, product, typeProduct, price, description, quantity) {
  return { id, validity, product, typeProduct, price, description, quantity };
}

export const rows =

  [createData(
    1,
    '11/12/2023',
    'Ceral Matinal',
    'Cereal',
    15,
    '500g',
    3
  ),
  createData(
    2,
    '15/02/2024',
    'Feijao tropeiro',
    'Feijao',
    7,
    '1kg',
    2
  ),
  createData(
    3,
    '24/09/2023',
    'Colchao Mole',
    'Carne',
    25.50,
    '1kg',
    1
  ),
  createData(
    4,
    '24/01/2024',
    'Macarrao',
    'Massa',
    25.50,
    '1kg',
    3
  ),
  createData(
    4,
    '24/01/2024',
    'Macarrao',
    'Massa',
    25.50,
    '1kg',
    3
  ),

  ];


export const ShoppingList = () => {
  const [items, setItems] = React.useState([])

  async function handleDelete(itemId) {
    await httpservices.deleteItemCard(itemId)
    console.log('tetete');
  }
  async function handleLess(itemId) {
    //funcao para adicionar mais uma quantidade
  }
  async function handleAdd(itemId) {
    //funcao para remover uma qunatitade
  }

  async function getShoppingCard() {
    const shoppingCard = await httpservices.getShoppingCard()

    const data = await shoppingCard.json()

    setItems(data.items)
  }

  let somaPrice = 0;

  for (const item of items) {
    somaPrice += item.valueItem
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
                  <TableCell>R$ {Number(item.valueItem).toFixed(2).replace(".", ",")}</TableCell>
                  <TableCell ><RemovelineIcon onClick={() => {handleLess(item._id)}}/> {item.quantity} <AddlineIcon onClick={() => {handleAdd(item._id)}}/></TableCell>
                  <TableCell > <DeleteIcon onClick={() => { handleDelete(item._id) }} sx={{ cursor: 'pointer' }} /></TableCell>
                  <TableCell> R$ { Number((item.valueItem * item.quantity)).toFixed(2).replace(".", ",")} </TableCell>
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
              <Button variant="outlined" >Comprar</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Box>
  );
}
