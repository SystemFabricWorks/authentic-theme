(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(b){b.defineMode("shell",function(){var j={};function h(c,f){var d=f.split(" ");for(var e=0;e<d.length;e++){j[d[e]]=c}}h("atom","true false");h("keyword","if then do else elif while until for in esac fi fin fil done exit set unset export function");h("builtin","ab awk bash beep cat cc cd chown chmod chroot clear cp curl cut diff echo find gawk gcc get git grep kill killall ln ls make mkdir openssl mv nc node npm ping ps restart rm rmdir sed service sh shopt shred source sort sleep ssh start stop su sudo tee telnet top touch vi vim wall wc wget who write yes zsh");function i(c,e){if(c.eatSpace()){return null}var f=c.sol();var g=c.next();if(g==="\\"){c.next();return null}if(g==="'"||g==='"'||g==="`"){e.tokens.unshift(l(g,g==="`"?"quote":"string"));return k(c,e)}if(g==="#"){if(f&&c.eat("!")){c.skipToEnd();return"meta"}c.skipToEnd();return"comment"}if(g==="$"){e.tokens.unshift(a);return k(c,e)}if(g==="+"||g==="="){return"operator"}if(g==="-"){c.eat("-");c.eatWhile(/\w/);return"attribute"}if(/\d/.test(g)){c.eatWhile(/\d/);if(c.eol()||!/\w/.test(c.peek())){return"number"}}c.eatWhile(/[\w-]/);var d=c.current();if(c.peek()==="="&&/\w+/.test(d)){return"def"}return j.hasOwnProperty(d)?j[d]:null}function l(e,d){var c=e=="("?")":e=="{"?"}":e;return function(q,f){var g,p=false,r=false;while((g=q.next())!=null){if(g===c&&!r){p=true;break}if(g==="$"&&!r&&e!=="'"){r=true;q.backUp(1);f.tokens.unshift(a);break}if(!r&&g===e&&e!==c){f.tokens.unshift(l(e,d));return k(q,f)}r=!r&&g==="\\"}if(p||!r){f.tokens.shift()}return d}}var a=function(c,d){if(d.tokens.length>1){c.eat("$")}var e=c.next();if(/['"({]/.test(e)){d.tokens[0]=l(e,e=="("?"quote":e=="{"?"def":"string");return k(c,d)}if(!/\d/.test(e)){c.eatWhile(/\w/)}d.tokens.shift();return"def"};function k(c,d){return(d.tokens[0]||i)(c,d)}return{startState:function(){return{tokens:[]}},token:function(c,d){return k(c,d)},closeBrackets:"()[]{}''\"\"``",lineComment:"#",fold:"brace"}});b.defineMIME("text/x-sh","shell")});