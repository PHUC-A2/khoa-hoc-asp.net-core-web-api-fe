export interface ICauTrucDeThanhPhanSub {
    id: number;

    id_cautrucde_thanhphan: number;

    id_nhomcauhoi: number;
    id_chude: number;
    id_mucdo: number;

    so_cau: number;

    order: number;

    created_user_id: number;
    created_time: string;

    last_modified_user_id: number | null;
    last_modified_times: string | null;

    ten_chude: string | null;
    ten_muc_tri_nang: string | null;

    total_question: number;
}

//  CRUD dưới

export interface ICauTrucDeThanhPhanSubCreate {
    id_cautrucde_thanhphan: number;

    id_nhomcauhoi: number;
    id_chude: number;
    id_mucdo: number;

    so_cau: number;
    order: number;
}

export interface ICauTrucDeThanhPhanSubUpdate {
    id_cautrucde_thanhphan: number;

    id_nhomcauhoi: number;
    id_chude: number;
    id_mucdo: number;

    so_cau: number;
    order: number;
}