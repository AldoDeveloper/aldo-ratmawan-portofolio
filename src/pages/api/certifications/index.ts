import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    CertificationRequest,
    CertificationListResponse,
    CertificationCreateResponse,
    CertificationUpdateResponse,
    CertificationDeleteResponse,
    CertificationResponse
} from "@/types/certification.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        // GET - Fetch all certifications
        if (method === 'GET') {
            const result = await getRequestApi<CertificationListResponse>('certifications');
            return res.status(200).json(result);
        }

        // POST - Create new certification
        if (method === 'POST') {
            const body: CertificationRequest = req.body;

            // Validate required fields
            if (!body.name || !body.issuer) {
                return res.status(400).json({
                    success: false,
                    message: 'Name and issuer are required'
                });
            }

            const result = await postRequestApi<CertificationCreateResponse, CertificationRequest>(
                'certifications',
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
        console.error('Certification API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
