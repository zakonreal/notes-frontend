import React, { useState } from 'react';
import {
    TextField, Button, Grid, Box,
    FormControl, InputLabel, Select, MenuItem,
    FormControlLabel, Checkbox, Typography, Stack
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ru } from 'date-fns/locale';
import { Image as ImageIcon, Save, Cancel } from '@mui/icons-material';

const NoteForm = ({ note = null, categories = [], onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: note?.title || '',
        content: note?.content || '',
        reminder: note?.reminder ? new Date(note.reminder) : null,
        isCompleted: note?.completed || false,
        categoryId: note?.categoryId || '',
        imagePath: note?.imagePath || ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(note?.imagePath || '');

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'isCompleted' ? checked : value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            reminder: date
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setFormData(prev => ({
                ...prev,
                imagePath: file.name
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            reminder: formData.reminder ? formData.reminder.toISOString() : null
        };

        if (onSubmit) {
            onSubmit(dataToSubmit, imageFile);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Заголовок"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Содержание"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                        <DateTimePicker
                            label="Напоминание"
                            value={formData.reminder}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Категория</InputLabel>
                        <Select
                            name="categoryId"
                            value={formData.categoryId}
                            label="Категория"
                            onChange={handleChange}
                        >
                            <MenuItem value="">Без категории</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isCompleted"
                                checked={formData.isCompleted}
                                onChange={handleChange}
                                color="primary"
                            />
                        }
                        label="Завершено"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<ImageIcon />}
                            sx={{ mr: 2 }}
                        >
                            Загрузить изображение
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>
                        {previewUrl && (
                            <Typography variant="body2">
                                {formData.imagePath}
                            </Typography>
                        )}
                    </Box>

                    {previewUrl && (
                        <Box sx={{
                            width: 200,
                            height: 150,
                            border: '1px dashed grey',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            mb: 2
                        }}>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                        </Box>
                    )}
                </Grid>

                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                        >
                            {note ? 'Обновить' : 'Создать'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<Cancel />}
                            onClick={onCancel}
                        >
                            Отмена
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NoteForm;