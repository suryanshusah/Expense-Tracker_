export const BASE_URL = "http://localhost:8000";

//. Utils/apiPaths.js
export const API_PATHS = {
    AUTH:{
        LOGIN :"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getUser"
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard"
    },
    INCOME:{
        GET_ALL_INCOME:"/api/v1/income/get",
        ADD_INCOME:"/api/v1/income/add",
        DELETE_INCOME:"/api/v1/income/:id",
        DOWNLOAD_INCOME:"/api/v1/income/download"
    },
    EXPENSE:{
        ADD_EXPENSE:"/api/v1/expense/add",
        GET_ALL_EXPENSES:"/api/v1/expense/get",
        DELETE_EXPENSE:"/api/v1/expense/:id",
        DOWNLOAD_EXPENSE:"/api/v1/expense/download"
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image"
    }
}