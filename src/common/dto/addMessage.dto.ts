export class AddMessageDto {
    sender: string;
    resiver: string;
    date: number;
    text: string;
    user: {
        username: string;
        clock: string;
        date: string;
        message: string;
    };
}