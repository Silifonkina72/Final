export type Message = {
    text: string;
    isBot: boolean;
}

export type InputData = string

export type OneKeyResponse = {
    keywords: Array<string>;
    response: string;
}

export type KeyResponse = Array<OneKeyResponse>