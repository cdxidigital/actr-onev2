import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as cn } from "./router-ByLt-HX2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DMDVkyT6.js
var import_jsx_runtime = require_jsx_runtime();
var STATUS = {
	New: "bg-accent/12 text-accent",
	Preparing: "bg-accent/12 text-accent",
	Confirmed: "bg-ok/15 text-ok",
	Submitted: "bg-ok/15 text-ok",
	Callback: "bg-warn/15 text-warn",
	Booked: "bg-ok/20 text-ok",
	Closed: "bg-muted text-muted-fg"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full px-2.5 py-1 font-mono text-2xs tracking-wide", STATUS[status]),
		children: status
	});
}
//#endregion
export { StatusBadge as t };
