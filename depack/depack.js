'use strict';
let DEPACK_EXPORT;
const http = require('http');'use strict';
const p = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function q(a) {
  return a.split(",").map((b, c) => {
    var e = p.exec(b.trim());
    if (e) {
      b = e[1];
      var g = 1;
      if (e[2]) {
        e = e[2].split(";");
        for (let k = 0; k < e.length; k++) {
          const d = e[k].trim().split("=");
          if ("q" == d[0]) {
            g = parseFloat(d[1]);
            break;
          }
        }
      }
      c = {charset:b, q:g, c};
    } else {
      c = null;
    }
    if (c) {
      return c;
    }
  }).filter(Boolean);
}
function r(a, b) {
  const c = q(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(t).sort(u).map(v);
  }
  const e = b.map((g, k) => {
    {
      let h = {a:-1, q:0, b:0};
      for (let f = 0; f < c.length; f++) {
        a: {
          var d = c[f];
          let l = 0;
          if (d.charset.toLowerCase() === g.toLowerCase()) {
            l |= 1;
          } else {
            if ("*" != d.charset) {
              d = null;
              break a;
            }
          }
          d = {c:k, b:l, a:d.c, q:d.q};
        }
        d && 0 > (h.b - d.b || h.q - d.q || h.a - d.a) && (h = d);
      }
      g = h;
    }
    return g;
  });
  return e.filter(t).sort(u).map(g => b[e.indexOf(g)]);
}
function u(a, b) {
  return b.q - a.q || b.b - a.b || a.a - b.a || a.c - b.c || 0;
}
function v(a) {
  return a.charset;
}
function t(a) {
  return 0 < a.q;
}
;const w = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function x(a) {
  a = a.split(",");
  for (var b = !1, c = 1, e = 0, g = 0; e < a.length; e++) {
    var k = e;
    var d = w.exec(a[e].trim());
    if (d) {
      var h = d[1], f = 1;
      if (d[2]) {
        d = d[2].split(";");
        for (var l = 0; l < d.length; l++) {
          var m = d[l].trim().split("=");
          if ("q" == m[0]) {
            f = parseFloat(m[1]);
            break;
          }
        }
      }
      k = {encoding:h, q:f, c:k};
    } else {
      k = null;
    }
    k && (a[g++] = k, b = b || y("identity", k, void 0), c = Math.min(c, k.q || 1));
  }
  b || (a[g++] = {encoding:"identity", q:c, c:e});
  a.length = g;
  return a;
}
function y(a, b, c) {
  var e = 0;
  if (b.encoding.toLowerCase() === a.toLowerCase()) {
    e |= 1;
  } else {
    if ("*" !== b.encoding) {
      return null;
    }
  }
  return {c, a:b.c, q:b.q, b:e};
}
function z(a, b) {
  var c = x(a || "");
  if (!b) {
    return c.filter(A).sort(B).map(C);
  }
  var e = b.map(function(g, k) {
    for (var d = {a:-1, q:0, b:0}, h = 0; h < c.length; h++) {
      var f = y(g, c[h], k);
      f && 0 > (d.b - f.b || d.q - f.q || d.a - f.a) && (d = f);
    }
    return d;
  });
  return e.filter(A).sort(B).map(function(g) {
    return b[e.indexOf(g)];
  });
}
function B(a, b) {
  return b.q - a.q || b.b - a.b || a.a - b.a || a.c - b.c || 0;
}
function C(a) {
  return a.encoding;
}
function A(a) {
  return 0 < a.q;
}
;const D = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function E(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var e = F(a[b].trim(), b);
    e && (a[c++] = e);
  }
  a.length = c;
  return a;
}
function F(a, b) {
  var c = D.exec(a);
  if (!c) {
    return null;
  }
  a = c[1];
  var e = c[2], g = a;
  e && (g += "-" + e);
  var k = 1;
  if (c[3]) {
    c = c[3].split(";");
    for (var d = 0; d < c.length; d++) {
      var h = c[d].split("=");
      "q" == h[0] && (k = parseFloat(h[1]));
    }
  }
  return {prefix:a, i:e, q:k, c:b, f:g};
}
function G(a, b) {
  var c = E(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(H).sort(I).map(J);
  }
  var e = b.map(function(g, k) {
    for (var d = {a:-1, q:0, b:0}, h = 0; h < c.length; h++) {
      a: {
        var f = c[h];
        var l = k, m = F(g, void 0);
        if (m) {
          var n = 0;
          if (f.f.toLowerCase() === m.f.toLowerCase()) {
            n |= 4;
          } else {
            if (f.prefix.toLowerCase() === m.f.toLowerCase()) {
              n |= 2;
            } else {
              if (f.f.toLowerCase() === m.prefix.toLowerCase()) {
                n |= 1;
              } else {
                if ("*" !== f.f) {
                  f = null;
                  break a;
                }
              }
            }
          }
          f = {c:l, a:f.c, q:f.q, b:n};
        } else {
          f = null;
        }
      }
      f && 0 > (d.b - f.b || d.q - f.q || d.a - f.a) && (d = f);
    }
    return d;
  });
  return e.filter(H).sort(I).map(function(g) {
    return b[e.indexOf(g)];
  });
}
function I(a, b) {
  return b.q - a.q || b.b - a.b || a.a - b.a || a.c - b.c || 0;
}
function J(a) {
  return a.f;
}
function H(a) {
  return 0 < a.q;
}
;const K = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function L(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == M(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var e = N(a[b].trim(), b);
    e && (a[c++] = e);
  }
  a.length = c;
  return a;
}
function N(a, b) {
  var c = K.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var e = 1, g = c[2], k = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var d = 1, h = 0; d < c.length; d++) {
      0 == M(c[h]) % 2 ? c[++h] = c[d] : c[h] += ";" + c[d];
    }
    c.length = h + 1;
    for (d = 0; d < c.length; d++) {
      c[d] = c[d].trim();
    }
    c = c.map(O);
    for (d = 0; d < c.length; d++) {
      var f = c[d];
      h = f[0].toLowerCase();
      f = (f = f[1]) && '"' === f[0] && '"' === f[f.length - 1] ? f.substr(1, f.length - 2) : f;
      if ("q" === h) {
        e = parseFloat(f);
        break;
      }
      a[h] = f;
    }
  }
  return {type:k, h:g, g:a, q:e, c:b};
}
function P(a, b, c) {
  var e = N(a, void 0);
  a = 0;
  if (!e) {
    return null;
  }
  if (b.type.toLowerCase() == e.type.toLowerCase()) {
    a |= 4;
  } else {
    if ("*" != b.type) {
      return null;
    }
  }
  if (b.h.toLowerCase() == e.h.toLowerCase()) {
    a |= 2;
  } else {
    if ("*" != b.h) {
      return null;
    }
  }
  var g = Object.keys(b.g);
  if (0 < g.length) {
    if (g.every(function(k) {
      return "*" == b.g[k] || (b.g[k] || "").toLowerCase() == (e.g[k] || "").toLowerCase();
    })) {
      a |= 1;
    } else {
      return null;
    }
  }
  return {c, a:b.c, q:b.q, b:a};
}
function Q(a, b) {
  var c = L(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(R).sort(S).map(T);
  }
  var e = b.map(function(g, k) {
    for (var d = {a:-1, q:0, b:0}, h = 0; h < c.length; h++) {
      var f = P(g, c[h], k);
      f && 0 > (d.b - f.b || d.q - f.q || d.a - f.a) && (d = f);
    }
    return d;
  });
  return e.filter(R).sort(S).map(function(g) {
    return b[e.indexOf(g)];
  });
}
function S(a, b) {
  return b.q - a.q || b.b - a.b || a.a - b.a || a.c - b.c || 0;
}
function T(a) {
  return a.type + "/" + a.h;
}
function R(a) {
  return 0 < a.q;
}
function M(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function O(a) {
  var b = a.indexOf("=");
  if (-1 === b) {
    var c = a;
  } else {
    c = a.substr(0, b);
    var e = a.substr(b + 1);
  }
  return [c, e];
}
;/*
 MIT
 Copyright(c) 2012 Federico Romero
 Copyright(c) 2012-2014 Isaac Z. Schlueter
 Copyright(c) 2015 Douglas Christopher Wilson
 https://www.npmjs.com/package/negotiator
*/
class U {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return r(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return z(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return G(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return Q(this.headers.accept, a);
  }
}
;DEPACK_EXPORT = U;


module.exports = DEPACK_EXPORT
//# sourceMappingURL=depack.js.map