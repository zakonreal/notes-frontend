import React, { useEffect, useState } from 'react';
import {
    Box, Container, Typography, Grid,
    Card, CardContent, LinearProgress, Button, Divider
} from '@mui/material';
import {
    Notes as NotesIcon,
    Category as CategoryIcon,
    CheckCircle as CheckCircleIcon,
    NotificationsActive as RemindersIcon
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { noteAPI } from '../services/api';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [recentNotes, setRecentNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // В реальном приложении здесь будут запросы к API
                // Для демонстрации используем mock-данные

                // Статистика
                setStats({
                    totalNotes: 42,
                    categories: 7,
                    completed: 28,
                    reminders: 5
                });

                // Последние заметки
                const notesResponse = await noteAPI.getAll({
                    offset: 0,
                    limit: 5
                });

                setRecentNotes(notesResponse.data.content || []);

            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Layout>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                        Загрузка данных...
                    </Typography>
                    <LinearProgress />
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                    Панель управления
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[
                        { title: 'Всего заметок', value: stats.totalNotes, icon: <NotesIcon fontSize="large" />, color: 'primary' },
                        { title: 'Категории', value: stats.categories, icon: <CategoryIcon fontSize="large" />, color: 'secondary' },
                        { title: 'Выполнено', value: stats.completed, icon: <CheckCircleIcon fontSize="large" />, color: 'success' },
                        { title: 'Напоминания', value: stats.reminders, icon: <RemindersIcon fontSize="large" />, color: 'warning' },
                    ].map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: `${stat.color}.light`,
                                color: `${stat.color}.dark`
                            }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h6" component="div">
                                            {stat.title}
                                        </Typography>
                                        <Box sx={{ color: 'inherit' }}>
                                            {stat.icon}
                                        </Box>
                                    </Box>
                                    <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                                        {stat.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                                    Последние заметки
                                </Typography>

                                {recentNotes.map((note) => (
                                    <Box key={note.id} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {note.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {new Date(note.createdDate).toLocaleDateString()}
                                            </Typography>
                                        </Box>

                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {note.category?.title || 'Без категории'}
                                        </Typography>

                                        <Typography variant="body2" paragraph>
                                            {note.content?.substring(0, 100)}...
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={note.completed ? 100 : 30}
                                                sx={{ flexGrow: 1, height: 8 }}
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                {note.completed ? '100%' : '30%'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}

                                <Button
                                    fullWidth
                                    variant="text"
                                    sx={{ mt: 2 }}
                                    href="/notes"
                                >
                                    Показать все заметки
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                                    Статистика
                                </Typography>

                                <Box sx={{
                                    width: '100%',
                                    height: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'grey.100',
                                    borderRadius: 2,
                                    mb: 3
                                }}>
                                    <Typography variant="body1" color="text.secondary">
                                        График статистики
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 2
                                }}>
                                    <Box>
                                        <Typography variant="body2">Заметок всего</Typography>
                                        <Typography variant="h6" fontWeight="bold">{stats.totalNotes}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2">Выполнено</Typography>
                                        <Typography variant="h6" fontWeight="bold">{stats.completed}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2">С напоминаниями</Typography>
                                        <Typography variant="h6" fontWeight="bold">{stats.reminders}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2">Категорий</Typography>
                                        <Typography variant="h6" fontWeight="bold">{stats.categories}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default DashboardPage;