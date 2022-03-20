// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
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
    const resLogin: any = await userService.login(req.body)
    const response = resLogin.data
    const currentTime = new Date()
    const nextYear = new Date(
      currentTime.getFullYear() + 1,
      currentTime.getMonth()
    )

    if (response.status === 200) {
      // 1. Redirect to /
      res.statusCode = 302
      res.setHeader('Location', '/')

      // 2. Set Cookie
      res.setHeader(
        'Set-Cookie',
        `token=${response.token}; expires=${nextYear.toUTCString()}; Path=/`
      )
    } else {
      // If login fail
      // 1. redirect to /login?error=failed
      res.statusCode = 302
      res.setHeader('Location', '/login?error=failed')

      // 2. Remove Cookie
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
