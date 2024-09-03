

export default interface ISendEmail {
    to: string[]
    subject: string
    text?: string
    html: string
}