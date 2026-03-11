export interface ICauTrucDe {
    id: number;

    id_mon: number;
    name: string;

    id_maudethi: number;

    is_dungtailieu: boolean;

    note: string | null;

    id_kieuhienthi: number;

    is_trondethi: boolean;

    duration: number;

    status: number;

    is_deleted: boolean;

    created_user_id: number;
    created_time: string;

    last_modified_user_id: number | null;
    last_modified_times: string | null;

    order: number;

    so_cau_hoi: number;

    id_he: number;
}

// CRUD

export interface ICauTrucDeCreate {
    id_mon: number;
    name: string;
    id_maudethi: number;
    is_dungtailieu: boolean;
    note: string | null;
    id_kieuhienthi: number;
    is_trondethi: boolean;
    duration: number;
    status: number;
    order: number;
    so_cau_hoi: number;
    id_he: number;
}

export interface ICauTrucDeUpdate {
    id_mon: number;
    name: string;
    id_maudethi: number;
    is_dungtailieu: boolean;
    note: string | null;
    id_kieuhienthi: number;
    is_trondethi: boolean;
    duration: number;
    status: number;
    order: number;
    so_cau_hoi: number;
    id_he: number;
}