import { Form, Input, Modal, InputNumber, Switch, App, Flex, Spin } from "antd";
import { useEffect, useState } from "react";
import { getPartById, updatePart } from "../../../../../../config/Api";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { fetchPartsByStructure } from "../../../../../../redux/features/examStructurePartSlice";
import type { ICauTrucDeThanhPhan } from "../../../../../../types/CauTrucDeThanhPhan";

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
    structureId: number;
    part: ICauTrucDeThanhPhan | null;
}

const UpdatePart = ({ open, setOpen, structureId, part }: Props) => {

    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const { message } = App.useApp();

    // Dùng GET /{id} để load fresh data khi mở modal
    useEffect(() => {

        if (part && open) {

            setFetching(true);

            getPartById(part.id)
                .then((res) => {

                    const data = res.data.data;

                    if (data) {

                        form.setFieldsValue({
                            note: data.note,
                            type_answer: data.type_answer,
                            order: data.order,
                            coefficient: data.coefficient,
                            is_fixed: data.is_fixed,
                            so_cau_hoi: data.so_cau_hoi,
                            total_question: data.total_question,
                            total_score: data.total_score
                        });

                    }

                })
                .catch(() => {

                    // fallback nếu GET thất bại
                    form.setFieldsValue({
                        note: part.note,
                        type_answer: part.type_answer,
                        order: part.order,
                        coefficient: part.coefficient,
                        is_fixed: part.is_fixed,
                        so_cau_hoi: part.so_cau_hoi,
                        total_question: part.total_question,
                        total_score: part.total_score
                    });

                })
                .finally(() => setFetching(false));

        }

    }, [part, open]);

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const handleSubmit = async () => {

        if (!part) return;

        try {

            const values = await form.validateFields();

            const payload = {
                ...values,
                id_cautrucde: structureId
            };

            setLoading(true);

            const res = await updatePart(part.id, payload);

            if (res.data) {

                message.success("Cập nhật thành công");

                form.resetFields();
                setOpen(false);

                dispatch(fetchPartsByStructure(structureId));

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
            title="Cập nhật cấu trúc đề thành phần"
            onCancel={handleCancel}
            onOk={handleSubmit}
            okText="Cập nhật"
            cancelText="Hủy"
            confirmLoading={loading}
        >

            <Spin spinning={fetching}>

                <Form form={form} layout="vertical">

                    <Form.Item label="Ghi chú" name="note">
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

            </Spin>

        </Modal>

    );

};

export default UpdatePart;