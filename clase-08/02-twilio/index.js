import express from 'express'
import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 8080

app.use(express.json())

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

app.post('/wpp', async (req, res) => {

    const { msg } = req.body

    const message = await client.messages.create({
        from: `whatsapp:+14155238886`,
        to: process.env.PERSONAL_WHATSAPP_NUMBER,
        body: msg,
        mediaUrl: ['https://demo.twilio.com/owl.png']
    })

    res.send(message)
})

app.listen(PORT, () => {
    console.log(`escuchando en el ${PORT}`)
})