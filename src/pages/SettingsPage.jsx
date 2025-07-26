import React, { useState, useEffect } from 'react';
import {
    Container, Box, Typography, TextField,
    Button, Avatar, Alert, CircularProgress, Paper
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const SettingsPage = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (currentUser) {
            setFormData(prev => ({
                ...prev,
                login: currentUser.login
            }));
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setError('����� ������ � ������������� �� ���������');
            return;
        }

        if (formData.newPassword && formData.newPassword.length < 6) {
            setError('����� ������ ������ ��������� �� ����� 6 ��������');
            return;
        }

        setLoading(true);

        try {
            await userAPI.updateProfile({
                password: formData.newPassword
            });

            setSuccess('������� ������� ��������');
            setFormData(prev => ({
                ...prev,
                password: '',
                newPassword: '',
                confirmPassword: ''
            }));
        } catch (err) {
            setError(err.response?.data?.message || '������ ���������� �������');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Container maxWidth="md">
                <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                    ��������� �������
                </Typography>

                <Paper sx={{ p: 4, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Avatar sx={{ width: 80, height: 80, fontSize: 40, mr: 3 }}>
                            {currentUser?.login?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="h5">{currentUser?.login}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                ������������
                            </Typography>
                        </Box>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="login"
                            label="�����"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            disabled
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            �������� ������
                        </Typography>

                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="������� ������"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            name="newPassword"
                            label="����� ������"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            name="confirmPassword"
                            label="����������� ����� ������"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                        />

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                {success}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? <CircularProgress size={24} /> : '��������� ���������'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Layout>
    );
};

export default SettingsPage;