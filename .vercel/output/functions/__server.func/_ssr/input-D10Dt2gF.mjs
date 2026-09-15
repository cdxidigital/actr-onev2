import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as cn } from "./router-ByLt-HX2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-D10Dt2gF.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg placeholder:text-muted-fg", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-32 w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-muted-fg", className),
		...props
	});
}
function NativeSelect({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg", className),
		...props
	});
}
//#endregion
export { NativeSelect as n, Textarea as r, Input as t };
