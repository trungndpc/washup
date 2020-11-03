export const OrginOrder = {
    WEB : 1,
    ADMIN : 2,
    MOBILE: 3
}

export function findOriginOrder(originId) {
    if (originId == 1) {
        return "Web"
    }
    if (originId == 2) {
        return "Admin"
    }
    if (originId == 3) {
        return "Mobile"
    }
}