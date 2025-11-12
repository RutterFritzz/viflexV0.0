export interface MessageTemplate {
    id: number;
    name: string;
    subject: string;
    to_name: string;
    to_email: string;
    bcc: boolean;
    content: string;
}