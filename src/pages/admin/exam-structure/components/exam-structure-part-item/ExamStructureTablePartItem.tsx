import { Button, Empty, Popconfirm, Space, Table, App } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
    fetchPartSubs,
    selectPartSubs,
    selectPartSubsLoading
} from "../../../../../redux/features/examStructurePartSubSlice";
import type { ICauTrucDeThanhPhanSub } from "../../../../../types/CauTrucDeThanhPhanSub";
import { deletePartSub } from "../../../../../config/Api";
import UpdatePartSub from "./modal/UpdatePart";

interface Props {
    partId: number;
}

const ExamStructureTablePartItem = ({ partId }: Props) => {

    const dispatch = useAppDispatch();
    const data = useAppSelector(selectPartSubs);
    const loading = useAppSelector(selectPartSubsLoading);
    const { message } = App.useApp();

    const [openUpdate, setOpenUpdate] = useState(false);
    const [editingSub, setEditingSub] = useState<ICauTrucDeThanhPhanSub | null>(null);

    useEffect(() => {
        dispatch(fetchPartSubs(partId));
    }, [partId]);

    const handleEdit = (record: ICauTrucDeThanhPhanSub) => {
        setEditingSub(record);
        setOpenUpdate(true);
    };

    const handleDelete = async (id: number) => {

        try {

            await deletePartSub(id);
            message.success("Xóa thành công");
            dispatch(fetchPartSubs(partId));

        } catch {

            message.error("Xóa thất bại");

        }

    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: 70
        },
        {
            title: "Chủ đề",
            dataIndex: "ten_chude"
        },
        {
            title: "Mức độ",
            dataIndex: "ten_muc_tri_nang"
        },
        {
            title: "Nhóm câu hỏi",
            dataIndex: "id_nhomcauhoi",
            width: 130
        },
        {
            title: "Số câu",
            dataIndex: "so_cau",
            width: 90
        },
        {
            title: "Tổng câu hỏi",
            dataIndex: "total_question",
            width: 120
        },
        {
            title: "Thứ tự",
            dataIndex: "order",
            width: 90
        },
        {
            title: "Hành động",
            key: "action",
            width: 150,
            render: (_: unknown, record: ICauTrucDeThanhPhanSub) => (
                <Space>
                    <Button
                        size="small"
                        type="primary"
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </Button>

                    <Popconfirm
                        title="Bạn có chắc muốn xóa?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button size="small" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                size="small"
                bordered
                scroll={{ x: "max-content" }}
                locale={{
                    emptyText: <Empty description="Chưa có cấu trúc câu thành phần sub" />
                }}
            />

            <UpdatePartSub
                open={openUpdate}
                setOpen={setOpenUpdate}
                partId={partId}
                sub={editingSub}
            />
        </>
    );

};

export default ExamStructureTablePartItem;