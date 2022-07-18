import axios from 'axios'

export type GetRequest = (url: string) => Promise<Result>

export type Result = { status: 'ok' | 'error', data?: any, error?: any }

export const getRequest: GetRequest = async (url: string) => {
    try {
        const { data } = await axios.get(url)
        return {status:'ok',data}
    } catch (error) {
        return {status:'error',error}
    }
}