/* 真题工场 · 图标精灵（纯前端，无外部依赖） */
(function () {
  var ICONS = {
    'arrow-right': '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H5"/><path d="m11 6-6 6 6 6"/>',
    'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    'search': '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
    'bell': '<path d="M18 8a6 6 0 0 0-12 0c0 6-2 8-2 8h16s-2-2-2-8"/><path d="M10.3 20a2 2 0 0 0 3.4 0"/>',
    'user': '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.6-3.6 3.6-5.5 7.5-5.5s6.9 1.9 7.5 5.5"/>',
    'check': '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.7 2.7L16 9.4"/>',
    'clock': '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>',
    'shield': '<path d="M12 3.2 19.5 6v5.4c0 4.7-3.2 7.6-7.5 8.6-4.3-1-7.5-3.9-7.5-8.6V6L12 3.2Z"/><path d="m9 12 2 2 4-4"/>',
    'wallet': '<rect x="3" y="6" width="18" height="13" rx="2.2"/><path d="M3 10h18"/><path d="M16.5 14.5h1.5"/>',
    'file': '<path d="M13.5 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8.5L13.5 3Z"/><path d="M13.5 3v5.5H19"/><path d="M8.5 13h7M8.5 16.5h5"/>',
    'git': '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="8" r="2.5"/><path d="M6 8.5v7"/><path d="M18 10.5c0 3-2.2 3.2-4.2 3.8-2.4.7-3.8 1.5-3.8 3.7"/>',
    'star': '<path d="m12 3.5 2.6 5.3 5.9.8-4.3 4.1 1.1 5.8L12 16.7 6.7 19.5l1.1-5.8L3.5 9.6l5.9-.8L12 3.5Z"/>',
    'menu': '<path d="M4 7h16M4 12h16M4 17h16"/>',
    'close': '<path d="m6 6 12 12M18 6 6 18"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-up': '<path d="m6 15 6-6 6 6"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    'chevron-left': '<path d="m15 6-6 6 6 6"/>',
    'map-pin': '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    'layers': '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    'users': '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 19c.4-3.2 3-5 6.2-5s5.8 1.8 6.2 5"/><path d="M16 5.5a3 3 0 0 1 0 5.6"/><path d="M18 14.4c2 .5 3.2 2 3.4 4.1"/>',
    'building': '<path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21"/><path d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21"/><path d="M2.5 21h19"/><path d="M7 8h4M7 12h4M7 16h4M17 14h.01M17 18h.01"/>',
    'cap': '<path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z"/><path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/><path d="M21.5 9v5"/>',
    'spark': '<path d="m12 3 1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3Z"/><path d="m18.5 16.5.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'filter': '<path d="M3 6h18M6 12h12M10 18h4"/>',
    'bookmark': '<path d="M6.5 3.5h11A1.5 1.5 0 0 1 19 5v15.5l-7-4.2-7 4.2V5a1.5 1.5 0 0 1 1.5-1.5Z"/>',
    'share': '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4"/>',
    'download': '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 20h16"/>',
    'copy': '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15"/>',
    'alert': '<path d="M12 4 2.8 20h18.4L12 4Z"/><path d="M12 9.5v4.5M12 17.5h.01"/>',
    'trend': '<path d="m3 17 5.5-5.5 3.5 3.5L21 6"/><path d="M15 6h6v6"/>',
    'card': '<rect x="2.5" y="5" width="19" height="14" rx="2.2"/><path d="M2.5 9.5h19"/><path d="M6 14.5h4"/>',
    'qr': '<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2v2h-2zM19.5 14.5h1v1M14.5 19.5h1v1M18 18h2.5v2.5"/>',
    'bank': '<path d="m3 9 9-5 9 5"/><path d="M4.5 9v8M9 9v8M15 9v8M19.5 9v8"/><path d="M3 20h18"/>',
    'lock': '<rect x="4.5" y="10" width="15" height="10.5" rx="2"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>',
    'eye': '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="m3 3 18 18"/><path d="M10.6 6.1A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3 3.6"/><path d="M6.3 7.3A16.5 16.5 0 0 0 2.5 12S6 18 12 18a9.7 9.7 0 0 0 3.8-.8"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    'logout': '<path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14"/><path d="M10 8l-4 4 4 4M6 12h9"/>',
    'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/>',
    'message': '<path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.6-4.8A8.5 8.5 0 1 1 20.5 12Z"/>',
    'calendar': '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    'upload': '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 16v3.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V16"/>',
    'external': '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19.5v-11A1.5 1.5 0 0 1 5.5 7H11"/>',
    'home': '<path d="m3 10.5 9-7 9 7"/><path d="M5.5 9v11h13V9"/><path d="M10 20v-6h4v6"/>',
    'grid': '<rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/>',
    'list': '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
    'receipt': '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    'refresh': '<path d="M20 11a8 8 0 0 0-14-4.5L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14 4.5L21 15"/><path d="M21 20v-5h-5"/>',
    'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>',
    'award': '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1 7 4.5-2.5 4.5 2.5-1-7"/>',
    'play': '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 6 3.5-6 3.5v-7Z"/>',
    'more': '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    'info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    'edit': '<path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/><path d="m13.5 6.5 4 4"/>',
    'target': '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
    'briefcase': '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18"/>',
    'flag': '<path d="M5 21V4"/><path d="M5 4h11l-1.5 4L16 12H5"/>',
    'code': '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14"/>'
  };

  var symbols = Object.keys(ICONS).map(function (name) {
    return '<symbol id="i-' + name + '" viewBox="0 0 24 24">' + ICONS[name] + '</symbol>';
  }).join('');

  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">' +
    '<defs>' + symbols + '</defs></svg>';

  if (document.currentScript && document.currentScript.parentNode) {
    document.currentScript.insertAdjacentHTML('afterend', sprite);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.insertAdjacentHTML('afterbegin', sprite);
    });
  }
})();
