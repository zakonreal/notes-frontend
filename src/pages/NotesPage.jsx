import React, { useState, useEffect } from 'react';
import {
    Container, Box, Typography, Button,
    Grid, Modal, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { Add as AddIcon, FileDownload as ExportIcon } from '@mui/icons-material';
import Layout from '../components/Layout';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { noteAPI, categoryAPI } from '../services/api';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openForm, setOpenForm] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const fetchNotes = async (page = 1, filters = {}) => {
        setLoading(true);
        try {
            const params = {
                offset: (page - 1) * 10,
                limit: 10,
                ...filters
            };

            const response = await noteAPI.getAll(params);
            setNotes(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (err) {
            setError('Не удалось загрузить заметки');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data || []);
        } catch (err) {
            console.error('Ошибка загрузки категорий:', err);
        }
    };

    useEffect(() => {
        fetchNotes(page);
        fetchCategories();
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleFilterChange = (filters) => {
        fetchNotes(1, filters);
        setPage(1);
    };

    const handleCreateNote = () => {
        setCurrentNote(null);
        setOpenForm(true);
    };

    const handleEditNote = (note) => {
        setCurrentNote(note);
        setOpenForm(true);
    };

    const handleDeleteNote = async (id) => {
        try {
            await noteAPI.delete(id);
            setSnackbar({
                open: true,
                message: 'Заметка успешно удалена',
                severity: 'success'
            });
            fetchNotes(page);
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Ошибка при удалении заметки',
                severity: 'error'
            });
        }
    };

    const handleToggleComplete = async (id, completed) => {
        try {
            await noteAPI.update(id, { isCompleted: completed });
            fetchNotes(page);
        } catch (err) {
            console.error('Ошибка обновления статуса:', err);
        }
    };

    const handleSubmitNote = async (data, imageFile) => {
        try {
            if (currentNote) {
                await noteAPI.update(currentNote.id, data);
                setSnackbar({
                    open: true,
                    message: 'Заметка успешно обновлена',
                    severity: 'success'
                });
            } else {
                await noteAPI.create(data);
                setSnackbar({
                    open: true,
                    message: 'Заметка успешно создана',
                    severity: 'success'
                });
            }
            setOpenForm(false);
            fetchNotes(page);
        } catch (err) {
            setSnackbar({
                open: true,
                message: `Ошибка: ${err.response?.data?.message || 'Неизвестная ошибка'}`,
                severity: 'error'
            });
        }
    };

    const handleExportNotes = async () => {
        try {
            const response = await noteAPI.export();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'notes_export.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Ошибка при экспорте заметок',
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
                        Мои заметки
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleCreateNote}
                            sx={{ mr: 2 }}
                        >
                            Добавить
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<ExportIcon />}
                            onClick={handleExportNotes}
                        >
                            Экспорт
                        </Button>
                    </Box>
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
                    <NoteList
                        notes={notes}
                        onEdit={handleEditNote}
                        onDelete={handleDeleteNote}
                        onToggleComplete={handleToggleComplete}
                        onPageChange={handlePageChange}
                        page={page}
                        totalPages={totalPages}
                        onFilterChange={handleFilterChange}
                        categories={categories}
                    />
                )}

                <Modal
                    open={openForm}
                    onClose={() => setOpenForm(false)}
                    aria-labelledby="note-form-modal"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', md: '70%' },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <Typography variant="h5" component="h2" mb={3}>
                            {currentNote ? 'Редактирование заметки' : 'Создание новой заметки'}
                        </Typography>
                        <NoteForm
                            note={currentNote}
                            categories={categories}
                            onSubmit={handleSubmitNote}
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

export default NotesPage;