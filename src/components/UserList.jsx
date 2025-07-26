import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Switch,
    Typography, Box, Pagination, TablePagination
} from '@mui/material';

const UserList = ({
    users,
    page,
    totalPages,
    onPageChange,
    onStatusChange
}) => {
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Логин</TableCell>
                            <TableCell>Дата регистрации</TableCell>
                            <TableCell>Роль</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.login}</TableCell>
                                <TableCell>{new Date(user.registerDate).toLocaleDateString()}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    {user.isActive ? 'Активен' : 'Неактивен'}
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={user.isActive}
                                        onChange={(e) => onStatusChange(user.id, e.target.checked)}
                                        color="primary"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {users.length === 0 && (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                    Пользователи не найдены
                </Typography>
            )}

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

export default UserList;