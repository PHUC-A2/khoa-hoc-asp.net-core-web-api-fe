import axios from "axios";
import type { IBackendRes, IModelPaginate } from "../types/common";
import type { ICauTrucDe, ICauTrucDeCreate, ICauTrucDeUpdate } from "../types/CauTrucDe";
import type { ICauTrucDeThanhPhan, ICauTrucDeThanhPhanCreate, ICauTrucDeThanhPhanUpdate } from "../types/CauTrucDeThanhPhan";
import type { ICauTrucDeThanhPhanSub, ICauTrucDeThanhPhanSubCreate, ICauTrucDeThanhPhanSubUpdate } from "../types/CauTrucDeThanhPhanSub";

const BASE = import.meta.env.VITE_BACKEND_URL;

// ================== CAU TRUC DE ==================

export const getAllExamStructures = (query: string) =>
    axios.get<IBackendRes<IModelPaginate<ICauTrucDe>>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe?${query}`
    );

export const getExamStructureById = (id: number) =>
    axios.get<IBackendRes<ICauTrucDe>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe/${id}`
    );

export const createExamStructure = (data: ICauTrucDeCreate) =>
    axios.post<IBackendRes<ICauTrucDe>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe`,
        data
    );

export const updateExamStructure = (id: number, data: ICauTrucDeUpdate) =>
    axios.put<IBackendRes<ICauTrucDe>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe/${id}`,
        data
    );

export const deleteExamStructure = (id: number) =>
    axios.delete<IBackendRes<null>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe/${id}`
    );

export const getDeletedExamStructures = () =>
    axios.get<IBackendRes<ICauTrucDe[]>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe/deleted`
    );

export const restoreExamStructure = (id: number) =>
    axios.put<IBackendRes<null>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe/restore/${id}`
    );

export const hardDeleteExamStructure = (id: number) =>
    axios.delete<IBackendRes<null>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe/hard-delete/${id}`
    );

// ================== PART ==================

export const getExamStructurePartsByStructure = (structureId: number) =>
    axios.get<IBackendRes<ICauTrucDeThanhPhan[]>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan/by-cautrucde/${structureId}`
    );

export const getPartById = (id: number) =>
    axios.get<IBackendRes<ICauTrucDeThanhPhan>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan/${id}`
    );

export const createPart = (data: ICauTrucDeThanhPhanCreate) =>
    axios.post<IBackendRes<ICauTrucDeThanhPhan>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan`,
        data
    );

export const updatePart = (id: number, data: ICauTrucDeThanhPhanUpdate) =>
    axios.put<IBackendRes<ICauTrucDeThanhPhan>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan/${id}`,
        data
    );

export const deletePart = (id: number) =>
    axios.delete<IBackendRes<any>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan/${id}`
    );

// ================== SUB ==================

export const getPartSubsByPart = (partId: number) =>
    axios.get<IBackendRes<ICauTrucDeThanhPhanSub[]>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub/by-thanhphan/${partId}`
    );

export const getPartSubById = (id: number) =>
    axios.get<IBackendRes<ICauTrucDeThanhPhanSub>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub/${id}`
    );

export const createPartSub = (data: ICauTrucDeThanhPhanSubCreate) =>
    axios.post<IBackendRes<ICauTrucDeThanhPhanSub>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub`,
        data
    );

export const updatePartSub = (id: number, data: ICauTrucDeThanhPhanSubUpdate) =>
    axios.put<IBackendRes<ICauTrucDeThanhPhanSub>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub/${id}`,
        data
    );

export const deletePartSub = (id: number) =>
    axios.delete<IBackendRes<any>>(
        `${BASE}/api/v1/admin/AdminSMT_CauTrucDe_ThanhPhan_Sub/${id}`
    );