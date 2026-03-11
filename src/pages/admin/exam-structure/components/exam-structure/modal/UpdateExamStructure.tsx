import { Form, Input, InputNumber, Modal, App, Flex, Switch, Spin } from "antd";
import { useEffect, useState } from "react";
import { getExamStructureById, updateExamStructure } from "../../../../../../config/Api";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { fetchExamStructures } from "../../../../../../redux/features/examStructureSlice";
import type { ICauTrucDe } from "../../../../../../types/CauTrucDe";

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
    structure: ICauTrucDe | null;
}

const UpdateExamStructure = ({ open, setOpen, structure }: Props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const dispatch = useAppDispatch();
    const { message } = App.useApp();

    useEffect(() => {

        if (structure && open) {

            setFetching(true);

            getExamStructureById(structure.id)
                .then((res) => {

                    const data = res.data.data;

                    if (data) {

                        form.setFieldsValue({
                            name: data.name,
                            note: data.note,
                            id_mon: data.id_mon,
                            id_maudethi: data.id_maudethi,
                            id_kieuhienthi: data.id_kieuhienthi,
                            id_he: data.id_he,
                            duration: data.duration,
                            so_cau_hoi: data.so_cau_hoi,
                            order: data.order,
                            status: data.status,
                            is_dungtailieu: data.is_dungtailieu,
                            is_trondethi: data.is_trondethi
                        });

                    }

                })
                .catch(() => {

                    form.setFieldsValue({
                        name: structure.name,
                        note: structure.note,
                        id_mon: structure.id_mon,
                        id_maudethi: structure.id_maudethi,
                        id_kieuhienthi: structure.id_kieuhienthi,
                        id_he: structure.id_he,
                        duration: structure.duration,
                        so_cau_hoi: structure.so_cau_hoi,
                        order: structure.order,
                        status: structure.status,
                        is_dungtailieu: structure.is_dungtailieu,
                        is_trondethi: structure.is_trondethi
                    });

                })
                .finally(() => setFetching(false));

        }

    }, [structure, open]);

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const handleSubmit = async () => {

        if (!structure) return;

        try {

            const values = await form.validateFields();

            setLoading(true);

            const res = await updateExamStructure(structure.id, values);

            if (res.data) {

                message.success("Cập nhật cấu trúc đề thành công");

                form.resetFields();
                setOpen(false);

                dispatch(fetchExamStructures(""));

            }

        } catch (error: any) {

            console.log(error?.response?.data);
            message.error("Cập nhật thất bại");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Modal
            open={open}
            width={800}
            title="Cập nhật cấu trúc đề"
            onCancel={handleCancel}
            onOk={handleSubmit}
            okText="Cập nhật"
            cancelText="Hủy"
            confirmLoading={loading}
        >

            <Spin spinning={fetching}>

                <Form form={form} layout="vertical">

                    <Form.Item
                        label="Tên cấu trúc đề"
                        name="name"
                        rules={[{ required: true, message: "Bắt buộc" }]}
                    >
                        <Input placeholder="Nhập tên cấu trúc đề" />
                    </Form.Item>

                    <Form.Item label="Ghi chú" name="note">
                        <Input placeholder="Nhập ghi chú (nếu có)" />
                    </Form.Item>

                    <Flex gap={16}>

                        <Form.Item
                            label="Mã môn học"
                            name="id_mon"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber style={{ width: "100%" }} placeholder="ID môn học" />
                        </Form.Item>

                        <Form.Item
                            label="Mã mẫu đề"
                            name="id_maudethi"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber style={{ width: "100%" }} placeholder="ID mẫu đề" />
                        </Form.Item>

                        <Form.Item
                            label="Kiểu hiển thị"
                            name="id_kieuhienthi"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Hệ"
                            name="id_he"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>

                    </Flex>

                    <Flex gap={16}>

                        <Form.Item
                            label="Thời gian (phút)"
                            name="duration"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber style={{ width: "100%" }} min={1} />
                        </Form.Item>

                        <Form.Item
                            label="Số câu hỏi"
                            name="so_cau_hoi"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber style={{ width: "100%" }} min={1} />
                        </Form.Item>

                        <Form.Item
                            label="Thứ tự"
                            name="order"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber style={{ width: "100%" }} min={0} />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber style={{ width: "100%" }} placeholder="1 = Hoạt động, 0 = Ngưng" />
                        </Form.Item>

                    </Flex>

                    <Flex gap={32}>

                        <Form.Item
                            label="Sử dụng tài liệu"
                            name="is_dungtailieu"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>

                        <Form.Item
                            label="Trộn đề"
                            name="is_trondethi"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>

                    </Flex>

                </Form>

            </Spin>

        </Modal>

    );

};

export default UpdateExamStructure;