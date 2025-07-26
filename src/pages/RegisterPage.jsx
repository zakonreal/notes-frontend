import React, { useState } from 'react';
import {
    Container, Box, Typography, TextField,
    Button, Link, Grid, Alert, Paper
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const [registerData, setRegisterData] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            setError('������ �� ���������');
            return;
        }

        if (registerData.password.length < 6) {
            setError('������ ������ ��������� �� ����� 6 ��������');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await register({
                login: registerData.login,
                password: registerData.password
            });
            navigate('/dashboard');
        } catch (err) {
            setError('������ �����������. ��������, ������������ ��� ����������.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <PersonAddIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                    <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
                        �����������
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        �������� ����� �������
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="�����"
                        name="login"
                        autoComplete="username"
                        autoFocus
                        value={registerData.login}
                        onChange={handleChange}
                        variant="outlined"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="������"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={registerData.password}
                        onChange={handleChange}
                        variant="outlined"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="����������� ������"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={registerData.confirmPassword}
                        onChange={handleChange}
                        variant="outlined"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        {loading ? '�����������...' : '������������������'}
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                ��� ���� �������? �������
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;