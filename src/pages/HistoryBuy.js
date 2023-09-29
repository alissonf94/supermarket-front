import { Box, Card, Grid, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider } from "@mui/material";
import buyService from "../services/BuyService"
import * as React from 'react';

export const HistoryBuy = () => {
    const [buys, setBuys] = React.useState([])

    async function getBuysClient() {
        const getBuys = await buyService.getBuysByIdClient()
        const data = await getBuys.json()
        setBuys(data)
        
      }
      React.useEffect(() => {
        getBuysClient()
      })
      

    return (
    
        <Box sx={{ py: 1 }} maxWidth="97%"  >
            <Grid container spacing={4}
                sx={{
                    display: 'flex', flexDirection: 'column',
                    margin: '2px', alignItems: 'right'
                }} gap="40px">

                <Card>
                    <Table >
                        <TableHead sx={{ fontSize: 45 }}>
                            <TableRow >
                                <TableCell>ID</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity items</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buys.map((buy) => (
                                <TableRow key={buy._id}>
                                    <TableCell>{buy._id}</TableCell>
                                    <TableCell>R$ {Number(buy.valueBuy).toFixed(2).replace(".", ",")}</TableCell>
                                    <TableCell>{buy.items.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </Grid>
        </Box>
    );
}