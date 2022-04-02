import axios from 'axios'

export default async function (phoneNumber: string) {
  const val = Math.floor(1000 + Math.random() * 9000)
  const exp = Date.now() + 10 * 60 * 1000

  let url = `http://enterprise.smsgupshup.com/GatewayAPI/rest?method=sendMessage&userid=2000162061&password=4smsgupshup&&send_to=${phoneNumber}&v=1.1&msg_type=TEXT&auth_scheme=PLAIN&msg=`
  url += `Your%20Lakshmi%20verification%20code%20is%20${val}.%20This%20code%20is%20valid%20for%2010%20Mins%20only.%20Please%20DO%20NOT%20share%20this%20OTP%20with%20anyone%20to%20ensure%20account%27s%20security.`

  try {
    await axios.get(url)
    return {val, exp}
  } catch (error) {
    throw new Error('Error occured while sending sms.')
  }
}
