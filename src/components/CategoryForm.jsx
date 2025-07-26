import React, { useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';

const CategoryForm = ({ category = null, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(category?.title || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ title });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                fullWidth
                label="Название категории"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ mb: 3 }}
            />

            <Stack direction="row" spacing={2}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                >
                    {category ? 'Обновить' : 'Создать'}
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
        </Box>
    );
};

export default CategoryForm;