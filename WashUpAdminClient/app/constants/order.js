import { RFC_2822 } from "moment";

export const Status = {
    PENDING : {
        value : 1,
        toString : "Chờ duyệt",
    },
    CONFIRMED: {
        value: 2,
        toString: "Đã duyệt"
    },
    PROCESSING: {
        value: 3,
        toString: "Đang xử lý"
    },
    CANCELED: {
        value: 4,
        toString: "Đã hủy"
    },
    COMPLETED: {
        value: 3,
        toString: "Thành công"
    },
}

export function findStatus(id) {
    switch(id) {
        case 1: return Status.PENDING;
        case 2: return Status.CONFIRMED;
        case 3: return  Status.PROCESSING;
        case 4: return Status.CANCELED;
        case 5: return Status.COMPLETED
    }
}