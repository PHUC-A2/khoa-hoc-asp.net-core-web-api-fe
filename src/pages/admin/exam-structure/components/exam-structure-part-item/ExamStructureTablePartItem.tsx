import { App, Button, Empty, Popconfirm, Space, Table, type PopconfirmProps } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
    fetchPartSubs,
    selectPartSubs,
    selectPartSubsLoading
} from "../../../../../redux/features/examStructurePartSubSlice";
import type { ICauTrucDeThanhPhanSub } from "../../../../../types/CauTrucDeThanhPhanSub";
import { deletePartSub } from "../../../../../config/Api";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";

interface Props {
    partId: number;
    onEdit: (record: ICauTrucDeThanhPhanSub) => void;
}

const ExamStructureTablePartItem = ({ partId, onEdit }: Props) => {

    const dispatch = useAppDispatch();
    const data = useAppSelector(selectPartSubs);
    const loading = useAppSelector(selectPartSubsLoading);
    const { message } = App.useApp();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchPartSubs(partId));
        setSelectedId(null);
    }, [partId]);

    const cancel: PopconfirmProps["onCancel"] = () => {
        message.error("Đã bỏ chọn");
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await deletePartSub(id);
            if (res.data.statusCode === 200) {
                message.success("Xóa thành công");
                dispatch(fetchPartSubs(partId));
            }
        } catch (error: any) {
            message.error(error || "Xóa thất bại");
        }
    };

    const columns = [
        { title: "ID", dataIndex: "id", width: 70 },
        { title: "Chủ đề", dataIndex: "ten_chude" },
        { title: "Mức trí năng", dataIndex: "ten_muc_tri_nang" },
        { title: "Nhóm câu hỏi", dataIndex: "id_nhomcauhoi", width: 130 },
        { title: "Số câu", dataIndex: "so_cau", width: 90 },
        { title: "Tổng câu hỏi", dataIndex: "total_question", width: 120 },
        { title: "Thứ tự", dataIndex: "order", width: 90 },
        {
            title: "Hành động",
            key: "action",
            width: 150,
            render: (_: unknown, record: ICauTrucDeThanhPhanSub) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(record);
                        }}
                    >
                        Sửa
                    </Button>

                    <Popconfirm
                        title="Xóa cấu trúc câu thành phần sub"
                        description="Bạn có chắc chắn muốn xóa không?"
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                        placement="topLeft"
                    >
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteFilled />}
                            size="small"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            size="small"
            bordered
            scroll={{ x: "max-content" }}
            rowClassName={(record) =>
                record.id === selectedId ? "row-selected" : ""
            }
            onRow={(record) => ({
                onClick: () => setSelectedId(record.id)
            })}
            locale={{
                emptyText: <Empty description="Chưa có cấu trúc câu thành phần sub" />
            }}
        />
    );
};

export default ExamStructureTablePartItem;