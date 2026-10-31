/* 真题工场 · 共享交互脚本 */
(function () {
  'use strict';

  var RTW = window.RTW = window.RTW || {};
  var DATA = window.RTW_DATA || {};

  var ROLE_META = {
    student: { role: 'student', label: '学生', name: '林知远', sub: '计算机学院 · 软件工程 2301', avatar: '林', scope: '计算机学院' },
    mentor: { role: 'mentor', label: '校内导师', name: '周明远', sub: '计算机学院 · 副教授', avatar: '周', scope: '计算机学院' },
    enterprise: { role: 'enterprise', label: '企业出题方', name: '张海宁', sub: '渤海新区某化工科技有限公司', avatar: '张', scope: '企业账户' },
    admin: { role: 'admin', label: '平台运营', name: '王璐', sub: '双创中心 · 平台运营', avatar: '王', scope: '运营后台' }
  };

  var STORE = {
    session: 'rtw.session',
    bookmarks: 'rtw.bookmarks',
    orders: 'rtw.orders',
    todos: 'rtw.todos'
  };

  /* ---------- 基础工具 ---------- */
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function icon(name, cls) {
    return '<svg class="ic ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }
  function money(n) { return '¥' + Number(n || 0).toLocaleString('zh-CN'); }
  function read(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* file:// 下可能不可用 */ }
  }
  function remove(key) {
    try { window.localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }
  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  /* ---------- 会话 ---------- */
  function getSession() {
    var s = read(STORE.session, null);
    if (s && s.role && ROLE_META[s.role]) return s;
    return null;
  }
  function loginDemo(role, demo) {
    var meta = ROLE_META[role] || ROLE_META.student;
    var session = {
      role: meta.role,
      label: meta.label,
      name: meta.name,
      sub: meta.sub,
      avatar: meta.avatar,
      scope: meta.scope,
      demo: !!demo,
      loginAt: Date.now()
    };
    write(STORE.session, session);
    return session;
  }
  function ensureSession(preferredRole) {
    var s = getSession();
    if (s) return s;
    return loginDemo(preferredRole || 'student', true);
  }
  function signIn(role, profile) {
    var meta = ROLE_META[role] || ROLE_META.student;
    profile = profile || {};
    var name = profile.name || meta.name;
    var session = {
      role: meta.role,
      label: meta.label,
      name: name,
      sub: profile.sub || meta.sub,
      avatar: name.slice(0, 1),
      scope: profile.scope || meta.scope,
      phone: profile.phone || '',
      demo: false,
      loginAt: Date.now()
    };
    write(STORE.session, session);
    return session;
  }
  function logout(redirect) {
    remove(STORE.session);
    window.location.href = redirect || 'index.html';
  }
  function switchRole(role) {
    var s = loginDemo(role, true);
    return s;
  }

  /* ---------- Toast ---------- */
  function toast(message, type) {
    var stack = qs('#toastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'toastStack';
      stack.className = 'toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'toast toast-' + (type || 'success');
    el.innerHTML = '<span class="toast-ic">' + icon(type === 'error' ? 'alert' : (type === 'info' ? 'info' : 'check-circle')) + '</span><span>' + esc(message) + '</span>';
    stack.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-in'); });
    window.setTimeout(function () {
      el.classList.remove('is-in');
      window.setTimeout(function () { el.remove(); }, 260);
    }, 3200);
  }

  /* ---------- 弹窗 ---------- */
  function openModal(id) {
    var el = typeof id === 'string' ? document.getElementById(id) : id;
    if (!el) return;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    var focusable = el.querySelector('input, textarea, select, button:not([data-modal-close])');
    if (focusable) window.setTimeout(function () { focusable.focus(); }, 80);
  }
  function closeModal(target) {
    var el = target && target.classList && target.classList.contains('modal') ? target : (target ? target.closest('.modal') : null);
    if (!el) el = qs('.modal.is-open');
    if (!el) return;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    if (!qs('.modal.is-open')) document.body.classList.remove('modal-open');
  }

  /* ---------- 收藏 ---------- */
  function getBookmarks() { return read(STORE.bookmarks, []); }
  function toggleBookmark(id) {
    var list = getBookmarks();
    var idx = list.indexOf(id);
    if (idx > -1) list.splice(idx, 1); else list.push(id);
    write(STORE.bookmarks, list);
    qsa('[data-bookmark="' + id + '"]').forEach(function (btn) {
      btn.classList.toggle('is-on', idx === -1);
      btn.setAttribute('aria-pressed', idx === -1 ? 'true' : 'false');
      var label = btn.querySelector('.bm-label');
      if (label) label.textContent = idx === -1 ? '已收藏' : '收藏';
    });
    toast(idx === -1 ? '已加入收藏' : '已取消收藏', 'info');
  }

  /* ---------- 导航 ---------- */
  var NAV = [
    { key: 'home', label: '首页', href: 'index.html' },
    { key: 'tasks', label: '任务市场', href: 'tasks.html' },
    { key: 'path', label: '成长路径', href: 'index.html#path' },
    { key: 'works', label: '成果库', href: 'index.html#works' },
    { key: 'about', label: '关于平台', href: 'index.html#about' }
  ];

  function brandHTML(classExtra) {
    return '<a class="brand ' + (classExtra || '') + '" data-same-tab href="index.html" aria-label="真题工场首页">' +
      '<span class="brand-mark" aria-hidden="true">真</span>' +
      '<span class="brand-text"><b>真题工场</b><small>REAL TASK WORKS</small></span>' +
      '</a>';
  }

  function renderHeader(active) {
    var host = qs('#siteHeader');
    if (!host) return;
    var s = getSession();
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" class="' + (active === n.key ? 'is-active' : '') + '">' + n.label + '</a>';
    }).join('');

    var actions = s
      ? '<a class="btn btn-primary btn-sm nav-cta" href="' + (s.role === 'admin' ? 'admin.html' : 'workspace.html') + '">' + (s.role === 'admin' ? '运营后台' : '进入工作台') + icon('arrow-right') + '</a>' +
        '<div class="dropdown">' +
          '<button class="user-chip" data-menu-toggle="navUserMenu" aria-expanded="false">' +
            '<span class="avatar avatar-sm">' + esc(s.avatar) + '</span>' +
            '<span class="user-chip-text"><b>' + esc(s.name) + '</b><small>' + esc(s.label) + '</small></span>' +
            icon('chevron-down', 'chev') +
          '</button>' +
          '<div class="dropdown-menu user-menu" id="navUserMenu" hidden>' +
            '<div class="menu-user"><span class="avatar">' + esc(s.avatar) + '</span><div><b>' + esc(s.name) + '</b><small>' + esc(s.sub) + '</small></div></div>' +
            '<a href="workspace.html">' + icon('home') + '工作台</a>' +
            '<a href="payment.html">' + icon('wallet') + '资金中心</a>' +
            '<a href="workspace.html#settings">' + icon('settings') + '账户设置</a>' +
            '<button type="button" data-logout>' + icon('logout') + '退出登录</button>' +
          '</div>' +
        '</div>'
      : '<a class="nav-login" href="login.html">登录</a>' +
        '<a class="btn btn-primary btn-sm" href="register.html">注册</a>';

    host.innerHTML = '<div class="header-inner container">' +
      brandHTML() +
      '<nav class="nav-links" aria-label="主导航">' + links + '</nav>' +
      '<div class="nav-actions">' + actions + '</div>' +
      '<button class="nav-toggle" type="button" data-mobile-toggle aria-label="打开菜单" aria-expanded="false">' + icon('menu') + '</button>' +
      '</div>' +
      '<div class="mobile-menu" id="mobileMenu" hidden>' +
        '<nav>' + links + '</nav>' +
        '<div class="mobile-actions">' + (s
          ? '<a class="btn btn-primary btn-block" href="' + (s.role === 'admin' ? 'admin.html' : 'workspace.html') + '">进入工作台</a><button class="btn btn-ghost btn-block" data-logout>退出登录</button>'
          : '<a class="btn btn-primary btn-block" href="login.html">登录</a><a class="btn btn-ghost btn-block" href="register.html">注册账号</a>') +
        '</div>' +
      '</div>';

    var toggle = qs('[data-mobile-toggle]', host);
    var menu = qs('#mobileMenu', host);
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.hasAttribute('hidden');
        if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('menu-open', open);
      });
      qsa('a', menu).forEach(function (a) {
        a.addEventListener('click', function () {
          menu.setAttribute('hidden', '');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        });
      });
    }
  }

  function renderFooter() {
    var host = qs('#siteFooter');
    if (!host) return;
    host.innerHTML = '<footer class="site-footer">' +
      '<div class="container footer-grid">' +
        '<div class="footer-brand">' + brandHTML('brand-light') +
          '<p>把县域企业的真实需求，变成学生的第一份作品。<br>校地协同 · 课程载体 · 过程可查。</p>' +
          '<div class="footer-badges"><span>' + icon('shield') + '数据脱敏</span><span>' + icon('wallet') + '资金托管</span><span>' + icon('git') + '过程留痕</span></div>' +
        '</div>' +
        '<div class="footer-col"><h4>平台</h4>' +
          '<a href="tasks.html">任务市场</a><a href="publish.html">发布任务</a><a href="index.html#path">成长路径</a><a href="index.html#works">成果库</a>' +
        '</div>' +
        '<div class="footer-col"><h4>参与</h4>' +
          '<a href="login.html">学生入口</a><a href="login.html">教师入口</a><a href="publish.html">企业入口</a><a href="admin.html">运营后台</a>' +
        '</div>' +
        '<div class="footer-col"><h4>支持</h4>' +
          '<a href="index.html#fund">资金与结算</a><a href="index.html#about">平台规则</a><a href="index.html#faq">常见问题</a><a href="index.html#about">联系我们</a>' +
        '</div>' +
      '</div>' +
      '<div class="container footer-bottom">' +
        '<span>© 2026 真题工场 · 计算机学院 × 双创中心</span>' +
        '<span>前端原型 V0.2 · 演示数据，不产生真实交易</span>' +
        '<span class="footer-mono">Made for real problems.</span>' +
      '</div>' +
    '</footer>';
  }

  /* ---------- 应用内壳 ---------- */
  function sideNavFor(role, active) {
    var first = role === 'mentor'
      ? { key: 'review', label: '审核工作台', href: 'review.html', icon: 'shield' }
      : role === 'enterprise'
        ? { key: 'projects', label: '我的发布', href: 'workspace.html#projects', icon: 'briefcase' }
        : role === 'admin'
          ? { key: 'projects', label: '审核任务', href: 'admin.html#review', icon: 'shield' }
          : { key: 'projects', label: '我的项目', href: 'workspace.html#projects', icon: 'layers' };

    var html = '';
    html += '<div class="sidebar-brand">' + brandHTML() + '</div>';
    html += '<div class="scope-card"><span class="scope-dot"></span><div><b>' + (role === 'enterprise' ? '企业账户' : role === 'admin' ? '运营后台' : role === 'mentor' ? '审核工作台' : '计算机学院') + '</b><small>2026 秋季学期 · 第一期</small></div></div>';
    html += '<nav class="side-nav" aria-label="工作台导航">';
    html += '<p class="side-label">工作区</p>';
    html += sideLink('overview', '工作台', 'workspace.html', 'home', active);
    html += sideLink(first.key, first.label, first.href, first.icon, active);
    html += sideLink('market', '任务市场', 'tasks.html', 'grid', active);
    html += sideLink('messages', '消息中心', 'workspace.html#messages', 'message', active, 3);
    html += sideLink('finance', '资金中心', 'payment.html', 'wallet', active);
    html += sideLink('settings', '账户设置', 'workspace.html#settings', 'settings', active);
    if (role === 'admin') {
      html += '<p class="side-label">管理</p>';
      html += sideLink('admin', '平台后台', 'admin.html', 'shield', active);
    } else if (role === 'enterprise') {
      html += '<p class="side-label">管理</p>';
      html += sideLink('publish', '发布任务', 'publish.html', 'plus', active);
    }
    html += '</nav>';
    html += '<div class="sidebar-foot">' +
      '<a class="side-help" href="index.html#faq">' + icon('message') + '<span>帮助与反馈</span>' + icon('arrow-up-right', 'tiny') + '</a>' +
      '<div class="side-user"><span class="avatar">' + esc(getSession() ? getSession().avatar : '林') + '</span>' +
      '<div><b>' + esc(getSession() ? getSession().name : '林知远') + '</b><small>' + esc(getSession() ? getSession().label : '学生') + '</small></div>' +
      '<button type="button" class="icon-btn tiny" data-logout aria-label="退出登录">' + icon('logout') + '</button></div>' +
      '</div>';
    return html;
  }

  function renderReviewSidebar(active) {
    var host = qs('#appSidebar');
    if (!host) return;
    var s = ensureSession('mentor');
    host.innerHTML = '<div class="sidebar-brand">' + brandHTML() + '<span class="admin-tag" style="border-color:#cfd9d3;color:#23684c;background:#eaf1ea">REVIEW</span></div>' +
      '<div class="scope-card"><span class="scope-dot"></span><div><b>审核工作台</b><small>匿名评审 · 2026 秋季</small></div></div>' +
      '<nav class="side-nav" aria-label="审核工作台导航">' +
      '<p class="side-label">评审</p>' +
      sideLink('review', '进行中项目', 'review.html', 'layers', active, 4) +
      sideLink('pending', '待审核事项', 'review.html#pending', 'shield', active, 2) +
      sideLink('history', '已审核记录', 'review.html#history', 'check-circle', active) +
      '<p class="side-label">支持</p>' +
      sideLink('messages', '消息中心', 'workspace.html#messages', 'message', active, 3) +
      sideLink('rules', '评审规则', 'index.html#works', 'file', active) +
      '</nav>' +
      '<div class="sidebar-foot">' +
      '<a class="side-help" href="index.html#faq">' + icon('message') + '<span>帮助与反馈</span>' + icon('arrow-up-right', 'tiny') + '</a>' +
      '<div class="side-user"><span class="avatar">' + esc(s.avatar) + '</span><div><b>' + esc(s.name) + '</b><small>' + esc(s.label) + ' · 匿名评审</small></div>' +
      '<button type="button" class="icon-btn tiny" data-logout aria-label="退出登录">' + icon('logout') + '</button></div>' +
      '</div>';
  }

  function sideLink(key, label, href, ic, active, badge) {
    return '<a class="side-link ' + (active === key ? 'is-active' : '') + '" href="' + href + '">' + icon(ic) + '<span>' + label + '</span>' +
      (badge ? '<em class="side-badge">' + badge + '</em>' : '') + '</a>';
  }

  function renderAppSidebar(active) {
    var host = qs('#appSidebar');
    if (!host) return;
    var s = ensureSession('student');
    host.innerHTML = sideNavFor(s.role, active);
  }

  function renderAppTopbar(opts) {
    var host = qs('#appTopbar');
    if (!host) return;
    opts = opts || {};
    var s = ensureSession('student');
    var notifs = (DATA.notifications || []).slice(0, 3);
    var notifHTML = notifs.map(function (n) {
      return '<a class="menu-notice" href="' + n.href + '"><span class="notice-ic">' + icon(n.icon) + '</span><span><b>' + esc(n.title) + '</b><small>' + esc(n.time) + '</small></span></a>';
    }).join('');

    host.innerHTML = '<button class="icon-btn sidebar-toggle" type="button" data-sidebar-toggle aria-label="打开侧栏">' + icon('menu') + '</button>' +
      '<div class="topbar-crumb"><span>' + esc(opts.root || '工作台') + '</span>' + icon('chevron-right', 'tiny') + '<b>' + esc(opts.title || '概览') + '</b></div>' +
      '<div class="topbar-search">' + icon('search') + '<input type="search" placeholder="搜索任务、项目、订单" data-global-search aria-label="全局搜索"></div>' +
      '<div class="topbar-actions">' +
        (s.demo ? '<span class="demo-pill">' + icon('info') + '体验模式</span>' : '') +
        '<a class="icon-btn hide-sm" href="payment.html" aria-label="资金中心">' + icon('wallet') + '</a>' +
        '<div class="dropdown">' +
          '<button class="icon-btn has-dot" type="button" data-menu-toggle="notifMenu" aria-label="通知" aria-expanded="false">' + icon('bell') + '<span class="dot"></span></button>' +
          '<div class="dropdown-menu notif-menu" id="notifMenu" hidden>' +
            '<div class="menu-head"><b>通知</b><span>3 条未读</span></div>' + notifHTML +
            '<a class="menu-foot" href="workspace.html#messages">查看全部通知' + icon('arrow-right', 'tiny') + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="dropdown">' +
          '<button class="user-chip app-user" type="button" data-menu-toggle="appUserMenu" aria-expanded="false">' +
            '<span class="avatar avatar-sm">' + esc(s.avatar) + '</span>' +
            '<span class="user-chip-text"><b>' + esc(s.name) + '</b><small>' + esc(s.label) + '</small></span>' + icon('chevron-down', 'chev') +
          '</button>' +
          '<div class="dropdown-menu user-menu" id="appUserMenu" hidden>' +
            '<div class="menu-user"><span class="avatar">' + esc(s.avatar) + '</span><div><b>' + esc(s.name) + '</b><small>' + esc(s.sub) + '</small></div></div>' +
            '<a href="workspace.html">' + icon('home') + '工作台</a>' +
            '<a href="payment.html">' + icon('wallet') + '资金中心</a>' +
            '<a href="workspace.html#settings">' + icon('settings') + '账户设置</a>' +
            '<button type="button" data-logout>' + icon('logout') + '退出登录</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    var search = qs('[data-global-search]', host);
    if (search) {
      search.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          window.location.href = 'tasks.html?q=' + encodeURIComponent(search.value.trim());
        }
      });
    }
  }

  function renderAdminSidebar(active) {
    var host = qs('#adminSidebar');
    if (!host) return;
    var s = ensureSession('admin');
    var items = [
      { key: 'dashboard', label: '数据看板', icon: 'grid', href: 'admin.html' },
      { key: 'review', label: '任务审核', icon: 'shield', href: 'admin.html#review', badge: 7 },
      { key: 'users', label: '用户管理', icon: 'users', href: 'admin.html#users' },
      { key: 'finance', label: '财务对账', icon: 'receipt', href: 'admin.html#finance' },
      { key: 'content', label: '内容运营', icon: 'flag', href: 'admin.html#content' },
      { key: 'logs', label: '操作日志', icon: 'list', href: 'admin.html#logs' }
    ];
    host.innerHTML = '<div class="sidebar-brand">' + brandHTML('brand-light') + '<span class="admin-tag">ADMIN</span></div>' +
      '<div class="scope-card dark"><span class="scope-dot"></span><div><b>运营后台</b><small>双创中心 · 2026 秋季</small></div></div>' +
      '<nav class="side-nav dark">' +
        items.map(function (it) {
          return '<a class="side-link ' + (active === it.key ? 'is-active' : '') + '" href="' + it.href + '">' + icon(it.icon) + '<span>' + it.label + '</span>' + (it.badge ? '<em class="side-badge">' + it.badge + '</em>' : '') + '</a>';
        }).join('') +
      '</nav>' +
      '<div class="sidebar-foot dark">' +
        '<a class="side-help" href="index.html">' + icon('external') + '<span>返回前台</span></a>' +
        '<div class="side-user"><span class="avatar">' + esc(s.avatar) + '</span><div><b>' + esc(s.name) + '</b><small>' + esc(s.label) + '</small></div>' +
        '<button type="button" class="icon-btn tiny" data-logout aria-label="退出登录">' + icon('logout') + '</button></div>' +
      '</div>';
  }

  /* ---------- 全局事件 ---------- */
  function isAppPage() {
    return document.body.classList.contains('app-body') || document.body.classList.contains('admin-body');
  }

  function isSamePageHref(href) {
    if (!href || href.charAt(0) === '#') return true;
    try {
      var u = new URL(href, location.href);
      return u.pathname === location.pathname && u.search === location.search;
    } catch (e) {
      return false;
    }
  }

  function applyLinkPolicy() {
    if (isAppPage()) return;
    qsa('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || a.target || a.hasAttribute('data-same-tab') || a.hasAttribute('download')) return;
      if (/^(#|javascript:|mailto:|tel:|https?:)/i.test(href)) return;
      if (!/\.html(\?|#|$)/i.test(href)) return;
      if (isSamePageHref(href)) return;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  function initBackToTop() {
    if (isAppPage() || qs('.back-top')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-top';
    btn.setAttribute('aria-label', '回到顶部');
    btn.innerHTML = icon('chevron-up');
    document.body.appendChild(btn);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function onScroll() {
      btn.classList.toggle('is-on', window.scrollY > 420);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  var uiReady = false;
  function initUI() {
    if (uiReady) return;
    uiReady = true;

    document.addEventListener('click', function (e) {
      var logoutBtn = e.target.closest('[data-logout]');
      if (logoutBtn) { e.preventDefault(); logout(); return; }

      var menuBtn = e.target.closest('[data-menu-toggle]');
      if (menuBtn) {
        e.preventDefault();
        e.stopPropagation();
        var id = menuBtn.getAttribute('data-menu-toggle');
        var menu = document.getElementById(id);
        var willOpen = menu && menu.hasAttribute('hidden');
        qsa('.dropdown-menu').forEach(function (m) { m.setAttribute('hidden', ''); });
        qsa('[data-menu-toggle]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
        if (menu && willOpen) {
          menu.removeAttribute('hidden');
          menuBtn.setAttribute('aria-expanded', 'true');
        }
        return;
      }

      if (!e.target.closest('.dropdown')) {
        qsa('.dropdown-menu').forEach(function (m) { m.setAttribute('hidden', ''); });
        qsa('[data-menu-toggle]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      }

      var openBtn = e.target.closest('[data-modal-open]');
      if (openBtn) { e.preventDefault(); openModal(openBtn.getAttribute('data-modal-open')); return; }

      var closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) { e.preventDefault(); closeModal(closeBtn); return; }
      if (e.target.classList.contains('modal')) { closeModal(e.target); return; }

      var copyBtn = e.target.closest('[data-copy]');
      if (copyBtn) {
        e.preventDefault();
        var value = copyBtn.getAttribute('data-copy');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(function () { toast('已复制：' + value, 'info'); });
        } else {
          toast('已复制：' + value, 'info');
        }
        return;
      }

      var toastBtn = e.target.closest('[data-toast]');
      if (toastBtn) { e.preventDefault(); toast(toastBtn.getAttribute('data-toast'), toastBtn.getAttribute('data-toast-type') || 'info'); return; }

      var bookmark = e.target.closest('[data-bookmark]');
      if (bookmark) { e.preventDefault(); e.stopPropagation(); toggleBookmark(bookmark.getAttribute('data-bookmark')); return; }

      var sidebarToggle = e.target.closest('[data-sidebar-toggle]');
      if (sidebarToggle) { document.body.classList.toggle('sidebar-open'); return; }
      if (e.target.closest('[data-sidebar-close]')) { document.body.classList.remove('sidebar-open'); return; }
    });

    /* 营销页面内链默认新标签页打开；应用内重页面保持当前页跳转 */
    if (!isAppPage()) {
      document.addEventListener('click', function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var a = e.target.closest('a[href]');
        if (!a || a.target || a.hasAttribute('data-same-tab') || a.hasAttribute('download')) return;
        var href = a.getAttribute('href');
        if (!href || /^(#|javascript:|mailto:|tel:|https?:)/i.test(href)) return;
        if (isSamePageHref(href)) return;
        e.preventDefault();
        window.open(a.href, '_blank', 'noopener');
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        qsa('.modal.is-open').forEach(closeModal);
        qsa('.dropdown-menu').forEach(function (m) { m.setAttribute('hidden', ''); });
        document.body.classList.remove('sidebar-open', 'menu-open');
      }
    });

    var header = qs('#siteHeader');
    if (header) {
      var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    qsa('[data-reveal]').forEach(function (el) { el.classList.add('reveal'); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      qsa('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      qsa('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    }

    qsa('[data-count]').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
      el.textContent = target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    });

    /* 收藏状态回填 */
    var marks = getBookmarks();
    qsa('[data-bookmark]').forEach(function (btn) {
      if (marks.indexOf(btn.getAttribute('data-bookmark')) > -1) {
        btn.classList.add('is-on');
        btn.setAttribute('aria-pressed', 'true');
      }
    });
  }

  function initChrome(active) {
    renderHeader(active);
    renderFooter();
    initUI();
    applyLinkPolicy();
    initBackToTop();
  }

  /* ---------- 数据与格式化 ---------- */
  function findTask(id) {
    return (DATA.tasks || []).filter(function (t) { return t.id === id; })[0] || null;
  }
  function lineLabel(line) { return line === 'A' ? 'A 线 · 小组实践' : 'B 线 · 个人毕设'; }
  function lineShort(line) { return line === 'A' ? 'A 线' : 'B 线'; }
  function statusText(status) {
    return { open: '认领中', matched: '已认领', closing: '即将截止' }[status] || '认领中';
  }

  RTW.qs = qs;
  RTW.qsa = qsa;
  RTW.esc = esc;
  RTW.icon = icon;
  RTW.money = money;
  RTW.read = read;
  RTW.write = write;
  RTW.param = param;
  RTW.toast = toast;
  RTW.openModal = openModal;
  RTW.closeModal = closeModal;
  RTW.getSession = getSession;
  RTW.ensureSession = ensureSession;
  RTW.loginDemo = loginDemo;
  RTW.signIn = signIn;
  RTW.logout = logout;
  RTW.switchRole = switchRole;
  RTW.initUI = initUI;
  RTW.initChrome = initChrome;
  RTW.renderAppSidebar = renderAppSidebar;
  RTW.renderReviewSidebar = renderReviewSidebar;
  RTW.renderAppTopbar = renderAppTopbar;
  RTW.applyLinkPolicy = applyLinkPolicy;
  RTW.renderAdminSidebar = renderAdminSidebar;
  RTW.findTask = findTask;
  RTW.lineLabel = lineLabel;
  RTW.lineShort = lineShort;
  RTW.statusText = statusText;
  RTW.ROLE_META = ROLE_META;
  RTW.getBookmarks = getBookmarks;
})();
