export interface Actor {
    id?: number;
    name: string;
    dateOfBirth?: Date;
    imgUrl?: string | File;
    picture?: File | string;
    biography?: string;
}