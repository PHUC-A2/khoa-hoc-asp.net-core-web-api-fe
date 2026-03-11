import { Form, Input, Modal, InputNumber, Switch, App, Flex } from "antd";
import { useState } from "react";
import { createPart } from "../../../../../../config/Api";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { fetchPartsByStructure } from "../../../../../../redux/features/examStructurePartSlice";

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
    structureId: number;
}

const CreatePart = ({
    open,
    setOpen,
    structureId
}: Props) => {

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
                id_cautrucde: structureId
            };

            setLoading(true);

            const res = await createPart(payload);

            if (res.data) {

                message.success("Tạo thành phần thành công");

                form.resetFields();
                setOpen(false);

                dispatch(fetchPartsByStructure(structureId));

            }

        } catch (error) {

            message.error("Tạo thất bại");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Modal
            open={open}
            width={800}
            title="Thêm cấu trúc đề thành phần"
            onCancel={handleCancel}
            onOk={handleSubmit}
            okText="Tạo"
            cancelText="Hủy"
            confirmLoading={loading}
        >

            <Form
                form={form}
                layout="vertical"
            >

                <Form.Item
                    label="Ghi chú"
                    name="note"
                >
                    <Input placeholder="Nhập ghi chú (nếu có)" />
                </Form.Item>

                <Flex gap={16}>

                    <Form.Item
                        label="Loại trả lời"
                        name="type_answer"
                        rules={[{ required: true }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            placeholder="VD: 1 = Trắc nghiệm, 2 = Tự luận"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Thứ tự"
                        name="order"
                        rules={[{ required: true }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            placeholder="VD: 1, 2, 3..."
                        />
                    </Form.Item>

                </Flex>

                <Flex gap={16}>

                    <Form.Item
                        label="Hệ số"
                        name="coefficient"
                        rules={[{ required: true }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            step={0.1}
                            placeholder="VD: 1.0, 1.5, 2.0"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Cố định"
                        name="is_fixed"
                        valuePropName="checked"
                        style={{ flex: 1 }}
                    >
                        <Switch />
                    </Form.Item>

                </Flex>

                <Flex gap={16}>

                    <Form.Item
                        label="Số câu hỏi"
                        name="so_cau_hoi"
                        rules={[{ required: true }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            placeholder="Nhập số câu hỏi"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tổng câu"
                        name="total_question"
                        rules={[{ required: true }]}
                        style={{ flex: 1 }}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            placeholder="Tổng số câu trong đề"
                        />
                    </Form.Item>

                </Flex>

                <Form.Item
                    label="Tổng điểm"
                    name="total_score"
                    rules={[{ required: true }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="VD: 10.0"
                    />
                </Form.Item>

            </Form>

        </Modal>

    );

};

export default CreatePart;