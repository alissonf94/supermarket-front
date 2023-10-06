import {
    Box, Button, Card, Container, Grid, IconButton, InputAdornment,
    TextField, Typography
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react'
import clientService from "../services/ClientService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingUser = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password === confirmPassword) {
            console.log({
                email: event.target.email.value,
                newPassword: event.target.newPassword.value,
            });
        }
        else {
            console.log("Senhas incompativeis")
        }

        const data = {
            "name": event.target.name.value,
            "email": event.target.email.value,
            "password": event.target.newPassword.value
        }
        
        const response = await clientService.updateClient(data)
        
        let result = await response.json()

        toast(result.message)
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const newStrength = calculatePasswordStrength(newPassword);
        setStrength(newStrength);
    };
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const calculatePasswordStrength = (newPassword) => {
        let score = 0;

        if (newPassword.length >= 6) {
            score++;
        }

        if (/[A-Z]/.test(newPassword)) {
            score++;
        }
        if (/[0-9]/.test(newPassword)) {
            score++;
        }
        if (/[a-z]/.test(newPassword)) {
            score++;
        }

        return score;
    };

    const getPasswordStrengthText = (strength) => {
        if (strength <= 1) {
            return 'Weak';
        } else if (strength <= 3) {
            return 'Moderate';
        } else {
            return 'Strong';
        }
    };
    return (
        <Container component="main" maxWidth="md">
            <Card sx={{ padding: '20px' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="Typographyen-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                color="secondary"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                color="secondary"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
                                color="secondary"
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="new-password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="newPassword"
                                label="New Password"
                                id="newPassword"
                                color="secondary"
                                autoComplete="new-password"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePasswordVisibility}
                                                onMouseDown={(e) => {
                                                    handleMouseDownPassword(e);
                                                    handleTogglePasswordVisibility();
                                                }}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: '10px' }}>
                                <h4>Strong Password:</h4>
                                {getPasswordStrengthText(strength)}
                            </Typography>
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Confirm
                    </Button>

                </Box>
            </Card>
            <ToastContainer />
        </Container>
    )
}

export default SettingUser