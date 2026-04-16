import { deleteRequestApi, getRequestApi, patchRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ExperienceRequest,
    ExperienceDetailResponse,
    ExperienceUpdateResponse,
    ExperienceDeleteResponse
} from "../../../../types/experience.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Experience ID is required'
        });
    }

    try {
        // GET - Fetch single experience by ID
        if (method === 'GET') {
            const result = await getRequestApi<ExperienceDetailResponse>(`experiences/${id}`);
            return res.status(200).json(result);
        }

        // PUT/PATCH - Update experience
        if (method === 'PUT' || method === 'PATCH') {
            const body: ExperienceRequest = req.body;

            // Validate required fields
            if (!body.company_name || !body.position) {
                return res.status(400).json({
                    success: false,
                    message: 'Company name and position are required'
                });
            }

            const result = await patchRequestApi<ExperienceUpdateResponse, ExperienceRequest>(
                `experiences/${id}`,
                undefined,
                body
            );
            return res.status(200).json(result);
        }

        // DELETE - Delete experience
        if (method === 'DELETE') {
            const result = await deleteRequestApi<ExperienceDeleteResponse, {}>(
                `experiences/${id}`
            );
            return res.status(200).json(result);
        }

        // Method not allowed
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });

    } catch (err: any) {
        console.error('Experience API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
