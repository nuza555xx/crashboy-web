export interface MetaDocument {
    previous?: number;
    next?: number;
    resultCount: number;
    resultTotal?: number;
}

export interface Response<T> {
    payload: T;
    meta?: MetaDocument;
}

interface Meta {
    name: Record<string, string>;
    image?: string;
    slug?: string;
}

type Brand = Meta;
type Model = Meta;
type Province = Meta;

export interface Vehicle {
    id: string;
    brand: Brand;
    model: Model;
    vehicleRegistration: string;
    registrationProvince: Province;
    image: string;
}

export interface CardImageData {
    title: string;
    subTitle: string;
    avatarImage: string;
    cardImage: string;
    description: string;
    description2: string;
}

export interface Login {
    accessToken: string;
    refreshToken: string;
    profile: Profile;
}

export interface Profile {
    id: string;
    displayName: string;
    email: string;
}
