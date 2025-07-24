// src/pages/NotesPage.jsx
import React, { useState } from 'react';
import {
    Box, Container, Typography, Button,
    Grid, Card, CardContent, CardActions,
    TextField, MenuItem, IconButton,
    FormControl, InputLabel, Select,
    Checkbox, FormControlLabel, Pagination
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    Notifications as NotificationsIcon,
    Image as ImageIcon
} from '@mui/icons-material';
import Layout from '../components/Layout';

const NotesPage = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    const categories = [
        { id: 1, name: 'Работа' },
        { id: 2, name: 'Личное' },
        { id: 3, name: 'Покупки' },
        { id: 4, name: 'Идеи' },
    ];

    const notes = [
        {
            id: 1,
            title: 'Завершить проект',
            content: 'Доработать ТЗ и отправить клиенту',
            category: 'Работа',
            createdDate: '2025-07-20',
            reminder: '2025-07-25T18:00:00',
            completed: false,
            image: null
        },
        {
            id: 2,
            title: 'Купить подарок',
            content: 'Купить подарок на день рождения',
            category: 'Личное',
            createdDate: '2025-07-22',
            reminder: null,
            completed: true,
            image: 'gift.jpg'
        },
        {
            id: 3,
            title: 'Молоко',
            content: 'Купить молоко и хлеб',
            category: 'Покупки',
            createdDate: '2025-07-23',
            reminder: null,
            completed: false,
            image: null
        },
        {
            id: 4,
            title: 'Идея для приложения',
            content: 'Разработать систему управления задачами с интеграцией календаря',
            category: 'Идеи',
            createdDate: '2025-07-24',
            reminder: '2025-08-01T10:00:00',
            completed: false,
            image: 'idea.jpg'
        },
    ];

    const handleAddNote = () => {
        console.log('Добавить новую заметку');
    };

    const handleEditNote = (id) => {
        console.log(`Редактировать заметку ${id}`);
    };

    const handleDeleteNote = (id) => {
        console.log(`Удалить заметку ${id}`);
    };

    const handleToggleComplete = (id) => {
        console.log(`Переключить статус заметки ${id}`);
    };

    const handleExportNotes = () => {
        console.log('Экспортировать заметки');
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
                            onClick={handleAddNote}
                            sx={{ mr: 2 }}
                        >
                            Добавить
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleExportNotes}
                        >
                            Экспорт
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', mb: 4, gap: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Поиск заметок..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                        }}
                    />
                    <IconButton
                        color="primary"
                        onClick={() => setFilterOpen(!filterOpen)}
                        sx={{ border: '1px solid', borderColor: 'divider' }}
                    >
                        <FilterIcon />
                    </IconButton>
                </Box>

                {filterOpen && (
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 4,
                        p: 2,
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 1
                    }}>
                        <FormControl sx={{ minWidth: 150 }} size="small">
                            <InputLabel>Категория</InputLabel>
                            <Select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                label="Категория"
                            >
                                <MenuItem value="">Все</MenuItem>
                                {categories.map(category => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 150 }} size="small">
                            <InputLabel>Статус</InputLabel>
                            <Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                label="Статус"
                            >
                                <MenuItem value="all">Все</MenuItem>
                                <MenuItem value="completed">Выполненные</MenuItem>
                                <MenuItem value="active">Активные</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 150 }} size="small">
                            <InputLabel>Сортировка</InputLabel>
                            <Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                label="Сортировка"
                            >
                                <MenuItem value="newest">Сначала новые</MenuItem>
                                <MenuItem value="oldest">Сначала старые</MenuItem>
                                <MenuItem value="title">По названию</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                )}

                <Grid container spacing={3}>
                    {notes.map(note => (
                        <Grid item xs={12} sm={6} md={4} key={note.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            {note.category}
                                        </Typography>
                                        <Box>
                                            {note.reminder && (
                                                <NotificationsIcon
                                                    fontSize="small"
                                                    color="primary"
                                                    sx={{ mr: 1 }}
                                                />
                                            )}
                                            <CheckCircleIcon
                                                fontSize="small"
                                                color={note.completed ? 'success' : 'disabled'}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                                        {note.title}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {note.createdDate}
                                    </Typography>

                                    <Typography variant="body1" paragraph>
                                        {note.content}
                                    </Typography>

                                    {note.image && (
                                        <Box sx={{
                                            height: 100,
                                            backgroundColor: 'grey.100',
                                            borderRadius: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 2
                                        }}>
                                            <ImageIcon color="action" />
                                        </Box>
                                    )}

                                    {note.reminder && (
                                        <Typography variant="body2" color="primary">
                                            Напоминание: {new Date(note.reminder).toLocaleString()}
                                        </Typography>
                                    )}
                                </CardContent>

                                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={note.completed}
                                                onChange={() => handleToggleComplete(note.id)}
                                            />
                                        }
                                        label={note.completed ? "Выполнено" : "Выполнить"}
                                    />
                                    <Box>
                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => handleEditNote(note.id)}
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleDeleteNote(note.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination count={5} color="primary" />
                </Box>
            </Container>
        </Layout>
    );
};

export default NotesPage;