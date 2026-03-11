import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import ExamStructureTablePartItem from "./ExamStructureTablePartItem";
import CreatePartSub from "./modal/CreatePartSub";

interface Props {
    partId: number;
}

const ExamStructurePartItem = ({ partId }: Props) => {

    const [openCreate, setOpenCreate] = useState(false);

    return (
        <>
            <Card
                title="Cấu trúc câu thành phần sub"
                style={{ marginTop: 16 }}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setOpenCreate(true)}
                    >
                        Thêm mới
                    </Button>
                }
            >
                <ExamStructureTablePartItem partId={partId} />
            </Card>

            <CreatePartSub
                open={openCreate}
                setOpen={setOpenCreate}
                partId={partId}
            />
        </>
    );

};

export default ExamStructurePartItem;