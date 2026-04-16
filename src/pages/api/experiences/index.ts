import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ExperienceRequest,
    ExperienceListResponse,
    ExperienceCreateResponse
} from "../../../../types/experience.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        // GET - Fetch all experiences
        if (method === 'GET') {
            const result = await getRequestApi<ExperienceListResponse>('experiences');
            return res.status(200).json(result);
        }

        // POST - Create new experience
        if (method === 'POST') {
            const body: ExperienceRequest = req.body;

            // Validate required fields
            if (!body.company_name || !body.position) {
                return res.status(400).json({
                    success: false,
                    message: 'Company name and position are required'
                });
            }

            const result = await postRequestApi<ExperienceCreateResponse, ExperienceRequest>(
                'experiences',
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
        console.error('Experience API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
