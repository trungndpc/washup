
export const Role = {
    ADMIN : 1,
    TECHNICIAN : 2,
    CRM : 3,
    OPERATOR : 4
}

export function findRole(listPermission) {
    return listPermission[0];
}

export function findRoleEnum(roleId) {
    if (roleId == 1) {
        return "Admin";
    }
    if (roleId == 2) {
        return "Nhân viên";
    }
    if (roleId == 3) {
        return "CRM";
    }
    if (roleId == 4) {
        return "Vận Hành";
    }
}