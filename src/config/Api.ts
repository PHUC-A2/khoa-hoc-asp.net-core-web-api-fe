// =========================================================
// FILE Api.ts ĐẦY ĐỦ SAU KHI THÊM:
// =========================================================

import axios from "axios";
import type { IBackendRes, IModelPaginate } from "../types/common";
import type { ICauTrucDe } from "../types/CauTrucDe";
import type { ICauTrucDeThanhPhan, ICauTrucDeThanhPhanCreate, ICauTrucDeThanhPhanUpdate } from "../types/CauTrucDeThanhPhan";
import type { ICauTrucDeThanhPhanSub, ICauTrucDeThanhPhanSubCreate, ICauTrucDeThanhPhanSubUpdate } from "../types/CauTrucDeThanhPhanSub";

// ================== CAU TRUC DE ==================

export const getAllExamStructures = (query: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe?${query}`;
    return axios.get<IBackendRes<IModelPaginate<ICauTrucDe>>>(url);
};

// ================== PART ==================

export const getExamStructurePartsByStructure = (structureId: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan/by-cautrucde/${structureId}`;
    return axios.get<IBackendRes<ICauTrucDeThanhPhan[]>>(url);
};

export const getPartById = (id: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan/${id}`;
    return axios.get<IBackendRes<ICauTrucDeThanhPhan>>(url);
};

export const createPart = (data: ICauTrucDeThanhPhanCreate) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan`;
    return axios.post<IBackendRes<ICauTrucDeThanhPhan>>(url, data);
};

export const updatePart = (id: number, data: ICauTrucDeThanhPhanUpdate) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan/${id}`;
    return axios.put<IBackendRes<ICauTrucDeThanhPhan>>(url, data);
};

export const deletePart = (id: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan/${id}`;
    return axios.delete<IBackendRes<any>>(url);
};

// ================== SUB ==================

export const getPartSubsByPart = (partId: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub/by-thanhphan/${partId}`;
    return axios.get<IBackendRes<ICauTrucDeThanhPhanSub[]>>(url);
};

export const getPartSubById = (id: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub/${id}`;
    return axios.get<IBackendRes<ICauTrucDeThanhPhanSub>>(url);
};

export const createPartSub = (data: ICauTrucDeThanhPhanSubCreate) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub`;
    return axios.post<IBackendRes<ICauTrucDeThanhPhanSub>>(url, data);
};

export const updatePartSub = (id: number, data: ICauTrucDeThanhPhanSubUpdate) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub/${id}`;
    return axios.put<IBackendRes<ICauTrucDeThanhPhanSub>>(url, data);
};

export const deletePartSub = (id: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub/${id}`;
    return axios.delete<IBackendRes<any>>(url);
};