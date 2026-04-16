import { deleteRequestApi, getRequestApi, patchRequestApi, postRequestApi } from "@/utils/request.api.context";
import { NextApiRequest, NextApiResponse } from "next";
import {
    ContactFormRequest,
    ContactFormListResponse,
    ContactFormCreateResponse
} from "../../../../types/contactForm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const method = req.method;

    try {
        // GET - Fetch all contact-form
        if (method === 'GET') {
            const result = await getRequestApi<ContactFormListResponse>('contact-form');
            return res.status(200).json(result);
        }

        // POST - Create new contact
        if (method === 'POST') {
            const body: ContactFormRequest = req.body;

            // Validate required fields
            // if (!body.type || !body.url || !body.label) {
            //     return res.status(400).json({
            //         success: false,
            //         message: 'Type, url, and label are required'
            //     });
            // }

            const result = await postRequestApi<ContactFormCreateResponse, ContactFormRequest>(
                'contact-form',
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
        console.error('Contact API Error:', err);
        return res.status(500).json({
            success: false,
            message: err?.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
}
