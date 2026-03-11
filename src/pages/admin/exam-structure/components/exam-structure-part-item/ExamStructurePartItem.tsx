import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { RiResetRightLine } from "react-icons/ri";
import ExamStructureTablePartItem from "./ExamStructureTablePartItem";
import CreatePartSub from "./modal/CreatePartSub";
import type { ICauTrucDeThanhPhanSub } from "../../../../../types/CauTrucDeThanhPhanSub";
import { useAppDispatch } from "../../../../../redux/hooks";
import { fetchPartSubs } from "../../../../../redux/features/examStructurePartSubSlice";
import UpdatePartSub from "./modal/UpdatePart";

interface Props {
    partId: number;
}

const ExamStructurePartItem = ({ partId }: Props) => {

    const dispatch = useAppDispatch();
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [editingSub, setEditingSub] = useState<ICauTrucDeThanhPhanSub | null>(null);

    const handleEdit = (sub: ICauTrucDeThanhPhanSub) => {
        setEditingSub(sub);
        setOpenUpdate(true);
    };

    const handleReset = () => {
        dispatch(fetchPartSubs(partId));
    };

    return (
        <>
            <Card
                title="Cấu trúc đề thành phần sub"
                style={{ marginTop: 16 }}
                extra={
                    <>
                        <Button
                            type="default"
                            style={{ marginRight: 8 }}
                            onClick={handleReset}
                        >
                            <RiResetRightLine />
                        </Button>

                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setOpenCreate(true)}
                        >
                            Thêm mới
                        </Button>
                    </>
                }
            >
                <ExamStructureTablePartItem
                    partId={partId}
                    onEdit={handleEdit}
                />
            </Card>

            <CreatePartSub
                open={openCreate}
                setOpen={setOpenCreate}
                partId={partId}
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

export default ExamStructurePartItem;