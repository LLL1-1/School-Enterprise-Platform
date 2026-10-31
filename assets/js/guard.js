/* 真题工场 · 前端演示权限守卫
 * 仅用于原型演示，不是真实的安全边界。
 * 用法：<body class="guarded" data-guard="enterprise" data-guard-roles="enterprise" data-guard-next="publish.html">
 */
(function () {
  var body = document.body;
  if (!body) return;
  var need = body.getAttribute('data-guard');
  if (!need) return;

  var roles = (body.getAttribute('data-guard-roles') || '').split(',').filter(Boolean);
  var next = body.getAttribute('data-guard-next') || (location.pathname.split('/').pop() || '') + location.search + location.hash;
  var session = null;
  try {
    session = JSON.parse(localStorage.getItem('rtw.session') || 'null');
  } catch (e) {
    session = null;
  }

  if (!session || !session.role) {
    location.replace('login.html?next=' + encodeURIComponent(next) + '&need=' + encodeURIComponent(need));
    return;
  }

  if (roles.length && roles.indexOf(session.role) === -1) {
    body.setAttribute('data-denied', 'true');
    body.setAttribute('data-denied-role', session.role);
    return;
  }

  body.classList.remove('guarded');
  body.setAttribute('data-authorized', 'true');
  window.__RTW_AUTH__ = session;
})();
