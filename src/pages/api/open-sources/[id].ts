import { deleteRequestApi, getRequestApi, patchRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    OpenSourceRequest,
    OpenSourceDetailResponse,
    OpenSourceUpdateResponse,
    OpenSourceDeleteResponse
} from "../../../../types/opensource.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'OpenSource ID is required'
        });
    }

    try {
        if (method === 'GET') {
            const result = await getRequestApi<OpenSourceDetailResponse>(`open-sources/${id}`);
            return res.status(200).json(result);
        }

        if (method === 'PUT' || method === 'PATCH') {
            const body: OpenSourceRequest = req.body;

            if (!body.project_name) {
                return res.status(400).json({
                    success: false,
                    message: 'Project name is required'
                });
            }

            const result = await patchRequestApi<OpenSourceUpdateResponse, OpenSourceRequest>(
                `open-sources/${id}`,
                undefined,
                body
            );
            return res.status(200).json(result);
        }

        if (method === 'DELETE') {
            const result = await deleteRequestApi<OpenSourceDeleteResponse, {}>(
                `open-sources/${id}`
            );
            return res.status(200).json(result);
        }

        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });

    } catch (err: any) {
        console.error('OpenSource API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
