import React, { useState } from 'react';
import {
    Box, Card, CardContent, CardActions,
    Typography, IconButton, Grid,
    FormControlLabel, Checkbox, Pagination,
    TextField, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Notifications as NotificationsIcon,
    Image as ImageIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const NoteList = ({
    notes,
    onEdit,
    onDelete,
    onToggleComplete,
    onPageChange,
    page,
    totalPages,
    onFilterChange,
    categories
}) => {
    const [filters, setFilters] = useState({
        categoryId: '',
        isCompleted: '',
        sortBy: 'newest'
    });

    const handleFilterChange = (name, value) => {
        const newFilters = {
            ...filters,
            [name]: value
        };
        setFilters(newFilters);
        if (onFilterChange) {
            onFilterChange(newFilters);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel>Категория</InputLabel>
                    <Select
                        value={filters.categoryId}
                        onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                        label="Категория"
                    >
                        <MenuItem value="">Все</MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel>Статус</InputLabel>
                    <Select
                        value={filters.isCompleted}
                        onChange={(e) => handleFilterChange('isCompleted', e.target.value)}
                        label="Статус"
                    >
                        <MenuItem value="">Все</MenuItem>
                        <MenuItem value="true">Завершённые</MenuItem>
                        <MenuItem value="false">Активные</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel>Сортировка</InputLabel>
                    <Select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        label="Сортировка"
                    >
                        <MenuItem value="newest">Сначала новые</MenuItem>
                        <MenuItem value="oldest">Сначала старые</MenuItem>
                        <MenuItem value="title">По названию</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={3}>
                {notes.map(note => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {note.category?.title || 'Без категории'}
                                    </Typography>
                                    <Box>
                                        {note.reminder && (
                                            <NotificationsIcon
                                                fontSize="small"
                                                color="primary"
                                                sx={{ mr: 1 }}
                                            />
                                        )}
                                    </Box>
                                </Box>

                                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                                    {note.title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {format(new Date(note.createdDate), 'dd MMMM yyyy', { locale: ru })}
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    {note.content}
                                </Typography>

                                {note.imagePath && (
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
                                        Напоминание: {format(new Date(note.reminder), 'dd.MM.yyyy HH:mm')}
                                    </Typography>
                                )}
                            </CardContent>

                            <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={note.completed}
                                            onChange={() => onToggleComplete(note.id, !note.completed)}
                                        />
                                    }
                                    label={note.completed ? "Выполнено" : "Выполнить"}
                                />
                                <Box>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => onEdit(note)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => onDelete(note.id)}
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

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => onPageChange(value)}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
};

export default NoteList;