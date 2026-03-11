import { App, Button, Drawer, Empty, Popconfirm, Space, Table, type PopconfirmProps } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import {
    fetchDeletedExamStructures,
    fetchExamStructures,
    selectDeletedExamStructures,
    selectDeletedExamStructureLoading
} from "../../../../../../redux/features/examStructureSlice";
import type { ICauTrucDe } from "../../../../../../types/CauTrucDe";
import { hardDeleteExamStructure, restoreExamStructure } from "../../../../../../config/Api";
import { DeleteFilled, UndoOutlined } from "@ant-design/icons";

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
}

const DeletedExamStructureDrawer = ({ open, setOpen }: Props) => {

    const dispatch = useAppDispatch();
    const data = useAppSelector(selectDeletedExamStructures);
    const loading = useAppSelector(selectDeletedExamStructureLoading);
    const { message, modal } = App.useApp();

    useEffect(() => {

        if (open) {
            dispatch(fetchDeletedExamStructures());
        }

    }, [open]);

    const handleRestore = async (id: number) => {

        try {

            const res = await restoreExamStructure(id);

            if (res.data.statusCode === 200) {

                message.success("Khôi phục thành công");

                dispatch(fetchDeletedExamStructures());
                dispatch(fetchExamStructures(""));

            }

        } catch (error: any) {

            message.error(error?.response?.data?.message || "Khôi phục thất bại");

        }

    };

    const handleHardDelete = (id: number) => {

        modal.confirm({
            title: "Xóa vĩnh viễn",
            content: "Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa vĩnh viễn không?",
            okText: "Xóa vĩnh viễn",
            okType: "danger",
            cancelText: "Hủy",
            onOk: async () => {

                try {

                    const res = await hardDeleteExamStructure(id);

                    if (res.data.statusCode === 200) {

                        message.success("Đã xóa vĩnh viễn");
                        dispatch(fetchDeletedExamStructures());

                    }

                } catch (error: any) {

                    message.error(error?.response?.data?.message || "Xóa vĩnh viễn thất bại");

                }

            }
        });

    };

    const cancel: PopconfirmProps["onCancel"] = () => {
        message.error("Đã bỏ chọn");
    };

    const columns = [
        { title: "ID", dataIndex: "id", width: 70 },
        { title: "Tên cấu trúc đề", dataIndex: "name" },
        { title: "Mã mẫu đề", dataIndex: "id_maudethi", width: 110 },
        {
            title: "Thời gian (phút)",
            dataIndex: "duration",
            width: 130
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 100,
            render: (v: number) => (v === 1 ? "Hoạt động" : "Ngưng")
        },
        {
            title: "Hành động",
            key: "action",
            width: 180,
            render: (_: unknown, record: ICauTrucDe) => (
                <Space>
                    <Popconfirm
                        title="Khôi phục cấu trúc đề"
                        description="Bạn có chắc chắn muốn khôi phục không?"
                        onConfirm={() => handleRestore(record.id)}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                        placement="topLeft"
                    >
                        <Button
                            type="primary"
                            icon={<UndoOutlined />}
                            size="small"
                        >
                            Khôi phục
                        </Button>
                    </Popconfirm>

                    <Button
                        type="primary"
                        danger
                        icon={<DeleteFilled />}
                        size="small"
                        onClick={() => handleHardDelete(record.id)}
                    >
                        Xóa vĩnh viễn
                    </Button>
                </Space>
            )
        }
    ];

    return (

        <Drawer
            title="Danh sách cấu trúc đề đã xóa"
            open={open}
            onClose={() => setOpen(false)}
            width={900}
        >

            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                size="small"
                bordered
                scroll={{ x: "max-content" }}
                locale={{
                    emptyText: <Empty description="Không có cấu trúc đề nào đã xóa" />
                }}
            />

        </Drawer>

    );

};

export default DeletedExamStructureDrawer;