#! /usr/bin/env node
var r=(s,t)=>()=>(t||s((t={exports:{}}).exports,t),t.exports);var i=r((T,u)=>{function P(s){return`[33m${s}[0m`}function q(s){return`[36m${s}[0m`}function $(s){return`[31m${s}[0m`}u.exports={yellow:P,cyan:q,red:$}});var c=r((V,d)=>{var{yellow:a}=i();function y(s){process.stdout.write(a(`You have more than one session running:

`)),process.stdout.write(s.map(t=>`- ${t}`).join(`
`)),process.stdout.write(`

`)}function N(){process.stdout.write(`Usage: vpn [options]

`),process.stdout.write(a(`options:
`)),process.stdout.write(`start   -   start a new session
`),process.stdout.write(`stop    -   stop the current session
`),process.stdout.write(`status  -   print the session status
`)}d.exports={printUsage:N,printSessionsPath:y}});var w=r((j,f)=>{function O(s=[]){let t=s[0]||"";t=t.substring(t.indexOf("=")+1);let e=s[1]||"";return e=e.substring(e.indexOf("=")+1),{username:t,password:e}}f.exports={parseOptions:O}});var S=r((E,x)=>{var{spawnSync:p,spawn:h}=require("child_process"),{printSessionsPath:l}=c(),{red:m,yellow:g,cyan:v}=i(),{parseOptions:C}=w();function b(){let{stdout:s,stderr:t}=p("openvpn3",["sessions-list"],{encoding:"utf8"});return t&&(process.stderr.write(t),process.exit()),s.split(`
`).map(e=>e.trim()).filter(e=>e.startsWith("Path: ")).map(e=>e.split(": ").pop())}function _(){let s=b();s.length===0&&(process.stdout.write(g(`No active sessions found
`)),process.exit()),s.length>1&&(l(s),process.stdout.write(`Run the following command to get the specific session status
`),process.stdout.write(v(`openvpn3 session-stats --path <path>
`)),process.exit());let[t]=s,{stdout:e,stderr:o}=p("openvpn3",["session-stats","--path",t],{encoding:"utf8"});o&&(process.stderr.write(o),process.exit()),process.stdout.write(e)}function R(){let s=b();s.length===0&&(process.stdout.write(g(`No active session found
`)),process.exit()),s.length>1&&(l(s),process.stdout.write(`Run the following command to stop a specific session
`),process.stdout.write(v(`openvpn3 session-manage --disconnect --path <path>
`)),process.exit());let[t]=s,{stdout:e,stderr:o}=p("openvpn3",["session-manage","--disconnect","--path",t],{encoding:"utf8"});o&&(process.stderr.write(o),process.exit()),process.stdout.write(e)}function W(s,t,e){let o=h("openvpn3",["session-start","--config",e],{encoding:"utf8"});o.stdout.on("data",n=>{process.stdout.write(n),n.toString().trim().toLowerCase().startsWith("auth user name")&&(process.stdout.write(`${s}
`),o.stdin.write(`${s}
`)),n.toString().trim().toLowerCase().startsWith("auth password")&&(process.stdout.write("******"),o.stdin.write(`${t}
`)),n.toString().trim().toLowerCase().startsWith("enter a passcode")&&(process.stdout.write(`1
`),o.stdin.write(`1
`))}),o.stderr.on("data",n=>{process.stderr.write(n)})}function k(s){let t=h("openvpn3",["session-start","--config",s]);t.stdout.pipe(process.stdout),process.stdin.pipe(t.stdin)}function A(s=[]){let{VPN_CONFIG_PATH:t}=process.env;if(t||(process.stderr.write(m("Environment variable `VPN_CONFIG_PATH` not defined. Refer to the setup guide.\n")),process.exit()),s.length===0)k(t);else{let{username:e,password:o}=C(s);(!e||!o)&&(process.stderr.write(m(`username or password is not defined. Refer to the setup guide.
`)),process.exit()),W(e,o,t)}}x.exports={start:A,stopSession:R,sessionStatus:_}});var{printUsage:L}=c(),{start:U,stopSession:F,sessionStatus:G}=S();function H(){let s=process.argv.slice(2);switch(s.pop()){case"start":U(s);break;case"stop":F();break;case"status":G();break;default:L()}}H();
