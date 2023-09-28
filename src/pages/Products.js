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
/*import Link from '@mui/material/Link';
 import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'; */

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];



export default function Products() {
  /* const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; */
  return (
    <>
      <CssBaseline />
      <main>
        {/*  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: "20px" }}>
            <Button onClick={handleClickOpen} variant='contained' sx={{ bgcolor: 'primary.main' }} >New Product</Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>New Product</DialogTitle>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="typePdoduct"
                      label="Type Product"
                      type="text"
                      fullWidth
                      variant="outlined"
                      color="secondary"
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
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="validity"
                      label="Validity"
                      type="text"
                      fullWidth
                      variant="outlined"
                      color="secondary"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="desciption"
                      label="Desciption"
                      type="text"
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      multiline
                      rows={2}
                    />

                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions >
                <Button variant='contained' onClick={handleClose} >Cancel</Button>
                <Button variant='contained' onClick={handleClose}>Add</Button>
              </DialogActions>
            </Dialog>
          </Box> */}
        <Container sx={{ py: 3 }} maxWidth="lg">
          <Box>
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
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
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to describe the
                        content.
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>

                      <Button variant="contained" size="small">Add</Button>
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