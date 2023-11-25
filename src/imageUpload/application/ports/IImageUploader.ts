
export abstract class IImageUploader{
    public abstract execute(imageUrl:string):Promise<string>;
}