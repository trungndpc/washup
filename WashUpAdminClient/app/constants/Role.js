
export const Role = {
    ADMIN : 1,
    TECHNICIAN : 2,
    CRM : 3,
    OPERATOR : 4
}

export function findRole(listPermission) {
    return listPermission[0];
}