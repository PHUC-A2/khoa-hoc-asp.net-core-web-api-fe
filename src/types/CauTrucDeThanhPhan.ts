import type { ICauTrucDeThanhPhanSub } from "./CauTrucDeThanhPhanSub";

export interface ICauTrucDeThanhPhan {
    id: number;
    id_cautrucde: number;

    note: string | null;

    type_answer: number;
    order: number;

    coefficient: number;

    is_fixed: boolean;

    created_user_id: number;
    created_time: string;

    last_modified_user_id: number | null;
    last_modified_times: string | null;

    so_cau_hoi: number;
    total_question: number;

    total_score: number;

    subs?: ICauTrucDeThanhPhanSub[];
}


//  CRUD Dưới

export interface ICauTrucDeThanhPhanCreate {
    id_cautrucde: number;
    note: string | null;

    type_answer: number;
    order: number;

    coefficient: number;

    is_fixed: boolean;

    so_cau_hoi: number;
    total_question: number;
    total_score: number;
}

export interface ICauTrucDeThanhPhanUpdate {
    id_cautrucde: number;
    note: string | null;

    type_answer: number;
    order: number;

    coefficient: number;

    is_fixed: boolean;

    so_cau_hoi: number;
    total_question: number;
    total_score: number;
}