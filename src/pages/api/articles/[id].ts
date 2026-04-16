import { deleteRequestApi, getRequestApi, patchRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ArticleRequest,
    ArticleDetailResponse,
    ArticleUpdateResponse,
    ArticleDeleteResponse
} from "../../../../types/article.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Article ID is required'
        });
    }

    try {
        if (method === 'GET') {
            const result = await getRequestApi<ArticleDetailResponse>(`articles/${id}`);
            return res.status(200).json(result);
        }

        if (method === 'PUT' || method === 'PATCH') {
            const body: ArticleRequest = req.body;

            if (!body.title || !body.slug || !body.content_md) {
                return res.status(400).json({
                    success: false,
                    message: 'Title, slug, and content_md are required'
                });
            }

            const result = await patchRequestApi<ArticleUpdateResponse, ArticleRequest>(
                `articles/${id}`,
                undefined,
                body
            );
            return res.status(200).json(result);
        }

        if (method === 'DELETE') {
            const result = await deleteRequestApi<ArticleDeleteResponse, {}>(
                `articles/${id}`
            );
            return res.status(200).json(result);
        }

        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });

    } catch (err: any) {
        console.error('Article API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
