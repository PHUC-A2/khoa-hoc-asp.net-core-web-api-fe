import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ExamStructureTable from "./ExamStructureTable";
import ExamStructurePart from "../exam-structure-part/ExamStructurePart";
import { useAppDispatch } from "../../../../../redux/hooks";
import { fetchExamStructures } from "../../../../../redux/features/examStructureSlice";
import type { ICauTrucDe } from "../../../../../types/CauTrucDe";
import { RiResetRightLine } from "react-icons/ri";

const ExamStructure = () => {

    const [selectedStructure, setSelectedStructure] = useState<ICauTrucDe | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchExamStructures(""));
    }, [])

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

                        <Button type="primary" icon={<PlusOutlined />}>
                            Thêm mới
                        </Button>
                   </>
                  
                }
                style={{ marginBottom: 16 }}
            >
                <ExamStructureTable onSelect={setSelectedStructure} />
            </Card>

            {selectedStructure && (
                <ExamStructurePart structureId={selectedStructure.id} />
            )}
        </>
    );
};

export default ExamStructure;