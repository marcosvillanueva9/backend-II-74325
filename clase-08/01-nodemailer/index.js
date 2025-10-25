import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 8080

app.use(express.json())

app.post('/mail', async (req, res) => {

    const { titulo, texto } = req.body

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // su email
            pass: process.env.EMAIL_PASSWORD // lkjh asdo olsd nerf
        }
    })

    const result = await transport.sendMail({
        from: `Perrito loko <${process.env.EMAIL}>`,
        to: [process.env.EMAIL, "exaunicen@gmail.com"],
        subject: titulo,
        html: `
            <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px; border-radius: 10px;">
                <h1 style="color: #4CAF50; text-align: center;">
                👋 Hola, soy Marcos desde Nodemailer!!
                </h1>
                <p style="font-size: 16px; color: #333; line-height: 1.5;">
                ${texto}
                </p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
                <p style="font-size: 14px; color: #888; text-align: center;">
                Enviado con ❤️ usando Nodemailer
                </p>
            </div>
            `,
        attachments: [
            {
                filename: 'foto-perro.jpg',
                path: './foto-perro.jpg',
                cid: 'perrito'
            }
        ]
    })

    res.send(result)
})

app.listen(PORT, () => {
    console.log(`escuchando en el ${PORT}`)
})