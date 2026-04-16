import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import { 
    AchievementRequest, 
    AchievementListResponse, 
    AchievementCreateResponse,
    AchievementUpdateResponse,
    AchievementDeleteResponse,
    AchievementResponse
} from "../../../../types/achievement.api"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        // GET - Fetch all achievements
        if (method === 'GET') {
            const result = await getRequestApi<AchievementListResponse>('achievements');
            return res.status(200).json(result);
        }

        // POST - Create new achievement
        if (method === 'POST') {
            const body: AchievementRequest = req.body;
            
            // Validate required fields
            if (!body.title || !body.description) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and description are required'
                });
            }

            const result = await postRequestApi<AchievementCreateResponse, AchievementRequest>(
                'achievements',
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
        console.error('Achievement API Error:', err);
        return res.status(500).json({ 
            success: false, 
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}