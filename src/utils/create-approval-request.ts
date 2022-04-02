import nodemailer from 'nodemailer'

export default async function (phoneNumber: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'notifications@promethean-power.com',
      pass: 'prometheannotifications18',
    },
  })

  await transporter.sendMail({
    from: 'sudhakar@starlly.in',
    to: 'shubham@starlly.in, madhu@starlly.in, nikith@starlly.in',
    subject: 'Lakshmi Approval Request',
    text: `
    Dear Admin,

    Farmer with phone number ${phoneNumber} is waiting for your approval in order to continue using Lakshmi app!

    Regards,
    Starlly
    `,
  })
}
