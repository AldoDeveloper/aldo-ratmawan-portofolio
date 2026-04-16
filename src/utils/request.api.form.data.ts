import { FetchApiConfig } from "@/core/base.config.api";


export const apiFormData = FetchApiConfig.create({
    base_url: process.env.CLOUDINARY_URL as string,
    auth: {
        username: process.env.CLUODINARY_AUTH_USERNAME as string,
        password: process.env.CLUODINARY_AUTH_PASSWORD as string
    }
});

export const postRequestCloudinary = async(data?: Record<string, string | File>) => {
    
}