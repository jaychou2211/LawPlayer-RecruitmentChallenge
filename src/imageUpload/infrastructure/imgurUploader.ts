import axios from "axios";
import { Injectable } from "@nestjs/common";
import { IImageUploader } from "../application/ports/IImageUploader";

@Injectable()
export class ImgurUploader implements IImageUploader {
    private imgurClientId: string = process.env.IMGUR_CLIENT_ID 

    async execute(imageUrl: string) {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(imageResponse.data).toString('base64');

        const response = await axios.post('https://api.imgur.com/3/image', {
            image: base64Image,
            type: 'base64'
        }, {
            headers: {
                Authorization: `Client-ID ${this.imgurClientId}`
            }
        });

        return response.data.data.link;
    }
} 