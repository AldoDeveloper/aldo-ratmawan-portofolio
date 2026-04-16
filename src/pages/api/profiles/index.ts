import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ProfileRequest,
    ProfileListResponse,
    ProfileCreateResponse,
    ProfileUpdateResponse,
    ProfileDeleteResponse,
    ProfileResponse
} from "../../../../types/profile.api"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        if (method === 'GET') {
            const result = await getRequestApi<ProfileListResponse>('profile');
            return res.status(200).json(result);
        }

        if (method === 'POST') {
            const body: ProfileRequest = req.body;

            if (!body.full_name || !body.username || !body.email) {
                return res.status(400).json({
                    success: false,
                    message: 'Full name, username, and email are required'
                });
            }

            const result = await postRequestApi<ProfileCreateResponse, ProfileRequest>(
                'profile',
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
        console.error('Profile API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
