import Koa from 'koa'
import Router from 'koa-router'
const router = new Router()
const app = new Koa()
import positions from './mock-positions.json' assert { type: 'json' }

// 对原数据进行清洗
// 1. 将公司 logo 从 https://jobs.github.com/xx 切换到 https://dummyimage.com/100x100
// 2. 对字段类型非 string 的转为空串
const ps = positions.map((p: any) => {
  let ret: any = {}
  Object.keys(p).forEach((key) => {
    if (key === 'company_logo') {
      ret[key] = 'https://dummyimage.com/100x100'
      return
    }
    ret[key] = typeof p[key] === 'string' ? p[key] : ''
  })
  return ret
})

const port = 5000

function wrapRes(res: any) {
  return {
    msg: 'success',
    code: 0,
    result: res
  }
}

router.get('/job/:id', async (ctx: any) => {
  const { id } = ctx.params
  const job = ps.filter((p: any) => {
    return id === p.id
  })
  ctx.body = wrapRes(job)
})

router.get('/job', async (ctx: any) => {
  const query = ctx.request.query
  const _location = query.location.toLocaleLowerCase()
  const _fullTime = query.fullTime === 'true'
  const _keyword = query.keyword.toLocaleLowerCase()
  const jobs = ps.filter(({ title, type, location }: any) => {
    const kw = _keyword ? title.toLocaleLowerCase.includes(_keyword) : true
    const ft = _fullTime ? type.toLocaleLowerCase() === 'full time' : true
    const lc = _location
      ? location.toLocaleLowerCase().includes(_location)
      : true
    return kw && ft && lc
  })
  const { page, pageSize } = query
  const start = pageSize * (page - 1)
  const end = start + pageSize
  ctx.body = wrapRes({
    total: jobs.length, // 总记录数
    page, // 当前页码
    pageData: jobs.slice(start, end) // 页数据
  })
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
  console.info(`Loopback: http://localhost:${port}/`)
})
