const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();
const app = new Koa();
const positions = require('./mock-positions.json');

// 对原数据进行清洗
// 1. 将公司 logo 从 https://jobs.github.com/xx 切换到 https://dummyimage.com/100x100
// 2. 对字段类型非 string 的转为空串
const ps = positions.map((p) => {
  let ret = {};
  Object.keys(p).forEach((key)=>{
    if(key === 'company_logo') {
      ret[key] = 'https://dummyimage.com/100x100';
      return;
    } 
    ret[key] = typeof p[key] === 'string' ? p[key] : ''
  })
  return ret;
})

const port = 5000;

router.get('/job/:id', async (ctx) => {
	const { id } = ctx.params; 
	const job = ps.filter((p)=>{
		return id === p.id;
	})
	ctx.body = job;
	console.log(job);
})

router.get('/job', async (ctx) => {
	const keyword = ctx.request.query.search;
	const jobs = ps.filter(({title})=>{
		return title.toLocaleLowerCase().includes(keyword.toLowerCase());
	})
	ctx.body = jobs;
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
	console.info(`Loopback: http://localhost:${port}/`);
});