export const Status = {
    PENDING : {
        value : 1,
        toString : "Chờ duyệt",
        color: "#449d44"
    },
    CONFIRMED: {
        value: 2,
        toString: "Đã duyệt",
        color : '#FFC107'
    },
    PROCESSING: {
        value: 3,
        toString: "Đang xử lý",
        color: "#f8901f"
    },
    CANCELED: {
        value: 4,
        toString: "Đã hủy",
        color: "red"
    },
    COMPLETED: {
        value: 5,
        toString: "Thành công",
        color: "#449d44"
    },
    ERROR: {
        value : 0,
        toString: "Lỗi",
        color: "red"
    },
    EMP_ASSIGNED: {
        value: 6,
        toString: "Đã phân công",
        color: '#8BC34A'
    },
    EMP_ACCEPTED: {
        value: 7,
        toString: "Nhân viên chấp nhận"
    },
    EMP_REJECT: {
        value: 8,
        toString: "Nhân viên từ chối"
    }

}

export function findStatus(id) {
    switch(id) {
        case 1: return Status.PENDING;
        case 2: return Status.CONFIRMED;
        case 3: return  Status.PROCESSING;
        case 4: return Status.CANCELED;
        case 5: return Status.COMPLETED;
        case 6: return Status.PROCESSING;
        case 7: return Status.PROCESSING;
        case 8: return Status.PROCESSING;
        default: return Status.ERROR
    }
}