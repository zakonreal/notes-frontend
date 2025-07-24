// src/pages/DashboardPage.jsx
import React from 'react';
import {
    Box, Container, Typography, Grid,
    Card, CardContent, Paper, Stack,
    LinearProgress, Button, Divider
} from '@mui/material';
import {
    Notes as NotesIcon,
    Category as CategoryIcon,
    CheckCircle as CheckCircleIcon,
    NotificationsActive as RemindersIcon,
    BarChart as StatsIcon
} from '@mui/icons-material';
import Layout from '../components/Layout';

const DashboardPage = () => {
    const stats = [
        { title: 'Всего заметок', value: 42, icon: <NotesIcon fontSize="large" />, color: 'primary' },
        { title: 'Категории', value: 7, icon: <CategoryIcon fontSize="large" />, color: 'secondary' },
        { title: 'Выполнено', value: 28, icon: <CheckCircleIcon fontSize="large" />, color: 'success' },
        { title: 'Напоминания', value: 5, icon: <RemindersIcon fontSize="large" />, color: 'warning' },
    ];

    const recentNotes = [
        { id: 1, title: 'Завершить проект', category: 'Работа', date: '2025-07-25', progress: 75 },
        { id: 2, title: 'Купить продукты', category: 'Покупки', date: '2025-07-26', progress: 30 },
        { id: 3, title: 'Идея для приложения', category: 'Идеи', date: '2025-07-27', progress: 10 },
    ];

    return (
        <Layout>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                    Панель управления
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {stats.map((stat, index) => (
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

                                <Stack spacing={2}>
                                    {recentNotes.map((note) => (
                                        <Paper key={note.id} sx={{ p: 2 }} variant="outlined">
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {note.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {note.date}
                                                </Typography>
                                            </Box>

                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {note.category}
                                            </Typography>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={note.progress}
                                                    sx={{ flexGrow: 1, height: 8 }}
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    {note.progress}%
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    ))}
                                </Stack>

                                <Button
                                    fullWidth
                                    variant="text"
                                    sx={{ mt: 2 }}
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

                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                    <Box sx={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: '50%',
                                        backgroundColor: 'primary.light',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <StatsIcon sx={{ fontSize: 80, color: 'primary.dark' }} />
                                    </Box>
                                </Box>

                                <Stack spacing={1} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>Выполненные</Typography>
                                        <Typography fontWeight="bold">28</Typography>
                                    </Box>
                                    <Divider />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>Активные</Typography>
                                        <Typography fontWeight="bold">14</Typography>
                                    </Box>
                                    <Divider />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>С напоминаниями</Typography>
                                        <Typography fontWeight="bold">5</Typography>
                                    </Box>
                                    <Divider />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>С изображениями</Typography>
                                        <Typography fontWeight="bold">8</Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default DashboardPage;