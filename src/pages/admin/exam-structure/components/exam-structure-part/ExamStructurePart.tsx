import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ExamStructureTablePart from "./ExamStructureTablePart";
import ExamStructurePartItem from "../exam-structure-part-item/ExamStructurePartItem";
import type { ICauTrucDeThanhPhan } from "../../../../../types/CauTrucDeThanhPhan";
import { RiResetRightLine } from "react-icons/ri";
import CreatePart from "./modal/CreatePart";
import UpdatePart from "./modal/UpdatePart";

interface Props {
    structureId: number;
}

const ExamStructurePart = ({ structureId }: Props) => {

    const [selectedPart, setSelectedPart] = useState<ICauTrucDeThanhPhan | null>(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [editingPart, setEditingPart] = useState<ICauTrucDeThanhPhan | null>(null);

    const handleEdit = (part: ICauTrucDeThanhPhan) => {
        setEditingPart(part);
        setOpenUpdate(true);
    };

    const handleReset = () => {
        setSelectedPart(null);
    };

    useEffect(() => {
        setSelectedPart(null);
    }, [structureId]);

    return (
        <>
            <Card
                title="Cấu trúc câu thành phần"
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
                <ExamStructureTablePart
                    structureId={structureId}
                    onSelect={setSelectedPart}
                    onEdit={handleEdit}
                />
            </Card>

            {selectedPart && (
                <ExamStructurePartItem
                    partId={selectedPart.id}
                />
            )}

            <CreatePart
                open={openCreate}
                setOpen={setOpenCreate}
                structureId={structureId}
            />

            <UpdatePart
                open={openUpdate}
                setOpen={setOpenUpdate}
                structureId={structureId}
                part={editingPart}
            />
        </>
    );
};

export default ExamStructurePart;