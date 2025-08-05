export const mergeClassName = (val1: string, val2?: string) => {
    return val1 + " " + (val2 || "")
}

export const getStatusClass = (status: string): string => {
    switch (status) {
        case "win":
            return "bg-green-400";
        case "lost":
            return "bg-red-400";
        case "canceled":
            return "bg-yellow-400";
        default:
            return "";
    }
}

export const getTypeClass = (type: string): string => {
    switch (type) {
        case "win":
            return "bg-green-400";
        case "cancel":
            return "bg-red-400";
        case "bet":
            return "bg-yellow-400";
        default:
            return "";
    }
}