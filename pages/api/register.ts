import { NextApiRequest, NextApiResponse } from 'next'
import userService from '../../services/user'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 200
    res.json({
      status: 500,
      message: 'Method Not Allowed',
    })
  }

  try {
    const response: any = await userService.register(req.body)
    const currentTime = new Date()
    const nextYear = new Date(
      currentTime.getFullYear() + 1,
      currentTime.getMonth()
    )

    if (response.status === 200) {
      res.statusCode = 302
      res.setHeader('Location', '/')

      res.setHeader(
        'Set-Cookie',
        `token=${response.token}; expires=${nextYear.toUTCString()}; Path=/`
      )
    } else {
      res.statusCode = 302
      res.setHeader('Location', '/register?error=failed')

      res.setHeader(
        'Set-Cookie',
        `token=${response.token}; expires=${currentTime.toUTCString()}; Path=/`
      )
    }

    res.json(response)
  } catch (error) {
    res.statusCode = 200
    res.json({
      status: 500,
      message: 'Internal Server Error',
    })
  }
}

export default handler
