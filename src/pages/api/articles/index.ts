import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ArticleRequest,
    ArticleListResponse,
    ArticleCreateResponse,
    ArticleUpdateResponse,
    ArticleDeleteResponse,
    ArticleResponse
} from "@/types/article.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        if (method === 'GET') {
            const result = await getRequestApi<ArticleListResponse>('articles');
            return res.status(200).json(result);
        }

        if (method === 'POST') {
            const body: ArticleRequest = req.body;

            if (!body.title || !body.slug || !body.content_md) {
                return res.status(400).json({
                    success: false,
                    message: 'Title, slug, and content_md are required'
                });
            }

            const result = await postRequestApi<ArticleCreateResponse, ArticleRequest>(
                'articles',
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
        console.error('Article API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
