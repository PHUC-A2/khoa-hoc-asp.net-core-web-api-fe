import { Form, Input, InputNumber, Modal, App, Flex, Switch } from "antd";
import { useState } from "react";
import { createExamStructure } from "../../../../../../config/Api";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { fetchExamStructures } from "../../../../../../redux/features/examStructureSlice";

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
}

const CreateExamStructure = ({ open, setOpen }: Props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { message } = App.useApp();

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const handleSubmit = async () => {

        try {

            const values = await form.validateFields();

            setLoading(true);

            const res = await createExamStructure(values);

            if (res.data) {

                message.success("Tạo cấu trúc đề thành công");

                form.resetFields();
                setOpen(false);

                dispatch(fetchExamStructures(""));

            }

        } catch {

            message.error("Tạo thất bại");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Modal
            open={open}
            width={800}
            title="Thêm cấu trúc đề"
            onCancel={handleCancel}
            onOk={handleSubmit}
            okText="Tạo"
            cancelText="Hủy"
            confirmLoading={loading}
        >

            <Form form={form} layout="vertical">

                <Form.Item
                    label="Tên cấu trúc đề"
                    name="name"
                    rules={[{ required: true, message: "Bắt buộc" }]}
                >
                    <Input placeholder="Nhập tên cấu trúc đề" />
                </Form.Item>

                <Form.Item
                    label="Ghi chú"
                    name="note"
                >
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
                        <InputNumber style={{ width: "100%" }} placeholder="ID kiểu hiển thị" />
                    </Form.Item>

                    <Form.Item
                        label="Hệ"
                        name="id_he"
                        rules={[{ required: true, message: "Bắt buộc" }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber style={{ width: "100%" }} placeholder="ID hệ" />
                    </Form.Item>

                </Flex>

                <Flex gap={16}>

                    <Form.Item
                        label="Thời gian (phút)"
                        name="duration"
                        rules={[{ required: true, message: "Bắt buộc" }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber style={{ width: "100%" }} min={1} placeholder="VD: 60" />
                    </Form.Item>

                    <Form.Item
                        label="Số câu hỏi"
                        name="so_cau_hoi"
                        rules={[{ required: true, message: "Bắt buộc" }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber style={{ width: "100%" }} min={1} placeholder="VD: 40" />
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

        </Modal>

    );

};

export default CreateExamStructure;