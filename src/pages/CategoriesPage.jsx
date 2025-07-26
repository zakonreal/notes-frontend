import React, { useState, useEffect } from 'react';
import {
    Container, Box, Typography, Button,
    Grid, Modal, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Layout from '../components/Layout';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';
import { categoryAPI } from '../services/api';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data || []);
        } catch (err) {
            setError('Не удалось загрузить категории');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreateCategory = () => {
        setCurrentCategory(null);
        setOpenForm(true);
    };

    const handleEditCategory = (category) => {
        setCurrentCategory(category);
        setOpenForm(true);
    };

    const handleDeleteCategory = async (id) => {
        try {
            await categoryAPI.delete(id);
            setSnackbar({
                open: true,
                message: 'Категория успешно удалена',
                severity: 'success'
            });
            fetchCategories();
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Ошибка при удалении категории',
                severity: 'error'
            });
        }
    };

    const handleSubmitCategory = async (data) => {
        try {
            if (currentCategory) {
                await categoryAPI.update(currentCategory.id, data);
                setSnackbar({
                    open: true,
                    message: 'Категория успешно обновлена',
                    severity: 'success'
                });
            } else {
                await categoryAPI.create(data);
                setSnackbar({
                    open: true,
                    message: 'Категория успешно создана',
                    severity: 'success'
                });
            }
            setOpenForm(false);
            fetchCategories();
        } catch (err) {
            setSnackbar({
                open: true,
                message: `Ошибка: ${err.response?.data?.message || 'Неизвестная ошибка'}`,
                severity: 'error'
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Layout>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Мои категории
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateCategory}
                    >
                        Добавить категорию
                    </Button>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                ) : (
                    <CategoryList
                        categories={categories}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                    />
                )}

                <Modal
                    open={openForm}
                    onClose={() => setOpenForm(false)}
                    aria-labelledby="category-form-modal"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', md: '600px' },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2
                    }}>
                        <Typography variant="h5" component="h2" mb={3}>
                            {currentCategory ? 'Редактирование категории' : 'Создание новой категории'}
                        </Typography>
                        <CategoryForm
                            category={currentCategory}
                            onSubmit={handleSubmitCategory}
                            onCancel={() => setOpenForm(false)}
                        />
                    </Box>
                </Modal>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Layout>
    );
};

export default CategoriesPage;