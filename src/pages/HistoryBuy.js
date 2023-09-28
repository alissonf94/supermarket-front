import { Box, Card, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

function createData(id, price, quantity) {
    return { id, price, quantity };
}

const rows = [
    createData(
        1,
        15,
        3
    ),
    createData(
        2,
        7,
        2
    ),
    createData(
        3,
        25.50,
        1
    ),
    createData(
        4,
        25.50,
        3
    ),
    createData(
        4,
        25.50,
        3
    ),

];


export const HistoryBuy = () => {
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
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>R$ {Number(row.price).toFixed(2).replace(".", ",")}</TableCell>
                                    <TableCell >{row.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </Grid>
        </Box>
    );
}