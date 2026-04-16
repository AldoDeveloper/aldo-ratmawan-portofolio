import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    OpenSourceRequest,
    OpenSourceListResponse,
    OpenSourceCreateResponse,
    OpenSourceUpdateResponse,
    OpenSourceDeleteResponse,
    OpenSourceResponse
} from "@/types/opensource.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        if (method === 'GET') {
            const result = await getRequestApi<OpenSourceListResponse>('open-sources');
            return res.status(200).json(result);
        }

        if (method === 'POST') {
            const body: OpenSourceRequest = req.body;

            if (!body.project_name) {
                return res.status(400).json({
                    success: false,
                    message: 'Project name is required'
                });
            }

            const result = await postRequestApi<OpenSourceCreateResponse, OpenSourceRequest>(
                'open-sources',
                undefined,
                body
            );
            return res.status(201).json(result);
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
