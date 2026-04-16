import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ProjectListResponse,
    ProjectCreateResponse,
    ProjectRequest,
} from "../../../../types/project.api"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        if (method === 'GET') {
            const result = await getRequestApi<ProjectListResponse>('projects');
            return res.status(200).json(result);
        }

        if (method === 'POST') {
            const body: ProjectRequest = req.body;

            if (!body.title || !body.slug) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and slug are required'
                });
            }

            const result = await postRequestApi<ProjectCreateResponse, ProjectRequest>(
                'projects',
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
        console.error('projects API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
