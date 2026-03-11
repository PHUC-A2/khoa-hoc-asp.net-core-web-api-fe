import { Form, Input, InputNumber, Modal, App, Flex } from "antd";
import { useState } from "react";
import { createPartSub } from "../../../../../../config/Api";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { fetchPartSubs } from "../../../../../../redux/features/examStructurePartSubSlice";

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
    partId: number;
}

const CreatePartSub = ({ open, setOpen, partId }: Props) => {

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

            const payload = {
                ...values,
                id_cautrucde_thanhphan: partId
            };

            setLoading(true);

            const res = await createPartSub(payload);

            if (res.data) {

                message.success("Tạo thành phần sub thành công");

                form.resetFields();
                setOpen(false);

                dispatch(fetchPartSubs(partId));

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
            width={750}
            title="Thêm cấu trúc câu thành phần sub"
            onCancel={handleCancel}
            onOk={handleSubmit}
            okText="Tạo"
            cancelText="Hủy"
            confirmLoading={loading}
        >

            <Form form={form} layout="vertical">

                <Flex gap={16}>

                    <Form.Item
                        label="Nhóm câu hỏi"
                        name="id_nhomcauhoi"
                        rules={[{ required: true, message: "Bắt buộc" }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber style={{ width: "100%" }} placeholder="ID nhóm câu hỏi" />
                    </Form.Item>

                    <Form.Item
                        label="Chủ đề"
                        name="id_chude"
                        rules={[{ required: true, message: "Bắt buộc" }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber style={{ width: "100%" }} placeholder="ID chủ đề" />
                    </Form.Item>

                    <Form.Item
                        label="Mức độ"
                        name="id_mucdo"
                        rules={[{ required: true, message: "Bắt buộc" }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber style={{ width: "100%" }} placeholder="ID mức độ" />
                    </Form.Item>

                </Flex>

                <Flex gap={16}>

                    <Form.Item
                        label="Tên chủ đề"
                        name="ten_chude"
                        style={{ flex: 1 }}
                    >
                        <Input placeholder="Nhập tên chủ đề" />
                    </Form.Item>

                    <Form.Item
                        label="Tên mức trí năng"
                        name="ten_muc_tri_nang"
                        style={{ flex: 1 }}
                    >
                        <Input placeholder="Nhập tên mức trí năng" />
                    </Form.Item>

                </Flex>

                <Flex gap={16}>

                    <Form.Item
                        label="Số câu"
                        name="so_cau"
                        rules={[{ required: true, message: "Bắt buộc" }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber style={{ width: "100%" }} min={1} />
                    </Form.Item>

                    <Form.Item
                        label="Tổng câu hỏi"
                        name="total_question"
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
                        <InputNumber style={{ width: "100%" }} min={1} />
                    </Form.Item>

                </Flex>

            </Form>

        </Modal>

    );

};

export default CreatePartSub;