import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { RiResetRightLine } from "react-icons/ri";
import { DeleteFilled } from "@ant-design/icons";
import ExamStructureTable from "./ExamStructureTable";
import ExamStructurePart from "../exam-structure-part/ExamStructurePart";

import { useAppDispatch } from "../../../../../redux/hooks";
import { fetchExamStructures } from "../../../../../redux/features/examStructureSlice";
import type { ICauTrucDe } from "../../../../../types/CauTrucDe";
import CreateExamStructure from "./modal/CreateExamStructure";
import UpdateExamStructure from "./modal/UpdateExamStructure";
import DeletedExamStructureDrawer from "./modal/DeletedExamStructureDrawer";

const ExamStructure = () => {

    const dispatch = useAppDispatch();
    const [selectedStructure, setSelectedStructure] = useState<ICauTrucDe | null>(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDeleted, setOpenDeleted] = useState(false);
    const [editingStructure, setEditingStructure] = useState<ICauTrucDe | null>(null);

    useEffect(() => {
        dispatch(fetchExamStructures(""));
    }, []);

    const handleEdit = (structure: ICauTrucDe) => {
        setEditingStructure(structure);
        setOpenUpdate(true);
    };

    const handleReset = () => {
        setSelectedStructure(null);
    };

    return (
        <>
            <Card
                title="Cấu trúc đề"
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
                            type="default"
                            danger
                            icon={<DeleteFilled />}
                            style={{ marginRight: 8 }}
                            onClick={() => setOpenDeleted(true)}
                        >
                            Đã xóa
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
                style={{ marginBottom: 16 }}
            >
                <ExamStructureTable
                    onSelect={setSelectedStructure}
                    onEdit={handleEdit}
                />
            </Card>

            {selectedStructure && (
                <ExamStructurePart structureId={selectedStructure.id} />
            )}

            <CreateExamStructure
                open={openCreate}
                setOpen={setOpenCreate}
            />

            <UpdateExamStructure
                open={openUpdate}
                setOpen={setOpenUpdate}
                structure={editingStructure}
            />

            <DeletedExamStructureDrawer
                open={openDeleted}
                setOpen={setOpenDeleted}
            />
        </>
    );

};

export default ExamStructure;