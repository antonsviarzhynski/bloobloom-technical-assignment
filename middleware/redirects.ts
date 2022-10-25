import { ServerMiddleware } from '@nuxt/types'

const redirectMiddleware: ServerMiddleware = (req, res, next) => {
  const redirects = [
    {
      from: "/",
      to: "/collections/spectacles-women"
    }
  ]
  const redirect = redirects.find((red) => red.from === req.url)
  if (redirect) {
    res.writeHead(301, { Location: redirect.to })
    res.end()
  } else {
    next()
  }
}

export default redirectMiddleware;
