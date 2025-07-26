import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем интерцептор для автоматической вставки токена
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
};

export const noteAPI = {
    getAll: (params) => api.post('/notes/list', params),
    create: (data) => api.post('/notes', data),
    update: (id, data) => api.put(`/notes/${id}`, data),
    delete: (id) => api.delete(`/notes/${id}`),
    export: () => api.get('/export/excel', { responseType: 'blob' }),
};

export const categoryAPI = {
    getAll: () => api.get('/categories/list'),
    create: (data) => api.post('/categories', data),
    update: (id, data) => api.put(`/categories/${id}`, data),
};

export const userAPI = {
    getProfile: () => api.get('/users'),
    updateProfile: (data) => api.put('/users', data),
    getAll: (params) => api.post('/admin/users/list', params),
    setActiveStatus: (data) => api.post('/admin/user/activate', data),
};

export const imageAPI = {
    upload: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export default api;