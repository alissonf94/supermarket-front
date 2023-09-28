import {
    Box, Button, Card, Container, Grid, IconButton, InputAdornment,
    TextField, Typography
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react'

const SettingUser = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
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
            <Card>
                <Box component="form" n onSubmit={handleSubmit} sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="Typographyen-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
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
                            <Typography>
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
        </Container>
    )
}

export default SettingUser