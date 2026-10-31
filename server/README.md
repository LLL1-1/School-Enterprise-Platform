# 后端（预留）

当前仓库以前端原型为主，后端将放在本目录，统一通过 `/api` 提供接口，并托管 `public/` 静态文件。

建议结构：

```text
server/
├─ index.js          # 启动入口
├─ routes/           # auth / tasks / projects / reviews / payments
├─ middleware/       # RBAC、审计日志、参数校验
├─ services/         # 业务逻辑
├─ db/               # 数据库连接与迁移
└─ uploads/          # 本地演示上传（不提交）
```

首批需要实现：

1. 认证与 RBAC：学生、导师、企业、运营四类角色。
2. 任务发布、双级审核、认领与组队。
3. 项目、里程碑、交付物、导师评注与企业验收。
4. 资金托管、里程碑释放、退款、发票与支付回调。
5. 文件上传、脱敏检查与审计日志。

真实权限必须在后端校验；`public/assets/js/guard.js` 仅用于前端演示。
