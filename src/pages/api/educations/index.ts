import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    EducationRequest,
    EducationListResponse,
    EducationCreateResponse,
    EducationUpdateResponse,
    EducationDeleteResponse,
    EducationResponse
} from "@/types/education.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        // GET - Fetch all educations
        if (method === 'GET') {
            const result = await getRequestApi<EducationListResponse>('educations');
            return res.status(200).json(result);
        }

        // POST - Create new education
        if (method === 'POST') {
            const body: EducationRequest = req.body;

            // Validate required fields
            if (!body.institution_name || !body.education_level) {
                return res.status(400).json({
                    success: false,
                    message: 'Institution name and education level are required'
                });
            }

            const result = await postRequestApi<EducationCreateResponse, EducationRequest>(
                'educations',
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
        console.error('Education API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
