import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ExpertiseRequest,
    ExpertiseListResponse,
    ExpertiseCreateResponse,
    ExpertiseUpdateResponse,
    ExpertiseDeleteResponse,
    ExpertiseResponse
} from "@/types/expertise.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        // GET - Fetch all expertise items
        if (method === 'GET') {
            const result = await getRequestApi<ExpertiseListResponse>('expertise');
            return res.status(200).json(result);
        }

        // POST - Create new expertise item
        if (method === 'POST') {
            const body: ExpertiseRequest = req.body;

            // Validate required fields
            if (!body.title || !body.description) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and description are required'
                });
            }

            const result = await postRequestApi<ExpertiseCreateResponse, ExpertiseRequest>(
                'expertise',
                undefined,
                body
            );
            return res.status(201).json(result);
        }

        // Method not allowed
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });

    } catch (err: any) {
        console.error('Expertise API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
