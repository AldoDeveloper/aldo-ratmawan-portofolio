import { deleteRequestApi, getRequestApi, patchRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    EducationRequest,
    EducationDetailResponse,
    EducationUpdateResponse,
    EducationDeleteResponse
} from "../../../../types/education.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Education ID is required'
        });
    }

    try {
        // GET - Fetch single education by ID
        if (method === 'GET') {
            const result = await getRequestApi<EducationDetailResponse>(`educations/${id}`);
            return res.status(200).json(result);
        }

        // PUT/PATCH - Update education
        if (method === 'PUT' || method === 'PATCH') {
            const body: EducationRequest = req.body;

            // Validate required fields
            if (!body.institution_name || !body.education_level) {
                return res.status(400).json({
                    success: false,
                    message: 'Institution name and education level are required'
                });
            }

            const result = await patchRequestApi<EducationUpdateResponse, EducationRequest>(
                `educations/${id}`,
                undefined,
                body
            );
            return res.status(200).json(result);
        }

        // DELETE - Delete education
        if (method === 'DELETE') {
            const result = await deleteRequestApi<EducationDeleteResponse, {}>(
                `educations/${id}`
            );
            return res.status(200).json(result);
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
