/* 真题工场 · 演示数据（全部为模拟数据，仅用于前端原型演示） */
(function () {
  'use strict';

  var MILESTONE_TEMPLATE = [
    { code: 'M0', name: '立项与开题', amount: 10, desc: '三方确认任务书，锁定验收标准' },
    { code: 'M1', name: '需求评审', amount: 20, desc: '需求冻结点，变更须走线上变更单' },
    { code: 'M2', name: '中期 MVP', amount: 30, desc: '可演示的核心流程与部署地址' },
    { code: 'M3', name: '公测与交付', amount: 30, desc: '真实用户试用，提交完整交付物' },
    { code: 'M4', name: '答辩与验收', amount: 10, desc: '课程答辩 + 企业验收单' }
  ];

  var tasks = [
    {
      id: 'RT-2609-018',
      title: '黄骅冬枣合作社产销对接小程序',
      org: '黄骅市齐家务冬枣合作社',
      orgType: '县域企业',
      orgShort: '冬枣',
      line: 'A',
      domain: '农业数字化',
      region: '沧州 · 黄骅',
      budget: 12000,
      cycle: '10 周',
      teamSize: '4—6 人',
      tech: ['微信小程序', '云开发', '数据看板'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: true,
      featured: true,
      summary: '把 200 多户枣农的产量、等级、库存从微信群里搬进一套小程序，让收购单和产销数据真正对得上。',
      pain: '合作社每年 9—11 月集中走批发，价格被动；200 多户枣农的产量、等级、库存靠微信群和纸质台账，漏单、错发时有发生。',
      goal: '一套微信小程序：农户端上报产量与等级，合作社端汇总库存、生成收购单，采购商可查看批次与物流；配套一块产销数据看板。',
      data: '提供近两年脱敏收购台账（Excel，约 1.2 万行）、枣园与分拣线照片；不提供农户身份证、手机号等个人信息。',
      limits: '10 周内上线可用版本；微信小程序 + 云开发优先；需兼容老年农户的大字模式；服务器与备案由合作社协助。',
      accept: '完成 3 类角色（农户 / 合作社 / 采购商）核心流程；20 户真实试用 2 周；库存与收购单数据准确率 ≥98%；提供部署文档与 1 次培训。',
      contact: '李建国 · 合作社理事长 · 每周三下午可对接 1 小时',
      claimed: 2,
      slots: 3,
      applications: 6,
      published: '2026-09-18',
      updated: '2 小时前'
    },
    {
      id: 'RT-2609-021',
      title: '化工园区设备巡检台账系统',
      org: '渤海新区某化工科技有限公司',
      orgType: '规上企业',
      orgShort: '化工',
      line: 'B',
      domain: '工业软件',
      region: '沧州 · 临港',
      budget: 16000,
      cycle: '12 周',
      teamSize: '1 人',
      tech: ['Vue 3', 'FastAPI', 'PostgreSQL'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: true,
      featured: true,
      summary: '480 台设备、6 个班组，纸质巡检表要变成扫码点检、异常闭环和可追溯台账，还要能离线用。',
      pain: '园区 6 家企业设备巡检仍用纸质表，漏检与补录无法追溯；安全科每月汇总要靠人工翻本子，一次检查要准备两周材料。',
      goal: '移动端巡检 + Web 台账：扫码点检、异常拍照上报、超期提醒、按设备 / 班组统计；支持离线暂存，联网后自动补传。',
      data: '提供脱敏设备清单（约 480 台）、巡检项模板与近三个月纸质记录扫描件；不接入 DCS 实时数据，不涉及工艺参数。',
      limits: '12 周；Vue 3 + FastAPI + PostgreSQL；部署在企业内网；需通过等保二级自查清单；移动端以安卓平板为主。',
      accept: '480 台设备台账导入；扫码点检全流程跑通；离线 30 分钟可补传；异常闭环率 100%；提供应急回滚方案与管理员手册。',
      contact: '张海宁 · 信息化负责人 · 每周五 15:00—16:00',
      claimed: 1,
      slots: 1,
      applications: 4,
      published: '2026-09-20',
      updated: '今天 09:40'
    },
    {
      id: 'RT-2609-007',
      title: '县域养老机构入住与照护记录平台',
      org: '运河区民政局 · 养老服务指导中心',
      orgType: '政府部门',
      orgShort: '养老',
      line: 'A',
      domain: '民生服务',
      region: '沧州 · 运河区',
      budget: 9800,
      cycle: '8 周',
      teamSize: '4 人',
      tech: ['Vue 3', 'Spring Boot', 'MySQL'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: false,
      featured: true,
      summary: '三家院区的入住、照护、交接班记录各记各的，民政检查前总要突击补材料。',
      pain: '3 家院区入住、照护、家属沟通各用一套表，交接班靠口头；民政检查要临时补材料，护理员重复填表。',
      goal: '入住档案、照护计划、每日巡房记录、家属端进度查询；按民政口径一键导出报表，保留纸质签字作为补充。',
      data: '脱敏入住档案 120 份、照护项目字典、民政报表模板；不提供老人健康隐私数据与家属联系方式。',
      limits: '8 周；B/S 架构，适配平板；一线护理员操作不超过 3 步；不改变现有纸质签字流程。',
      accept: '3 院区各 1 个班组试用 1 周；交接班记录完整率 100%；民政报表导出字段与模板一致；完成 2 场培训。',
      contact: '王院长 · 养老服务指导中心 · 每周二上午',
      claimed: 1,
      slots: 2,
      applications: 3,
      published: '2026-09-15',
      updated: '昨天 16:20'
    },
    {
      id: 'RT-2609-014',
      title: '中小制造企业报价与订单协同看板',
      org: '泊头市铸造产业协会（会员企业联合）',
      orgType: '行业协会',
      orgShort: '铸造',
      line: 'B',
      domain: '智能制造',
      region: '沧州 · 泊头',
      budget: 18000,
      cycle: '14 周',
      teamSize: '1 人',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: true,
      featured: false,
      summary: '报价单在邮箱里来回改版本，交期承诺没有依据——先做一套能算清账的报价与订单看板。',
      pain: '30 余家铸造企业报价靠 Excel 邮件往返，版本混乱；交期承诺没有依据，插单后无人知道影响哪些订单。',
      goal: '报价单在线配置、历史价格对比、订单进度看板；与现有 ERP 通过 Excel 导入导出衔接，不改动 ERP。',
      data: '脱敏历史报价单 600 份、工艺路线字典；ERP 厂商可提供字段说明与导出样例。',
      limits: '14 周；支持多角色审批；内网部署；需兼容现有 Excel 模板；不改造现有 ERP。',
      accept: '报价单生成时间从 40 分钟降到 10 分钟内；历史价格可追溯；审批全程留痕；至少 2 家企业试点。',
      contact: '刘经理 · 协会秘书处 · 每周四下午',
      claimed: 1,
      slots: 1,
      applications: 5,
      published: '2026-09-22',
      updated: '2 天前'
    },
    {
      id: 'RT-2609-026',
      title: '校园实验室预约与耗材管理系统',
      org: '计算机学院 · 实验教学中心',
      orgType: '校内部门',
      orgShort: '实验',
      line: 'A',
      domain: '智慧校园',
      region: '校内 · 计算机学院',
      budget: 6000,
      cycle: '8 周',
      teamSize: '4—5 人',
      tech: ['Vue 3', 'FastAPI', 'MySQL'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: false,
      featured: false,
      summary: '12 间实验室、一张纸质预约表，冲突和空置同时存在；耗材领用也一直没有台账。',
      pain: '学院 12 间实验室预约靠门口纸质表，冲突频繁；耗材领用无台账，学期末盘点对不上。',
      goal: '预约、审批、门禁二维码、耗材领用与库存预警；与学校统一身份认证对接（开发期先用测试账号）。',
      data: '实验室清单、课程排课表、耗材目录；账号对接由信息中心提供测试环境。',
      limits: '8 周；PC + 手机端；校内部署；等保测评前完成日志留存；不涉及门禁硬件改造。',
      accept: '预约冲突可拦截；审批流可配置；耗材库存预警；30 名师生试用 1 周。',
      contact: '赵老师 · 实验教学中心 · 每周一',
      claimed: 3,
      slots: 2,
      applications: 9,
      published: '2026-09-25',
      updated: '3 天前'
    },
    {
      id: 'RT-2609-031',
      title: '河间驴肉火烧门店小程序点单',
      org: '河间市老马餐饮（3 家直营店）',
      orgType: '小微商户',
      orgShort: '餐饮',
      line: 'B',
      domain: '文旅消费',
      region: '沧州 · 河间',
      budget: 11000,
      cycle: '10 周',
      teamSize: '1 人',
      tech: ['微信小程序', 'Node.js', '云数据库'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: false,
      featured: false,
      summary: '外卖平台抽佣高，储值卡出了门就不能用——做一套自己的点单与会员系统。',
      pain: '3 家门店外卖平台抽佣高；会员储值靠纸质卡，跨店不能用，顾客体验差。',
      goal: '小程序点单（自提 / 外送）、会员储值与积分、门店库存同步、简单经营日报。',
      data: '菜品与价格表、近一年脱敏订单流水；不提供顾客手机号与支付信息。',
      limits: '10 周；微信小程序；需支持后厨小票打印；上线前完成食品经营资质展示。',
      accept: '3 店数据打通；储值跨店可用；下单到出票 ≤3 秒；提供店长操作手册与培训。',
      contact: '马老板 · 每周二下午',
      claimed: 1,
      slots: 1,
      applications: 2,
      published: '2026-09-28',
      updated: '4 天前'
    },
    {
      id: 'RT-2609-009',
      title: '盐碱地试验田数据采集与可视化',
      org: '沧州市农林科学院 · 海兴试验站',
      orgType: '科研机构',
      orgShort: '农科',
      line: 'A',
      domain: '农业数字化',
      region: '沧州 · 海兴',
      budget: 14000,
      cycle: '12 周',
      teamSize: '5 人',
      tech: ['uni-app', 'FastAPI', 'PostGIS'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: false,
      featured: false,
      summary: '36 个试验小区的采样数据还在本子上，跨年度对比要重新录一遍。',
      pain: '试验田 36 个小区，采样数据记在本子上，后期整理要两周；不同年度数据无法对比。',
      goal: '移动端采样录入（离线）、地块地图、性状对比图表、年度报告导出。',
      data: '地块矢量边界、2023—2025 年部分试验数据、采样规范。',
      limits: '12 周；移动端优先；离线可用；地图使用公开底图；野外网络不稳定。',
      accept: '36 个小区建档；离线采样 50 条不丢数据；图表支持 3 年对比；完成 1 次现场培训。',
      contact: '孙老师 · 海兴试验站 · 每两周一次',
      claimed: 2,
      slots: 2,
      applications: 4,
      published: '2026-09-16',
      updated: '5 天前'
    },
    {
      id: 'RT-2609-036',
      title: '港口物流车辆排队叫号系统',
      org: '黄骅港某散货堆场',
      orgType: '物流企业',
      orgShort: '港口',
      line: 'B',
      domain: '物流供应链',
      region: '沧州 · 黄骅港',
      budget: 20000,
      cycle: '12 周',
      teamSize: '1 人',
      tech: ['Vue 3', 'Go', 'Redis'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: true,
      featured: false,
      summary: '日均 400 辆车靠对讲机排队，司机不知道还要等多久，调度插队也没有记录。',
      pain: '堆场日均 400 辆车，排队靠对讲机；司机不知道前方还有多少车，拥堵时投诉不断。',
      goal: '司机端取号 / 叫号、预计等待时间、堆场端调度看板、异常插队审批留痕。',
      data: '脱敏进出场流水 3 个月、场区平面图；不接入港口生产系统。',
      limits: '12 周；高并发取号；司机端用小程序；需大屏展示；现场网络需支持 4G。',
      accept: '取号响应 ≤1 秒；等待时间误差 ≤10 分钟；调度插队全程留痕；试运行 1 周。',
      contact: '陈主管 · 每周三',
      claimed: 1,
      slots: 1,
      applications: 7,
      published: '2026-09-29',
      updated: '6 天前'
    },
    {
      id: 'RT-2609-042',
      title: '社区食堂订餐与助老补贴核销',
      org: '新华区某街道办 · 社区食堂',
      orgType: '街道社区',
      orgShort: '社区',
      line: 'A',
      domain: '民生服务',
      region: '沧州 · 新华区',
      budget: 8500,
      cycle: '8 周',
      teamSize: '4 人',
      tech: ['Vue 3', 'Spring Boot', 'MySQL'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: false,
      featured: false,
      summary: '老人打电话订餐、补贴月底手工对账，两个食堂三天的账要对三遍。',
      pain: '2 个社区食堂，老年人订餐靠电话，补贴核销月底对账要 3 天，容易出现重复补贴。',
      goal: '电话 / 微信订餐登记、助老补贴自动核算、配送名单、民政对账报表。',
      data: '补贴规则文档、脱敏订餐记录、菜品库；不采集健康数据。',
      limits: '8 周；操作界面适老化；支持现金与刷脸（预留接口）；不新增硬件。',
      accept: '订餐到配送单 ≤2 步；补贴计算与人工核对一致；对账报表一键导出；2 个食堂试用。',
      contact: '周主任 · 每周四',
      claimed: 0,
      slots: 3,
      applications: 1,
      published: '2026-10-08',
      updated: '1 周前'
    },
    {
      id: 'RT-2609-045',
      title: '非遗工坊产品数字档案与展销页',
      org: '吴桥县文化广电和旅游局',
      orgType: '政府部门',
      orgShort: '文旅',
      line: 'B',
      domain: '文化数字化',
      region: '沧州 · 吴桥',
      budget: 7200,
      cycle: '8 周',
      teamSize: '1 人',
      tech: ['Next.js', 'Strapi', '对象存储'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: false,
      featured: false,
      summary: '12 家杂技道具工坊没有统一展示，好手艺只留在熟人介绍里。',
      pain: '吴桥 12 家杂技道具工坊没有统一展示，订单靠熟人介绍；产品工艺没有数字档案。',
      goal: '工坊与产品数字档案、全景展示页、询价与订单意向收集、后台内容维护。',
      data: '工坊与产品照片、工艺文字资料、全景素材；需授权肖像与作品版权。',
      limits: '8 周；展示页需适配手机分享；内容可由运营后台维护；加载 ≤3 秒。',
      accept: '12 家工坊建档；产品页可分享；询价表单可导出；移动端加载 ≤3 秒。',
      contact: '吴老师 · 文旅局 · 每两周',
      claimed: 1,
      slots: 1,
      applications: 2,
      published: '2026-10-09',
      updated: '1 周前'
    },
    {
      id: 'RT-2609-051',
      title: '校内科研项目经费报销助手',
      org: '财务处 · 科研经费管理科',
      orgType: '校内部门',
      orgShort: '财务',
      line: 'A',
      domain: '智慧校园',
      region: '校内 · 财务处',
      budget: 5000,
      cycle: '6 周',
      teamSize: '3—4 人',
      tech: ['Vue 3', 'FastAPI', 'SQLite'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: false,
      featured: false,
      summary: '报销规则多、退单多、咨询电话更多——先做一个会自检、能指路的助手。',
      pain: '科研经费报销规则多，老师学生反复退单；财务处每天接 30 多个咨询电话。',
      goal: '报销材料自检、规则问答（FAQ + 检索）、常见退单原因提示、进度查询（对接财务系统只读接口）。',
      data: '报销制度汇编、脱敏退单记录 200 条；财务系统提供测试接口。',
      limits: '6 周；校内网；不存票据原图；回答需标注制度出处，避免误导。',
      accept: '覆盖 20 类常见报销场景；自检清单命中率 ≥85%；回答均带出处；试用 50 人。',
      contact: '钱老师 · 财务处 · 每周五',
      claimed: 2,
      slots: 2,
      applications: 5,
      published: '2026-10-10',
      updated: '1 周前'
    },
    {
      id: 'RT-2609-053',
      title: '汽车零部件供应商质量追溯看板',
      org: '青县某汽车零部件有限公司',
      orgType: '规上企业',
      orgShort: '汽配',
      line: 'B',
      domain: '智能制造',
      region: '沧州 · 青县',
      budget: 22000,
      cycle: '14 周',
      teamSize: '1 人',
      tech: ['Vue 3', 'Java', 'SQL Server'],
      phase: '2026 秋 · 第一期',
      status: 'open',
      hot: false,
      featured: false,
      summary: '主机厂要求 2 小时提供批次追溯，现在翻纸质流转卡要半天——这是一道硬题。',
      pain: '主机厂要求 2 小时内提供批次追溯，现在翻纸质流转卡要半天，质量部经常通宵。',
      goal: '批次二维码、工序扫码、来料与出货关联、追溯报告一键生成；与现有 MES 只读对接。',
      data: '脱敏 BOM、工序路线、近半年批次记录；MES 厂商配合提供接口文档。',
      limits: '14 周；车间平板 + Web；断网可缓存；需通过主机厂信息安全问卷。',
      accept: '单批次追溯 ≤2 分钟；报告字段符合主机厂模板；断网 2 小时不丢数据；试点 1 条产线。',
      contact: '马工 · 质量部 · 每周一',
      claimed: 1,
      slots: 1,
      applications: 3,
      published: '2026-10-12',
      updated: '2 周前'
    }
  ];

  tasks.forEach(function (t, index) {
    t.milestones = MILESTONE_TEMPLATE.map(function (m, i) {
      var state = 'pending';
      if (index === 1) {
        state = i < 2 ? 'done' : (i === 2 ? 'active' : 'pending');
      } else if (i === 0) {
        state = 'done';
      } else if (i === 1) {
        state = 'active';
      }
      return {
        code: m.code,
        name: m.name,
        desc: m.desc,
        amount: m.amount,
        money: Math.round(t.budget * m.amount / 100),
        due: m.code === 'M0' ? '第 1 周' : '第 ' + (i * 2 + 2) + ' 周',
        status: state
      };
    });
    t.raised = Math.round(t.budget * 0.3);
  });

  var notifications = [
    { id: 1, type: 'milestone', icon: 'clock', title: 'M2 中期 MVP 还有 5 天截止', desc: '区域化工园区设备巡检台账系统 · 请提交可演示版本', time: '10 分钟前', unread: true, href: 'workspace.html#project' },
    { id: 2, type: 'review', icon: 'shield', title: '导师已通过 M1 需求评审', desc: '周明远：需求边界清楚，注意离线补传的异常处理。', time: '2 小时前', unread: true, href: 'workspace.html#project' },
    { id: 3, type: 'money', icon: 'wallet', title: 'M1 阶段款 ¥3,200 已结算', desc: '企业已确认，预计 T+1 到账，可在资金中心查看回单。', time: '昨天 16:40', unread: true, href: 'payment.html?tab=bills' },
    { id: 4, type: 'task', icon: 'spark', title: '为你匹配了 3 道新真题', desc: '基于你的技能标签：Vue 3 / FastAPI / 数据可视化', time: '昨天 09:15', unread: false, href: 'tasks.html' },
    { id: 5, type: 'system', icon: 'info', title: '平台服务费调整公告', desc: '校地公益期内，学生侧结算与提现继续免手续费。', time: '3 天前', unread: false, href: 'index.html#fund' }
  ];

  var orders = [
    { id: 'PAY-20261023-0081', taskId: 'RT-2609-021', task: '化工园区设备巡检台账系统', stage: 'M2 中期款 · 30%', amount: 4800, status: 'pending', statusText: '待支付', created: '2026-10-23 14:30', due: '2026-10-23 15:00', payer: '渤海新区某化工科技有限公司', invoice: false },
    { id: 'PAY-20261008-0076', taskId: 'RT-2609-021', task: '化工园区设备巡检台账系统', stage: 'M1 需求评审 · 20%', amount: 3200, status: 'paid', statusText: '已支付', created: '2026-10-08 10:12', due: '—', payer: '渤海新区某化工科技有限公司', invoice: true },
    { id: 'PAY-20260930-0071', taskId: 'RT-2609-021', task: '化工园区设备巡检台账系统', stage: '平台履约保证金', amount: 2000, status: 'paid', statusText: '已支付', created: '2026-09-30 09:05', due: '—', payer: '渤海新区某化工科技有限公司', invoice: false },
    { id: 'PAY-20260922-0064', taskId: 'RT-2609-014', task: '中小制造企业报价与订单协同看板', stage: 'M1 需求评审 · 20%', amount: 3600, status: 'paid', statusText: '已支付', created: '2026-09-22 15:26', due: '—', payer: '泊头市铸造产业协会', invoice: true },
    { id: 'PAY-20260918-0059', taskId: 'RT-2609-007', task: '县域养老机构入住与照护记录平台', stage: 'M3 公测与交付 · 30%', amount: 2940, status: 'refunded', statusText: '已退款', created: '2026-09-18 11:40', due: '—', payer: '运河区民政局', invoice: false },
    { id: 'PAY-20260912-0052', taskId: 'RT-2609-018', task: '黄骅冬枣合作社产销对接小程序', stage: 'M0 立项与开题 · 10%', amount: 1200, status: 'paid', statusText: '已支付', created: '2026-09-12 09:18', due: '—', payer: '黄骅市齐家务冬枣合作社', invoice: false }
  ];

  var settlements = [
    { id: 'ST-20261010-031', task: '化工园区设备巡检台账系统', stage: 'M1 需求评审', amount: 3200, fee: 0, status: '已结算', date: '2026-10-10', account: '招商银行 •••• 4821' },
    { id: 'ST-20260928-024', task: '县域养老机构入住与照护记录平台', stage: 'M1 需求评审', amount: 1960, fee: 0, status: '已结算', date: '2026-09-28', account: '招商银行 •••• 4821' },
    { id: 'ST-20260915-019', task: '校内实验室预约与耗材管理系统', stage: 'M0 立项与开题', amount: 600, fee: 0, status: '已结算', date: '2026-09-15', account: '招商银行 •••• 4821' },
    { id: 'ST-20261022-036', task: '化工园区设备巡检台账系统', stage: 'M2 中期 MVP', amount: 4800, fee: 0, status: '待结算', date: '预计 10-31', account: '招商银行 •••• 4821' }
  ];

  var reviewQueue = [
    { id: 'RT-2610-061', title: '校园快递驿站智能分拣预约', org: '后勤服务中心', line: 'A', domain: '智慧校园', submitted: '今天 10:24', risk: '附件未勾选脱敏承诺', riskLevel: 'warn', status: 'pending' },
    { id: 'RT-2610-060', title: '献县金丝小枣深加工溯源', org: '献县某食品有限公司', line: 'B', domain: '农业数字化', submitted: '今天 09:42', risk: '验收标准描述偏笼统', riskLevel: 'warn', status: 'pending' },
    { id: 'RT-2610-058', title: '养老院智能药盒提醒服务', org: '沧州某智慧养老公司', line: 'B', domain: '民生服务', submitted: '昨天 17:10', risk: '涉及健康数据，需改为校内环境', riskLevel: 'danger', status: 'pending' },
    { id: 'RT-2610-057', title: '化工安全培训题库与考试', org: '渤海新区某化工企业', line: 'A', domain: '工业软件', submitted: '昨天 15:36', risk: '无', riskLevel: 'ok', status: 'pending' },
    { id: 'RT-2610-055', title: '图书馆座位反占座系统', org: '图书馆', line: 'A', domain: '智慧校园', submitted: '昨天 11:08', risk: '无', riskLevel: 'ok', status: 'pending' },
    { id: 'RT-2610-052', title: '五金件报价知识库', org: '南皮县五金协会', line: 'B', domain: '智能制造', submitted: '10-21 16:50', risk: '工作量偏小，建议并入同类题', riskLevel: 'warn', status: 'pending' },
    { id: 'RT-2610-049', title: '县医院术后随访管理', org: '某县人民医院', line: 'A', domain: '民生服务', submitted: '10-21 09:12', risk: '涉及患者数据，待合规复核', riskLevel: 'danger', status: 'pending' }
  ];

  var users = [
    { name: '林知远', role: '学生', org: '计算机学院 · 软件工程 2301', credit: 96, status: '正常', joined: '2026-09-02' },
    { name: '周明远', role: '校内导师', org: '计算机学院 · 副教授', credit: 100, status: '正常', joined: '2026-08-28' },
    { name: '张海宁', role: '企业用户', org: '渤海新区某化工科技有限公司', credit: 92, status: '正常', joined: '2026-09-05' },
    { name: '王璐', role: '平台运营', org: '双创中心', credit: 100, status: '正常', joined: '2026-08-20' },
    { name: '马晓雯', role: '学生', org: '计算机学院 · 软件工程 2202', credit: 88, status: '限制认领', joined: '2026-09-03' },
    { name: '李建国', role: '校外导师', org: '齐家务冬枣合作社', credit: 95, status: '正常', joined: '2026-09-10' },
    { name: '齐家务冬枣合作社', role: '企业用户', org: '县域企业 · 黄骅', credit: 90, status: '待年审', joined: '2026-09-08' },
    { name: '泊头铸造产业协会', role: '企业用户', org: '行业协会 · 泊头', credit: 87, status: '正常', joined: '2026-09-11' }
  ];

  var messages = [
    { from: '周明远', role: '校内导师', text: 'M2 的离线补传场景记得补一段演示视频，验收时企业很看重。', time: '10:12', unread: 2, avatar: '周' },
    { from: '张海宁', role: '企业对接人', text: '下周五下午我们在园区，可以现场看一下平板端的操作。', time: '昨天', unread: 0, avatar: '张' },
    { from: '平台运营', role: '双创中心', text: '第一期中期路演定在 11 月 8 日，材料模板已发到你的邮箱。', time: '昨天', unread: 1, avatar: '运' },
    { from: '陈一鸣', role: '同组组员', text: '异常闭环的流程图我更新到文档库 v1.3 了，你再看一下。', time: '周一', unread: 0, avatar: '陈' }
  ];

  var currentProject = {
    id: 'RT-2609-021',
    title: '化工园区设备巡检台账系统',
    org: '渤海新区某化工科技有限公司',
    mentor: '周明远',
    enterprise: '张海宁',
    line: 'B',
    progress: 40,
    escrow: 16000,
    settled: 3200,
    team: ['林知远', '陈一鸣', '赵晓', '孙悦'],
    milestones: [
      { code: 'M0', name: '立项与开题', due: '09.22', status: 'done', note: '三方签署任务书' },
      { code: 'M1', name: '需求评审', due: '10.08', status: 'done', note: '导师通过 · 需求冻结' },
      { code: 'M2', name: '中期 MVP', due: '10.31', status: 'active', note: '距截止 5 天' },
      { code: 'M3', name: '公测与交付', due: '11.21', status: 'pending', note: '计划中' },
      { code: 'M4', name: '答辩与验收', due: '12.12', status: 'pending', note: '计划中' }
    ]
  };

  var todos = [
    { id: 1, text: '提交 M2 中期 MVP 演示视频（8 分钟）', due: '10-31', tag: '里程碑', done: false },
    { id: 2, text: '补充离线补传异常处理说明', due: '10-27', tag: '交付物', done: false },
    { id: 3, text: '更新《AI 使用过程记录表》v1.2', due: '10-28', tag: '过程材料', done: false },
    { id: 4, text: '与张海宁确认平板型号与系统版本', due: '10-26', tag: '对接', done: true }
  ];

  var activities = [
    { icon: 'git', title: 'Git 提交 12 次', desc: 'feat: 离线巡检队列与补传重试', time: '今天 10:24' },
    { icon: 'file', title: '文档库更新 v1.3', desc: '《异常闭环流程图》· 陈一鸣', time: '昨天 18:02' },
    { icon: 'shield', title: '导师评注通过', desc: '周明远：需求边界清楚，继续推进', time: '昨天 16:40' },
    { icon: 'wallet', title: 'M1 阶段款已结算', desc: '¥3,200 · 招商银行 •••• 4821', time: '10-10 14:20' }
  ];

  var domainStats = [
    { name: '智能制造', value: 7, pct: 88 },
    { name: '农业数字化', value: 6, pct: 76 },
    { name: '民生服务', value: 5, pct: 63 },
    { name: '智慧校园', value: 4, pct: 50 },
    { name: '工业软件', value: 3, pct: 38 },
    { name: '文旅消费', value: 1, pct: 16 }
  ];

  /* 匿名审核工作台数据：不包含姓名、学号、头像、联系方式、团队名称 */
  var auditProjects = [
    {
      id: 'PRJ-A-03',
      title: '化工园区设备巡检台账系统',
      domain: '工业软件',
      stage: 'M2 中期 MVP',
      progress: 40,
      status: 'pending',
      teamSize: 4,
      cohort: '2023 级',
      college: '计算机学院',
      updated: '今天 09:40',
      pending: 'M2 中期 MVP 评注',
      summary: '在现有巡检系统上增加离线补传、异常闭环与班组统计，解决园区边缘区域漏检问题。',
      materials: [
        { name: '需求规格说明书 v1.3', type: 'PDF', size: '2.4 MB', date: '10-22' },
        { name: 'M2 演示视频', type: 'MP4', size: '86 MB', date: '10-23' },
        { name: '测试报告', type: 'PDF', size: '1.1 MB', date: '10-23' },
        { name: '源码仓库快照', type: 'ZIP', size: '12 MB', date: '10-23' }
      ],
      milestones: [
        { code: 'M0', name: '立项与开题', status: 'done' },
        { code: 'M1', name: '需求评审', status: 'done' },
        { code: 'M2', name: '中期 MVP', status: 'active' },
        { code: 'M3', name: '公测与交付', status: 'pending' },
        { code: 'M4', name: '答辩与验收', status: 'pending' }
      ],
      history: [
        { time: '10-22 16:40', text: 'M1 需求评审通过，需求冻结', by: '审核员 A' },
        { time: '10-08 10:12', text: 'M0 立项材料齐全', by: '审核员 A' }
      ]
    },
    {
      id: 'PRJ-B-11',
      title: '汽车零部件供应商质量追溯看板',
      domain: '智能制造',
      stage: 'M3 公测交付',
      progress: 72,
      status: 'pending',
      teamSize: 1,
      cohort: '2022 级',
      college: '计算机学院',
      updated: '昨天 17:10',
      pending: 'M3 公测交付审核',
      summary: '通过批次二维码与工序扫码，将单批次追溯时间从半天压缩到 2 分钟。',
      materials: [
        { name: '追溯报告样例', type: 'PDF', size: '3.2 MB', date: '10-22' },
        { name: '部署与回滚说明', type: 'PDF', size: '820 KB', date: '10-22' },
        { name: '演示视频', type: 'MP4', size: '124 MB', date: '10-21' }
      ],
      milestones: [
        { code: 'M0', name: '立项与开题', status: 'done' },
        { code: 'M1', name: '需求评审', status: 'done' },
        { code: 'M2', name: '中期 MVP', status: 'done' },
        { code: 'M3', name: '公测与交付', status: 'active' },
        { code: 'M4', name: '答辩与验收', status: 'pending' }
      ],
      history: [
        { time: '10-20 11:08', text: 'M2 中期 MVP 通过', by: '审核员 B' },
        { time: '10-12 15:30', text: 'M1 需求边界补充确认', by: '审核员 B' }
      ]
    },
    {
      id: 'PRJ-A-07',
      title: '县域养老机构照护记录平台',
      domain: '民生服务',
      stage: 'M1 需求评审',
      progress: 20,
      status: 'ongoing',
      teamSize: 5,
      cohort: '2023 级',
      college: '计算机学院',
      updated: '昨天 16:20',
      pending: '等待团队补充家属端原型',
      summary: '覆盖 3 家院区的入住、照护与交接班记录，按民政口径导出报表。',
      materials: [
        { name: '需求规格 v1.0', type: 'DOCX', size: '680 KB', date: '10-21' },
        { name: '用例图', type: 'PNG', size: '1.6 MB', date: '10-21' }
      ],
      milestones: [
        { code: 'M0', name: '立项与开题', status: 'done' },
        { code: 'M1', name: '需求评审', status: 'active' },
        { code: 'M2', name: '中期 MVP', status: 'pending' },
        { code: 'M3', name: '公测与交付', status: 'pending' },
        { code: 'M4', name: '答辩与验收', status: 'pending' }
      ],
      history: [
        { time: '10-18 09:20', text: '初审意见：补充家属端流程', by: '审核员 A' }
      ]
    },
    {
      id: 'PRJ-A-09',
      title: '校园实验室预约与耗材管理',
      domain: '智慧校园',
      stage: 'M3 公测交付',
      progress: 78,
      status: 'ongoing',
      teamSize: 4,
      cohort: '2023 级',
      college: '计算机学院',
      updated: '10-20 14:05',
      pending: '无 · 等待 M4 答辩',
      summary: '12 间实验室预约、审批与耗材库存预警，已在实验中心试运行。',
      materials: [
        { name: '公测反馈汇总', type: 'PDF', size: '1.8 MB', date: '10-19' },
        { name: '耗材库存清单', type: 'XLSX', size: '240 KB', date: '10-18' }
      ],
      milestones: [
        { code: 'M0', name: '立项与开题', status: 'done' },
        { code: 'M1', name: '需求评审', status: 'done' },
        { code: 'M2', name: '中期 MVP', status: 'done' },
        { code: 'M3', name: '公测与交付', status: 'active' },
        { code: 'M4', name: '答辩与验收', status: 'pending' }
      ],
      history: [
        { time: '10-19 10:40', text: '公测反馈通过，进入 M4 准备', by: '审核员 B' },
        { time: '10-10 16:10', text: 'M2 阶段评注通过', by: '审核员 B' }
      ]
    },
    {
      id: 'PRJ-B-04',
      title: '河间驴肉火烧门店小程序点单',
      domain: '文旅消费',
      stage: 'M4 答辩与验收',
      progress: 100,
      status: 'done',
      teamSize: 1,
      cohort: '2022 级',
      college: '计算机学院',
      updated: '10-18 17:30',
      pending: '已通过 · 待归档',
      summary: '3 家门店点单、会员储值与经营日报，已上线试运行。',
      materials: [
        { name: '验收单', type: 'PDF', size: '420 KB', date: '10-18' },
        { name: '答辩材料', type: 'PDF', size: '5.2 MB', date: '10-17' }
      ],
      milestones: [
        { code: 'M0', name: '立项与开题', status: 'done' },
        { code: 'M1', name: '需求评审', status: 'done' },
        { code: 'M2', name: '中期 MVP', status: 'done' },
        { code: 'M3', name: '公测与交付', status: 'done' },
        { code: 'M4', name: '答辩与验收', status: 'done' }
      ],
      history: [
        { time: '10-18 17:20', text: 'M4 答辩通过，企业验收完成', by: '审核员 A' }
      ]
    }
  ];

  window.RTW_DATA = {
    tasks: tasks,
    notifications: notifications,
    orders: orders,
    settlements: settlements,
    reviewQueue: reviewQueue,
    users: users,
    messages: messages,
    currentProject: currentProject,
    todos: todos,
    activities: activities,
    domainStats: domainStats,
    auditProjects: auditProjects,
    milestoneTemplate: MILESTONE_TEMPLATE
  };
})();
