import { deleteRequestApi, getRequestApi, patchRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ProfileRequest,
    ProfileDetailResponse,
    ProfileUpdateResponse,
    ProfileDeleteResponse
} from "../../../../types/profile.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Profile ID is required'
        });
    }

    try {
        if (method === 'GET') {
            const result = await getRequestApi<ProfileDetailResponse>(`profile/${id}`);
            return res.status(200).json(result);
        }

        if (method === 'PUT' || method === 'PATCH') {
            const body: ProfileRequest = req.body;

            if (!body.full_name || !body.username || !body.email) {
                return res.status(400).json({
                    success: false,
                    message: 'Full name, username, and email are required'
                });
            }

            const result = await patchRequestApi<ProfileUpdateResponse, ProfileRequest>(
                `profile/${id}`,
                undefined,
                body
            );
            return res.status(200).json(result);
        }

        if (method === 'DELETE') {
            const result = await deleteRequestApi<ProfileDeleteResponse, {}>(
                `profile/${id}`
            );
            return res.status(200).json(result);
        }

        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });

    } catch (err: any) {
        console.error('Profile API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
