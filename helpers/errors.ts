import { NextApiResponse } from "next"

export function generateUnauthorizedError(res: NextApiResponse<{ message: string }>, message?: string) {
    res.status(401).json({ message: message ?? "Unauthorized" })
    return false
}


export const grabErrorFromBadResponse = (errorResponse: any) => {

    if (!errorResponse) return "No response"
    if (typeof errorResponse.message == "string") return errorResponse.message
    try {
        const objError = errorResponse.response.data
        if (typeof objError.message.message == "string") return objError.message.message
        if (typeof objError.message.error == "string") return objError.message.error
        if (objError.message.response) return JSON.stringify(objError.message.response)
    } catch (e) {
        return "Error parsing response"

    }

}


export function generateInvalidError(res: NextApiResponse<{ message: string }>, message?: string) {
    res.status(400).json({
        message: message ?? 'Invalid request'
    });
    return false
}