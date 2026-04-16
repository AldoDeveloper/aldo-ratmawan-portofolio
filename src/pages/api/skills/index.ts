import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    SkillCreateResponse,
    SkillListResponse,
    SkillRequest,
} from "../../../../types/skill.api"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        if (method === 'GET') {
            const result = await getRequestApi<SkillListResponse>('skills');
            return res.status(200).json(result);
        }

        if (method === 'POST') {
            const body: SkillRequest = req.body;

            // if (!body.title || !body.icon) {
            //     return res.status(400).json({
            //         success: false,
            //         message: 'Title and icon are required'
            //     });
            // }

            const result = await postRequestApi<SkillCreateResponse, SkillRequest>(
                'skills',
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
        console.error('skills API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
