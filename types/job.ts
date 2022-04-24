type JobType = {
  id: string // 职位id
  how_to_apply: string // 如何应聘
  type: string // 工作类型
  company: string // 公司名称
  location: string // 工作地点
  title: string // 职位标题
  url: string // 职位详情线上地址
  description: string // 职位描述
  created_at?: string // 创建时间
  company_url?: string // 公司官网
  company_logo?: string // 公司logo
}

export default JobType
