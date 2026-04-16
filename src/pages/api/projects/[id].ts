import { deleteRequestApi, getRequestApi, patchRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ProjectDeleteResponse,
    ProjectDetailResponse,
    ProjectRequest,
    ProjectUpdateResponse
    
} from "../../../../types/project.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'projects ID is required'
        });
    }

    try {
        if (method === 'GET') {
            const result = await getRequestApi<ProjectDetailResponse>(`projects/${id}`);
            return res.status(200).json(result);
        }

        if (method === 'PUT' || method === 'PATCH') {
            const body: ProjectRequest = req.body;

            if (!body.title || !body.slug) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and slug are required'
                });
            }

            const result = await patchRequestApi<ProjectUpdateResponse, ProjectRequest>(
                `projects/${id}`,
                undefined,
                body
            );
            return res.status(200).json(result);
        }

        if (method === 'DELETE') {
            const result = await deleteRequestApi<ProjectDeleteResponse, {}>(
                `projects/${id}`
            );
            return res.status(200).json(result);
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
