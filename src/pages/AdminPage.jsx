import React, { useState, useEffect } from 'react';
import {
    Container, Box, Typography, CircularProgress,
    Alert, Button, TextField, Grid, Paper
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import Layout from '../components/Layout';
import UserList from '../components/UserList';
import { userAPI } from '../services/api';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                offset: (page - 1) * 10,
                limit: 10,
                search: searchTerm
            };

            const response = await userAPI.getAll(params);
            setUsers(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (err) {
            setError('Не удалось загрузить пользователей');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            fetchUsers(1);
        }
    };

    const handleSearchSubmit = () => {
        fetchUsers(1);
        setPage(1);
    };

    const handleStatusChange = async (userId, isActive) => {
        try {
            await userAPI.setActiveStatus({
                userId,
                isActive
            });
            fetchUsers(page);
        } catch (err) {
            console.error('Ошибка обновления статуса:', err);
        }
    };

    return (
        <Layout>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Управление пользователями
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={() => fetchUsers(page)}
                    >
                        Обновить
                    </Button>
                </Box>

                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Поиск пользователей"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleSearchSubmit}
                            sx={{ height: '56px' }}
                        >
                            Найти
                        </Button>
                    </Grid>
                </Grid>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                ) : (
                    <Paper sx={{ p: 2 }}>
                        <UserList
                            users={users}
                            page={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            onStatusChange={handleStatusChange}
                        />
                    </Paper>
                )}
            </Container>
        </Layout>
    );
};

export default AdminPage;