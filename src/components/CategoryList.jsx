import React from 'react';
import {
    List, ListItem, ListItemText, IconButton,
    Box, Typography, Divider, Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const CategoryList = ({
    categories,
    onEdit,
    onDelete
}) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                ��� ���������
            </Typography>

            <List sx={{ bgcolor: 'background.paper' }}>
                {categories.map((category) => (
                    <React.Fragment key={category.id}>
                        <ListItem
                            secondaryAction={
                                <Box>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => onEdit(category)}
                                        sx={{ mr: 1 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => onDelete(category.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemText
                                primary={category.title}
                                secondary={`�������: ${category.notesCount}`}
                            />
                            <Chip
                                label={category.notesCount}
                                size="small"
                                sx={{ ml: 2 }}
                            />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                ))}
            </List>

            {categories.length === 0 && (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                    � ��� ���� ��� ���������
                </Typography>
            )}
        </Box>
    );
};

export default CategoryList;