(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/views/ContractTabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContractTabs",
    ()=>ContractTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.mjs [app-client] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.mjs [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.mjs [app-client] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.mjs [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.mjs [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.mjs [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.mjs [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.mjs [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.mjs [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/labels.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const TABS = [
    {
        id: 'dados',
        label: 'Dados Gerais',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 26,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'empresa',
        label: 'Empresa',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 27,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'fiscal',
        label: 'Fiscal',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 28,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'gestor',
        label: 'Gestor',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 29,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'vigencia',
        label: 'Vigência',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 30,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'aditivos',
        label: 'Aditivos',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 31,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'fiscalizacoes',
        label: 'Fiscalizações',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 32,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'ocorrencias',
        label: 'Ocorrências',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 33,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'pagamentos',
        label: 'Pagamentos',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 34,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'alertas',
        label: 'Alertas',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 35,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: 'historico',
        label: 'Histórico',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 36,
            columnNumber: 55
        }, ("TURBOPACK compile-time value", void 0))
    }
];
// ── Helpers ───────────────────────────────────────────────────────────────────
const inputCls = 'w-full bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50';
const badgeCls = (color)=>`px-2 py-0.5 rounded text-[10px] font-semibold border ${color}`;
const infoRow = (label, value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 60,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-gray-800",
                children: value || '—'
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 61,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, label, true, {
        fileName: "[project]/src/components/views/ContractTabs.tsx",
        lineNumber: 59,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// ── Succession Panel ──────────────────────────────────────────────────────────
function SuccessionPanel({ contract, user, onSave, onNavigate }) {
    _s();
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [succType, setSuccType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('contract');
    const [refNumber, setRefNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [found, setFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notFound, setNotFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { data: contractsList } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'contracts-list',
            user.id
        ],
        queryFn: {
            "SuccessionPanel.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].contracts.list()
        }["SuccessionPanel.useQuery"],
        staleTime: 120_000
    });
    const { data: processesList } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'processes',
            user.id,
            user.role
        ],
        queryFn: {
            "SuccessionPanel.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].processes.list()
        }["SuccessionPanel.useQuery"],
        staleTime: 120_000
    });
    const isGestor = user.role === 'GESTOR';
    const successionInfo = contract.successionInfo;
    const reset = ()=>{
        setEditing(false);
        setFound(null);
        setRefNumber('');
        setNotFound(false);
    };
    const handleSearch = ()=>{
        setNotFound(false);
        setFound(null);
        const term = refNumber.trim().toLowerCase();
        if (!term) return;
        if (succType === 'contract') {
            const hit = (contractsList ?? []).find((x)=>x.contractNumber.toLowerCase() === term && x.id !== contract.id);
            hit ? setFound(hit) : setNotFound(true);
        } else {
            const hit = (processesList ?? []).find((x)=>x.processNumber.toLowerCase() === term);
            hit ? setFound(hit) : setNotFound(true);
        }
    };
    const handleSave = ()=>{
        if (!found) return;
        onSave({
            type: succType,
            refNumber: succType === 'contract' ? found.contractNumber : found.processNumber,
            refId: found.id,
            label: succType === 'contract' ? (found.objectDescription ?? '').substring(0, 60) : (found.subject ?? '').substring(0, 60),
            savedAt: new Date().toISOString()
        });
        reset();
    };
    // ── Saved: show link ──
    if (successionInfo && !editing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 pt-5 border-t border-gray-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                                    className: "h-3.5 w-3.5 text-violet-400"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                    children: "Sucessão do Contrato"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setEditing(true);
                                setRefNumber(successionInfo.refNumber);
                                setSuccType(successionInfo.type);
                            },
                            className: "text-[9px] text-gray-500 hover:text-gray-700 border border-gray-300 hover:border-gray-300 px-2 py-0.5 rounded transition-colors cursor-pointer",
                            children: "Alterar"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-violet-500/5 border border-violet-500/20 rounded-xl p-4 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-gray-500 leading-relaxed",
                            children: [
                                "Este contrato foi indicado como substituído por ",
                                successionInfo.type === 'contract' ? 'outro contrato' : 'novo processo licitatório',
                                ".",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-400",
                                    children: [
                                        "Registrado em ",
                                        new Date(successionInfo.savedAt).toLocaleDateString('pt-BR'),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 142,
                                    columnNumber: 18
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                if (!onNavigate) return;
                                successionInfo.type === 'contract' ? onNavigate('details', successionInfo.refId) : onNavigate('processes');
                            },
                            disabled: !onNavigate,
                            className: "flex items-center gap-3 w-full bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 px-4 py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-40 group text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                    className: "h-4 w-4 text-violet-400 shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-violet-300 group-hover:text-violet-200 transition-colors",
                                            children: [
                                                successionInfo.type === 'contract' ? '↗ Contrato Substituto' : '↗ Processo Substituto',
                                                ": ",
                                                successionInfo.refNumber
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        successionInfo.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-gray-500 mt-0.5 line-clamp-1",
                                            children: successionInfo.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 159,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[9px] text-violet-600 mt-0.5 group-hover:text-violet-500 transition-colors",
                                            children: "Clique para acessar o item cadastrado →"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 126,
            columnNumber: 7
        }, this);
    }
    // ── Editing form ──
    if (editing && isGestor) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 pt-5 border-t border-gray-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                            className: "h-3.5 w-3.5 text-violet-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                            children: "Indicar Sucessão do Contrato"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-100/30 border border-gray-300 rounded-xl p-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-gray-500 leading-relaxed",
                            children: "Indique qual contrato ou processo substituiu este. Após salvo, o número aparece como link direto para o item cadastrado."
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2",
                                    children: "Tipo de Sucessão"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        {
                                            key: 'contract',
                                            label: 'Substituído por Contrato'
                                        },
                                        {
                                            key: 'process',
                                            label: 'Novo Processo Licitatório'
                                        }
                                    ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setSuccType(opt.key);
                                                setFound(null);
                                                setNotFound(false);
                                            },
                                            className: `py-2 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${succType === opt.key ? 'bg-violet-500/20 border-violet-500/40 text-violet-300' : 'bg-blue-50 border-gray-300 text-gray-500 hover:border-gray-300'}`,
                                            children: opt.label
                                        }, opt.key, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5",
                                    children: succType === 'contract' ? 'Número do Contrato Substituto' : 'Número do Processo Substituto'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: refNumber,
                                            onChange: (e)=>{
                                                setRefNumber(e.target.value);
                                                setFound(null);
                                                setNotFound(false);
                                            },
                                            onKeyDown: (e)=>e.key === 'Enter' && handleSearch(),
                                            placeholder: succType === 'contract' ? 'Ex: CT-2025/001' : 'Ex: PROC-2025/001',
                                            className: "flex-1 bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSearch,
                                            disabled: !refNumber.trim(),
                                            className: "px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/40 text-violet-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-40",
                                            children: "Buscar"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        found && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-emerald-500/5 border border-emerald-500/25 rounded-xl p-3 flex items-start gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                    className: "h-4 w-4 text-emerald-400 shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-0.5",
                                            children: "Encontrado"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 220,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-gray-800",
                                            children: succType === 'contract' ? found.contractNumber : found.processNumber
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-gray-500 line-clamp-1",
                                            children: succType === 'contract' ? found.objectDescription : found.subject
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 222,
                                            columnNumber: 17
                                        }, this),
                                        succType === 'contract' && found.contractor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-gray-500 mt-0.5",
                                            children: found.contractor?.corporateName || found.contractor?.tradeName
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 224,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this),
                        notFound && !found && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-500/5 border border-red-500/20 rounded-xl p-3 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                    className: "h-4 w-4 text-red-400 shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-red-400",
                                    children: [
                                        succType === 'contract' ? 'Contrato' : 'Processo',
                                        " não encontrado. Verifique o número exato e tente novamente."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: reset,
                                    className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2.5 text-xs font-semibold transition-colors cursor-pointer",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSave,
                                    disabled: !found,
                                    className: "flex-1 bg-violet-500 hover:bg-violet-400 disabled:opacity-40 text-white rounded-lg py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this),
                                        " Salvar Sucessão"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 238,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 172,
            columnNumber: 7
        }, this);
    }
    // ── No succession yet — gestor can add ──
    if (!successionInfo && isGestor) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 pt-5 border-t border-gray-300",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setEditing(true),
                className: "flex items-center justify-center gap-2 w-full text-[11px] text-gray-500 hover:text-violet-400 border border-dashed border-gray-300 hover:border-violet-500/40 px-4 py-3 rounded-xl transition-colors cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                        className: "h-3.5 w-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 259,
                        columnNumber: 11
                    }, this),
                    " Indicar Contrato ou Processo Substituto"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 257,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 256,
            columnNumber: 7
        }, this);
    }
    return null;
}
_s(SuccessionPanel, "0IvDBZY7XvKLwQjKbOFO3xXC9cc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = SuccessionPanel;
// ── Gestor → Fiscal Alert Modal ──────────────────────────────────────────────
const ALERT_TYPES = [
    {
        value: 'DATA_CHANGE_REQUEST',
        label: 'Solicitação de Alteração de Dados'
    },
    {
        value: 'REPORT_REQUEST',
        label: 'Solicitação de Relatório/Informação'
    },
    {
        value: 'DEADLINE_NOTICE',
        label: 'Notificação de Prazo Contratual'
    },
    {
        value: 'COMPLIANCE_NOTICE',
        label: 'Notificação de Inconformidade'
    },
    {
        value: 'GENERAL_NOTICE',
        label: 'Comunicado Geral ao Fiscal'
    }
];
function GestorAlertModal({ contractId, fiscalId, fiscalName, senderName, onClose }) {
    _s1();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const [alertType, setAlertType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('GENERAL_NOTICE');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sent, setSent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selectedLabel = ALERT_TYPES.find((t)=>t.value === alertType)?.label || 'Comunicado Geral';
    const mutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "GestorAlertModal.useMutation[mutation]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].communications.create({
                    contractId,
                    recipientId: fiscalId,
                    subject: selectedLabel,
                    message
                })
        }["GestorAlertModal.useMutation[mutation]"],
        onSuccess: {
            "GestorAlertModal.useMutation[mutation]": ()=>{
                setSent(true);
                queryClient.invalidateQueries({
                    queryKey: [
                        'all-communications'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'communications'
                    ]
                });
                setTimeout(onClose, 1500);
            }
        }["GestorAlertModal.useMutation[mutation]"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-lg bg-white border border-gray-300 rounded-2xl shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between p-5 border-b border-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-bold text-gray-900 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            className: "h-4 w-4 text-blue-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 308,
                                            columnNumber: 15
                                        }, this),
                                        " Enviar Alerta ao Fiscal"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-gray-500 mt-0.5",
                                    children: [
                                        "Destinatário: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-700 font-semibold",
                                            children: fiscalName
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 310,
                                            columnNumber: 75
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 306,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg transition-colors cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 313,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 312,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 305,
                    columnNumber: 9
                }, this),
                sent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                            className: "h-10 w-10 text-emerald-400 mx-auto mb-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-semibold text-gray-900",
                            children: "Alerta enviado com sucesso!"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 319,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500 mt-1",
                            children: "O fiscal receberá a notificação imediatamente."
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 320,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 317,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5",
                                    children: "Tipo de Comunicado"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 325,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: alertType,
                                    onChange: (e)=>setAlertType(e.target.value),
                                    className: "w-full bg-blue-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer appearance-none",
                                    children: ALERT_TYPES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: t.value,
                                            children: t.label
                                        }, t.value, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 328,
                                            columnNumber: 39
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 326,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5",
                                    children: [
                                        "Mensagem ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-400 normal-case font-normal",
                                            children: "(descreva claramente a solicitação)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 333,
                                            columnNumber: 26
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 332,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: message,
                                    onChange: (e)=>setMessage(e.target.value),
                                    rows: 5,
                                    placeholder: `Ex.: Solicitamos a ${fiscalName} que encaminhe o relatório mensal...`,
                                    className: "w-full bg-blue-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 331,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50/60 border border-gray-300 rounded-xl p-3 text-[10px] text-gray-500 space-y-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500 font-semibold",
                                            children: "Remetente:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 340,
                                            columnNumber: 18
                                        }, this),
                                        " ",
                                        senderName,
                                        " (Gestor de Contratos)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 340,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500 font-semibold",
                                            children: "Tipo:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 341,
                                            columnNumber: 18
                                        }, this),
                                        " ",
                                        selectedLabel
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 339,
                            columnNumber: 13
                        }, this),
                        mutation.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2 text-center",
                            children: "Erro ao enviar. Tente novamente."
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 344,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 347,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>mutation.mutate(),
                                    disabled: !message.trim() || mutation.isPending,
                                    className: "flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 350,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        mutation.isPending ? 'Enviando...' : 'Enviar Alerta'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 346,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 323,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/views/ContractTabs.tsx",
            lineNumber: 304,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/views/ContractTabs.tsx",
        lineNumber: 303,
        columnNumber: 5
    }, this);
}
_s1(GestorAlertModal, "+ew+L6sJYKL83LOCKJI0G1UMN6s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c1 = GestorAlertModal;
function ContractTabs({ contractId, user, onBack, onNavigate, onOpenMeasurement, onOpenOccurrence, onOpenAlteration, onApproveMeasurement, onRejectMeasurement, onApproveAlteration, onRejectAlteration, onResolveOccurrence, onAssignFiscal }) {
    _s2();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dados');
    const [gestorAlertFiscal, setGestorAlertFiscal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingDados, setEditingDados] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dadosEdits, setDadosEdits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [editingEmpresa, setEditingEmpresa] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [empresaEdits, setEmpresaEdits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [editingVigencia, setEditingVigencia] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [vigenciaEdits, setVigenciaEdits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [editingAltId, setEditingAltId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [altEdits, setAltEdits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [showPaymentForm, setShowPaymentForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [payDate, setPayDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [payValue, setPayValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [payInvoice, setPayInvoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [payDesc, setPayDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showMeasurementForm, setShowMeasurementForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msrPeriodStart, setMsrPeriodStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [msrPeriodEnd, setMsrPeriodEnd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [msrValue, setMsrValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [msrDesc, setMsrDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showOccurrenceForm, setShowOccurrenceForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [occTitle, setOccTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [occDesc, setOccDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [occSeverity, setOccSeverity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('MEDIUM');
    const [showAlterationForm, setShowAlterationForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [altType, setAltType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ADDENDUM_VALUE_INCREASE');
    const [altJustification, setAltJustification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [altValueChange, setAltValueChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [altNewEndDate, setAltNewEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [altNumber, setAltNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rejectMsrModal, setRejectMsrModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rejectMsrReason, setRejectMsrReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rejectAltModal, setRejectAltModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rejectAltReason, setRejectAltReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [resolveOccModal, setResolveOccModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [resolveOccDesc, setResolveOccDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showAssignModal, setShowAssignModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [asgFiscalId, setAsgFiscalId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [asgRole, setAsgRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('TITULAR');
    const [asgAct, setAsgAct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [asgDate, setAsgDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [asgStart, setAsgStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { data: contract, isLoading, isError, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'contract',
            contractId
        ],
        queryFn: {
            "ContractTabs.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].contracts.get(contractId)
        }["ContractTabs.useQuery"],
        enabled: !!contractId,
        retry: 1,
        staleTime: 60_000
    });
    const { data: alertsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'alerts-all',
            user.id
        ],
        queryFn: {
            "ContractTabs.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].alerts.all()
        }["ContractTabs.useQuery"],
        enabled: !!user,
        staleTime: 300_000
    });
    const contractAlerts = (alertsData || []).filter((a)=>a.contractId === contractId);
    const updateDadosMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[updateDadosMutation]": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].contracts.updateData(contractId, data)
        }["ContractTabs.useMutation[updateDadosMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[updateDadosMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setEditingDados(false);
                setDadosEdits({});
            }
        }["ContractTabs.useMutation[updateDadosMutation]"],
        onError: {
            "ContractTabs.useMutation[updateDadosMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[updateDadosMutation]"]
    });
    const deleteMeasurementMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[deleteMeasurementMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].measurements.delete(id)
        }["ContractTabs.useMutation[deleteMeasurementMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[deleteMeasurementMutation]": ()=>queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                })
        }["ContractTabs.useMutation[deleteMeasurementMutation]"]
    });
    const deleteOccurrenceMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[deleteOccurrenceMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].occurrences.delete(id)
        }["ContractTabs.useMutation[deleteOccurrenceMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[deleteOccurrenceMutation]": ()=>queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                })
        }["ContractTabs.useMutation[deleteOccurrenceMutation]"]
    });
    const deleteAlterationMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[deleteAlterationMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].alterations.delete(id)
        }["ContractTabs.useMutation[deleteAlterationMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[deleteAlterationMutation]": ()=>queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                })
        }["ContractTabs.useMutation[deleteAlterationMutation]"]
    });
    const updateContractorMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[updateContractorMutation]": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].contractors.update(c?.contractorId, data)
        }["ContractTabs.useMutation[updateContractorMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[updateContractorMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setEditingEmpresa(false);
                setEmpresaEdits({});
            }
        }["ContractTabs.useMutation[updateContractorMutation]"],
        onError: {
            "ContractTabs.useMutation[updateContractorMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[updateContractorMutation]"]
    });
    const updateVigenciaMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[updateVigenciaMutation]": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].contracts.updateData(contractId, data)
        }["ContractTabs.useMutation[updateVigenciaMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[updateVigenciaMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setEditingVigencia(false);
                setVigenciaEdits({});
            }
        }["ContractTabs.useMutation[updateVigenciaMutation]"],
        onError: {
            "ContractTabs.useMutation[updateVigenciaMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[updateVigenciaMutation]"]
    });
    const removeAssignmentMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[removeAssignmentMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].assignments.remove(id)
        }["ContractTabs.useMutation[removeAssignmentMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[removeAssignmentMutation]": ()=>queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                })
        }["ContractTabs.useMutation[removeAssignmentMutation]"],
        onError: {
            "ContractTabs.useMutation[removeAssignmentMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[removeAssignmentMutation]"]
    });
    const updateAlterationMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[updateAlterationMutation]": ({ id, data })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].alterations.update(id, data)
        }["ContractTabs.useMutation[updateAlterationMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[updateAlterationMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setEditingAltId(null);
                setAltEdits({});
            }
        }["ContractTabs.useMutation[updateAlterationMutation]"],
        onError: {
            "ContractTabs.useMutation[updateAlterationMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[updateAlterationMutation]"]
    });
    const createPaymentMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[createPaymentMutation]": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].payments.create(data)
        }["ContractTabs.useMutation[createPaymentMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[createPaymentMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'payments',
                        contractId
                    ]
                });
                setShowPaymentForm(false);
                setPayDate('');
                setPayValue('');
                setPayInvoice('');
                setPayDesc('');
            }
        }["ContractTabs.useMutation[createPaymentMutation]"],
        onError: {
            "ContractTabs.useMutation[createPaymentMutation]": (e)=>alert(`Erro ao registrar pagamento: ${e.message}`)
        }["ContractTabs.useMutation[createPaymentMutation]"]
    });
    const deletePaymentMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[deletePaymentMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].payments.delete(id)
        }["ContractTabs.useMutation[deletePaymentMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[deletePaymentMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'payments',
                        contractId
                    ]
                });
            }
        }["ContractTabs.useMutation[deletePaymentMutation]"]
    });
    const createMeasurementMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[createMeasurementMutation]": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].measurements.create(data)
        }["ContractTabs.useMutation[createMeasurementMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[createMeasurementMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setShowMeasurementForm(false);
                setMsrPeriodStart('');
                setMsrPeriodEnd('');
                setMsrValue('');
                setMsrDesc('');
            }
        }["ContractTabs.useMutation[createMeasurementMutation]"],
        onError: {
            "ContractTabs.useMutation[createMeasurementMutation]": (e)=>alert(`Erro ao registrar medição: ${e.message}`)
        }["ContractTabs.useMutation[createMeasurementMutation]"]
    });
    const approveMeasurementMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[approveMeasurementMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].measurements.approve(id)
        }["ContractTabs.useMutation[approveMeasurementMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[approveMeasurementMutation]": ()=>queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                })
        }["ContractTabs.useMutation[approveMeasurementMutation]"],
        onError: {
            "ContractTabs.useMutation[approveMeasurementMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[approveMeasurementMutation]"]
    });
    const rejectMeasurementMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[rejectMeasurementMutation]": ({ id, reason })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].measurements.reject(id, reason)
        }["ContractTabs.useMutation[rejectMeasurementMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[rejectMeasurementMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setRejectMsrModal(null);
                setRejectMsrReason('');
            }
        }["ContractTabs.useMutation[rejectMeasurementMutation]"],
        onError: {
            "ContractTabs.useMutation[rejectMeasurementMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[rejectMeasurementMutation]"]
    });
    const createOccurrenceMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[createOccurrenceMutation]": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].occurrences.create(data)
        }["ContractTabs.useMutation[createOccurrenceMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[createOccurrenceMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setShowOccurrenceForm(false);
                setOccTitle('');
                setOccDesc('');
                setOccSeverity('MEDIUM');
            }
        }["ContractTabs.useMutation[createOccurrenceMutation]"],
        onError: {
            "ContractTabs.useMutation[createOccurrenceMutation]": (e)=>alert(`Erro ao registrar ocorrência: ${e.message}`)
        }["ContractTabs.useMutation[createOccurrenceMutation]"]
    });
    const resolveOccurrenceMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[resolveOccurrenceMutation]": ({ id, desc })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].occurrences.resolve(id, desc)
        }["ContractTabs.useMutation[resolveOccurrenceMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[resolveOccurrenceMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setResolveOccModal(null);
                setResolveOccDesc('');
            }
        }["ContractTabs.useMutation[resolveOccurrenceMutation]"],
        onError: {
            "ContractTabs.useMutation[resolveOccurrenceMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[resolveOccurrenceMutation]"]
    });
    const createAlterationMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[createAlterationMutation]": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].alterations.create(data)
        }["ContractTabs.useMutation[createAlterationMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[createAlterationMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setShowAlterationForm(false);
                setAltType('ADDENDUM_VALUE_INCREASE');
                setAltJustification('');
                setAltValueChange('');
                setAltNewEndDate('');
                setAltNumber('');
            }
        }["ContractTabs.useMutation[createAlterationMutation]"],
        onError: {
            "ContractTabs.useMutation[createAlterationMutation]": (e)=>alert(`Erro ao criar aditivo: ${e.message}`)
        }["ContractTabs.useMutation[createAlterationMutation]"]
    });
    const approveAlterationMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[approveAlterationMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].alterations.approve(id)
        }["ContractTabs.useMutation[approveAlterationMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[approveAlterationMutation]": ()=>queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                })
        }["ContractTabs.useMutation[approveAlterationMutation]"],
        onError: {
            "ContractTabs.useMutation[approveAlterationMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[approveAlterationMutation]"]
    });
    const rejectAlterationMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[rejectAlterationMutation]": ({ id, reason })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].alterations.reject(id, reason)
        }["ContractTabs.useMutation[rejectAlterationMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[rejectAlterationMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setRejectAltModal(null);
                setRejectAltReason('');
            }
        }["ContractTabs.useMutation[rejectAlterationMutation]"],
        onError: {
            "ContractTabs.useMutation[rejectAlterationMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[rejectAlterationMutation]"]
    });
    const assignFiscalMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[assignFiscalMutation]": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].contracts.assignFiscal(contractId, data)
        }["ContractTabs.useMutation[assignFiscalMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[assignFiscalMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                setShowAssignModal(false);
                setAsgFiscalId('');
                setAsgRole('TITULAR');
                setAsgAct('');
                setAsgDate('');
                setAsgStart('');
            }
        }["ContractTabs.useMutation[assignFiscalMutation]"],
        onError: {
            "ContractTabs.useMutation[assignFiscalMutation]": (e)=>alert(`Erro ao designar fiscal: ${e.message}`)
        }["ContractTabs.useMutation[assignFiscalMutation]"]
    });
    const { data: availableFiscais } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'fiscais-list'
        ],
        queryFn: {
            "ContractTabs.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].utils.getFiscais()
        }["ContractTabs.useQuery"],
        enabled: showAssignModal,
        staleTime: 120_000
    });
    const concludeContractMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractTabs.useMutation[concludeContractMutation]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].contracts.conclude(contractId)
        }["ContractTabs.useMutation[concludeContractMutation]"],
        onSuccess: {
            "ContractTabs.useMutation[concludeContractMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'contract',
                        contractId
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'contracts-list'
                    ]
                });
            }
        }["ContractTabs.useMutation[concludeContractMutation]"],
        onError: {
            "ContractTabs.useMutation[concludeContractMutation]": (e)=>alert(`Erro: ${e.message}`)
        }["ContractTabs.useMutation[concludeContractMutation]"]
    });
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3 max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 bg-gray-100/50 rounded-xl animate-pulse"
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 547,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-32 bg-gray-100/50 rounded-xl animate-pulse"
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 548,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-64 bg-gray-100/50 rounded-xl animate-pulse"
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 549,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/ContractTabs.tsx",
        lineNumber: 546,
        columnNumber: 5
    }, this);
    if (isError || !contract) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center gap-4 py-24 max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "h-6 w-6 text-red-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 555,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 554,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-gray-900 mb-1",
                        children: "Erro ao carregar contrato"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 558,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 font-mono bg-gray-100/40 border border-gray-300 rounded px-3 py-1.5 max-w-sm",
                        children: error?.message || 'Contrato não encontrado ou backend indisponível'
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 559,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 557,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>refetch(),
                        className: "text-xs px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg transition-colors cursor-pointer",
                        children: "Tentar novamente"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 564,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "text-xs px-4 py-2 bg-gray-100/40 hover:bg-gray-100/60 border border-gray-300 text-gray-500 rounded-lg transition-colors cursor-pointer",
                        children: "Voltar"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 567,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 563,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/ContractTabs.tsx",
        lineNumber: 553,
        columnNumber: 5
    }, this);
    const c = contract;
    const canEdit = user.role === 'GESTOR' || user.role === 'ADMIN';
    const isGestor = user.role === 'GESTOR' || user.role === 'ADMIN';
    // Stats rápidos para vigência
    const toContractDate = (d)=>new Date(d.length === 10 ? d + 'T12:00:00Z' : d);
    const daysLeft = Math.ceil((toContractDate(c.endDate).getTime() - Date.now()) / 86400000);
    const daysTotal = Math.ceil((toContractDate(c.endDate).getTime() - toContractDate(c.startDate || c.signingDate).getTime()) / 86400000);
    const progress = Math.max(0, Math.min(100, (daysTotal - daysLeft) / daysTotal * 100));
    const totalMeasured = (c.measurements || []).filter((m)=>m.status === 'APPROVED').reduce((s, m)=>s + Number(m.measurementValue), 0);
    const executionPctRaw = c.currentValue > 0 ? totalMeasured / c.currentValue * 100 : 0;
    const executionPct = executionPctRaw.toFixed(1);
    const executionOverrun = executionPctRaw > 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 max-w-7xl mx-auto",
        children: [
            gestorAlertFiscal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GestorAlertModal, {
                contractId: contractId,
                fiscalId: gestorAlertFiscal.id,
                fiscalName: gestorAlertFiscal.name,
                senderName: user.name,
                onClose: ()=>setGestorAlertFiscal(null)
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 592,
                columnNumber: 9
            }, this),
            rejectMsrModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-bold text-gray-900",
                            children: "Rejeitar Medição"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 605,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5",
                                    children: "Motivo da Rejeição *"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 607,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: rejectMsrReason,
                                    onChange: (e)=>setRejectMsrReason(e.target.value),
                                    rows: 3,
                                    placeholder: "Descreva o motivo da rejeição...",
                                    className: "w-full bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 608,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 606,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setRejectMsrModal(null);
                                        setRejectMsrReason('');
                                    },
                                    className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 613,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (!rejectMsrReason.trim()) {
                                            alert('Informe o motivo.');
                                            return;
                                        }
                                        rejectMeasurementMutation.mutate({
                                            id: rejectMsrModal.id,
                                            reason: rejectMsrReason
                                        });
                                    },
                                    disabled: rejectMeasurementMutation.isPending,
                                    className: "flex-1 bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                    children: rejectMeasurementMutation.isPending ? 'Rejeitando...' : 'Confirmar Rejeição'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 615,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 612,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 604,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 603,
                columnNumber: 9
            }, this),
            resolveOccModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-bold text-gray-900",
                            children: "Resolver Ocorrência"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 629,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5",
                                    children: "Descrição da Resolução *"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 631,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: resolveOccDesc,
                                    onChange: (e)=>setResolveOccDesc(e.target.value),
                                    rows: 3,
                                    placeholder: "Descreva como a ocorrência foi resolvida...",
                                    className: "w-full bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 632,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 630,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setResolveOccModal(null);
                                        setResolveOccDesc('');
                                    },
                                    className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 637,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (!resolveOccDesc.trim()) {
                                            alert('Informe a descrição.');
                                            return;
                                        }
                                        resolveOccurrenceMutation.mutate({
                                            id: resolveOccModal.id,
                                            desc: resolveOccDesc
                                        });
                                    },
                                    disabled: resolveOccurrenceMutation.isPending,
                                    className: "flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                    children: resolveOccurrenceMutation.isPending ? 'Resolvendo...' : 'Confirmar Resolução'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 639,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 636,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 628,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 627,
                columnNumber: 9
            }, this),
            rejectAltModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-bold text-gray-900",
                            children: "Rejeitar Aditivo"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 653,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5",
                                    children: "Motivo da Rejeição *"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 655,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: rejectAltReason,
                                    onChange: (e)=>setRejectAltReason(e.target.value),
                                    rows: 3,
                                    placeholder: "Descreva o motivo da rejeição...",
                                    className: "w-full bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 656,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 654,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setRejectAltModal(null);
                                        setRejectAltReason('');
                                    },
                                    className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 661,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (!rejectAltReason.trim()) {
                                            alert('Informe o motivo.');
                                            return;
                                        }
                                        rejectAlterationMutation.mutate({
                                            id: rejectAltModal.id,
                                            reason: rejectAltReason
                                        });
                                    },
                                    disabled: rejectAlterationMutation.isPending,
                                    className: "flex-1 bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                    children: rejectAlterationMutation.isPending ? 'Rejeitando...' : 'Confirmar Rejeição'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 663,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 660,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 652,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 651,
                columnNumber: 9
            }, this),
            showAssignModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-lg bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-bold text-gray-900",
                                    children: "Designar Fiscal ao Contrato"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 678,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAssignModal(false),
                                    className: "p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 679,
                                        columnNumber: 141
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 679,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 677,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-2 flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                            children: "Fiscal *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 683,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: asgFiscalId,
                                            onChange: (e)=>setAsgFiscalId(e.target.value),
                                            className: "bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Selecione um fiscal..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 19
                                                }, this),
                                                (availableFiscais ?? []).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: f.id,
                                                        children: [
                                                            f.name,
                                                            " — ",
                                                            f.registrationNumber
                                                        ]
                                                    }, f.id, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 687,
                                                        columnNumber: 61
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 684,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 682,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                            children: "Função *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 691,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: asgRole,
                                            onChange: (e)=>setAsgRole(e.target.value),
                                            className: "bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "TITULAR",
                                                    children: "Titular"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "SUBSTITUTO",
                                                    children: "Substituto"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 695,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "SUPLENTE",
                                                    children: "Suplente"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 696,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 692,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 690,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                            children: "Portaria / Ato *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 700,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: asgAct,
                                            onChange: (e)=>setAsgAct(e.target.value),
                                            placeholder: "Ex: Port. 001/2026",
                                            className: "bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 701,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 699,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                            children: "Data da Portaria *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 706,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: asgDate,
                                            onChange: (e)=>setAsgDate(e.target.value),
                                            className: "bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 707,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 705,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                            children: "Início da Designação *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 711,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: asgStart,
                                            onChange: (e)=>setAsgStart(e.target.value),
                                            className: "bg-blue-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 712,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 710,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 681,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAssignModal(false),
                                    className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 717,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (!asgFiscalId || !asgAct || !asgDate || !asgStart) {
                                            alert('Preencha todos os campos obrigatórios.');
                                            return;
                                        }
                                        assignFiscalMutation.mutate({
                                            fiscalId: asgFiscalId,
                                            role: asgRole,
                                            designationAct: asgAct,
                                            designationDate: asgDate,
                                            startDate: asgStart
                                        });
                                    },
                                    disabled: assignFiscalMutation.isPending,
                                    className: "flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                    children: assignFiscalMutation.isPending ? 'Designando...' : 'Designar Fiscal'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 719,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 716,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 676,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 675,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onBack,
                                className: "flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 736,
                                        columnNumber: 13
                                    }, this),
                                    " Contratos"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 735,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400",
                                children: "/"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 738,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-gray-700",
                                children: c.contractNumber
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 739,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: badgeCls(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contractStatusColor"][c.status] || ''),
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contractStatusLabel"][c.status] || c.status
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 740,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 734,
                        columnNumber: 9
                    }, this),
                    isGestor && c.status === 'ACTIVE' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (confirm(`Concluir o contrato ${c.contractNumber}? Ele será movido para Contratos Encerrados.`)) concludeContractMutation.mutate();
                        },
                        disabled: concludeContractMutation.isPending,
                        className: "flex items-center gap-1.5 text-[11px] bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-lg text-blue-400 font-semibold cursor-pointer disabled:opacity-50 transition-colors",
                        children: concludeContractMutation.isPending ? 'Encerrando...' : '✓ Concluir Contrato'
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 743,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 733,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-100/30 border border-gray-200 p-5 rounded-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-between items-start gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest",
                                        children: "CONTRATO ADMINISTRATIVO"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 755,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold text-gray-900 mt-1",
                                        children: c.contractNumber
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 756,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-1 max-w-2xl",
                                        children: c.objectDescription
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 757,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 754,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500 block text-[10px]",
                                                children: "Valor Inicial"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 760,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-gray-800",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(c.initialValue)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 760,
                                                columnNumber: 111
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 760,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500 block text-[10px]",
                                                children: "Valor Atual"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 761,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-emerald-400",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(c.currentValue)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 761,
                                                columnNumber: 109
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 761,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500 block text-[10px]",
                                                children: "Executado"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 763,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: executionOverrun ? 'text-red-400' : 'text-blue-400',
                                                children: [
                                                    executionPct,
                                                    "%",
                                                    executionOverrun && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-0.5 text-[9px]",
                                                        children: "⚠"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 765,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 764,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 762,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500 block text-[10px]",
                                                children: daysLeft > 0 ? 'Dias restantes' : 'Dias vencido'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 768,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: daysLeft <= 90 ? 'text-red-400' : daysLeft <= 180 ? 'text-amber-400' : 'text-gray-700',
                                                children: Math.abs(daysLeft)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 768,
                                                columnNumber: 148
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 768,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 759,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 753,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-[10px] text-gray-500 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Início: ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.startDate)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 775,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            progress.toFixed(0),
                                            "% do prazo decorrido"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 776,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Fim: ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.endDate)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 777,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 774,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 bg-white rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full transition-all",
                                    style: {
                                        width: `${progress}%`,
                                        background: progress >= 90 ? '#ef4444' : progress >= 70 ? '#f59e0b' : '#10b981'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 780,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 779,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 773,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 752,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1 bg-gray-100/20 border border-gray-200 p-1.5 rounded-xl",
                children: TABS.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab.id),
                        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${activeTab === tab.id ? 'bg-white text-gray-900 border border-gray-300 shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700'}`,
                        children: [
                            tab.icon,
                            " ",
                            tab.label
                        ]
                    }, tab.id, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 788,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 786,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-100/10 border border-gray-200 p-6 rounded-xl",
                children: [
                    activeTab === 'dados' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end",
                                children: editingDados ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setEditingDados(false);
                                                setDadosEdits({});
                                            },
                                            className: "flex items-center gap-1.5 text-[11px] bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 807,
                                                    columnNumber: 23
                                                }, this),
                                                " Cancelar"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 805,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateDadosMutation.mutate(dadosEdits),
                                            disabled: updateDadosMutation.isPending || Object.keys(dadosEdits).length === 0,
                                            className: "flex items-center gap-1.5 text-[11px] bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 rounded-lg text-zinc-950 font-semibold cursor-pointer disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 812,
                                                    columnNumber: 23
                                                }, this),
                                                " ",
                                                updateDadosMutation.isPending ? 'Salvando...' : 'Salvar'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 809,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 804,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setEditingDados(true);
                                        setDadosEdits({});
                                    },
                                    className: "flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 818,
                                            columnNumber: 21
                                        }, this),
                                        " Editar Dados"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 816,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 802,
                                columnNumber: 15
                            }, this),
                            editingDados ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5 col-span-2 md:col-span-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Objeto"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 826,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: dadosEdits.objectDescription ?? c.objectDescription,
                                                onChange: (e)=>setDadosEdits((p)=>({
                                                            ...p,
                                                            objectDescription: e.target.value
                                                        })),
                                                rows: 2,
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 827,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 825,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 830,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: dadosEdits.status ?? c.status,
                                                onChange: (e)=>setDadosEdits((p)=>({
                                                            ...p,
                                                            status: e.target.value
                                                        })),
                                                className: inputCls,
                                                children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contractStatusLabel"]).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: k,
                                                        children: v
                                                    }, k, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 832,
                                                        columnNumber: 74
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 831,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 829,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Unidade Administrativa"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 836,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: dadosEdits.department ?? (c.department || ''),
                                                onChange: (e)=>setDadosEdits((p)=>({
                                                            ...p,
                                                            department: e.target.value
                                                        })),
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 837,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 835,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Data de Assinatura"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 840,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: (dadosEdits.signingDate ?? c.signingDate ?? '').slice(0, 10),
                                                onChange: (e)=>setDadosEdits((p)=>({
                                                            ...p,
                                                            signingDate: e.target.value
                                                        })),
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 841,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 839,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Início da Vigência"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 844,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: (dadosEdits.startDate ?? c.startDate ?? '').slice(0, 10),
                                                onChange: (e)=>setDadosEdits((p)=>({
                                                            ...p,
                                                            startDate: e.target.value
                                                        })),
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 845,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 843,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Fim da Vigência"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 848,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: (dadosEdits.endDate ?? c.endDate ?? '').slice(0, 10),
                                                onChange: (e)=>setDadosEdits((p)=>({
                                                            ...p,
                                                            endDate: e.target.value
                                                        })),
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 849,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 847,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Valor Inicial (R$)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 852,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: dadosEdits.initialValue ?? c.initialValue,
                                                onChange: (e)=>setDadosEdits((p)=>({
                                                            ...p,
                                                            initialValue: Number(e.target.value)
                                                        })),
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 853,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 851,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Valor Atual (R$)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 856,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: dadosEdits.currentValue ?? c.currentValue,
                                                onChange: (e)=>setDadosEdits((p)=>({
                                                            ...p,
                                                            currentValue: Number(e.target.value)
                                                        })),
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 857,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 855,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Observações"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 860,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: dadosEdits.observations ?? (c.observations || ''),
                                                onChange: (e)=>setDadosEdits((p)=>({
                                                            ...p,
                                                            observations: e.target.value
                                                        })),
                                                rows: 2,
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 861,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 859,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 824,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 gap-5",
                                children: [
                                    infoRow('Número do Contrato', c.contractNumber),
                                    infoRow('Status', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: badgeCls(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contractStatusColor"][c.status] || ''),
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contractStatusLabel"][c.status]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 867,
                                        columnNumber: 36
                                    }, this)),
                                    infoRow('Modalidade', c.process?.modality || '—'),
                                    infoRow('Data de Assinatura', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.signingDate)),
                                    infoRow('Início da Vigência', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.startDate)),
                                    infoRow('Fim da Vigência', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.endDate)),
                                    infoRow('Valor Inicial', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(c.initialValue)),
                                    infoRow('Valor Atual', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(c.currentValue)),
                                    infoRow('Total Medido', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalMeasured)),
                                    c.processId && infoRow('Processo de Origem', c.process?.processNumber || c.processId),
                                    c.department && infoRow('Unidade Administrativa', c.department),
                                    c.observations && infoRow('Observação', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-400 font-medium",
                                        children: c.observations
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 877,
                                        columnNumber: 58
                                    }, this)),
                                    infoRow('Objeto', c.objectDescription)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 865,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuccessionPanel, {
                                contract: c,
                                user: user,
                                onSave: (info)=>updateDadosMutation.mutate({
                                        successionInfo: info
                                    }),
                                onNavigate: onNavigate
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 882,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 800,
                        columnNumber: 11
                    }, this),
                    activeTab === 'empresa' && c.contractor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end",
                                children: editingEmpresa ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setEditingEmpresa(false);
                                                setEmpresaEdits({});
                                            },
                                            className: "flex items-center gap-1.5 text-[11px] bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 900,
                                                    columnNumber: 23
                                                }, this),
                                                " Cancelar"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 898,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateContractorMutation.mutate(empresaEdits),
                                            disabled: updateContractorMutation.isPending || Object.keys(empresaEdits).length === 0,
                                            className: "flex items-center gap-1.5 text-[11px] bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 rounded-lg text-zinc-950 font-semibold cursor-pointer disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 905,
                                                    columnNumber: 23
                                                }, this),
                                                " ",
                                                updateContractorMutation.isPending ? 'Salvando...' : 'Salvar'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 902,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 897,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setEditingEmpresa(true);
                                        setEmpresaEdits({});
                                    },
                                    className: "flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 911,
                                            columnNumber: 21
                                        }, this),
                                        " Editar Empresa"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 909,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 895,
                                columnNumber: 15
                            }, this),
                            editingEmpresa ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 gap-5",
                                children: [
                                    'corporateName',
                                    'tradeName',
                                    'cnpjCpf',
                                    'email',
                                    'phone',
                                    'postalCode',
                                    'addressStreet',
                                    'addressNumber',
                                    'addressNeighborhood',
                                    'addressCity',
                                    'addressState',
                                    'stateInscription',
                                    'municipalInscription'
                                ].map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: field
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 920,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: empresaEdits[field] ?? c.contractor[field] ?? '',
                                                onChange: (e)=>setEmpresaEdits((p)=>({
                                                            ...p,
                                                            [field]: e.target.value
                                                        })),
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 921,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, field, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 919,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 917,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 gap-5",
                                children: [
                                    infoRow('Razão Social', c.contractor.corporateName),
                                    infoRow('Nome Fantasia', c.contractor.tradeName),
                                    infoRow('CNPJ/CPF', c.contractor.cnpjCpf),
                                    infoRow('E-mail', c.contractor.email),
                                    infoRow('Telefone', c.contractor.phone),
                                    infoRow('CEP', c.contractor.postalCode),
                                    infoRow('Endereço', [
                                        c.contractor.addressStreet,
                                        c.contractor.addressNumber
                                    ].filter(Boolean).join(', ')),
                                    infoRow('Bairro', c.contractor.addressNeighborhood),
                                    infoRow('Cidade/UF', [
                                        c.contractor.addressCity,
                                        c.contractor.addressState
                                    ].filter(Boolean).join('/')),
                                    infoRow('Inscrição Estadual', c.contractor.stateInscription),
                                    infoRow('Inscrição Municipal', c.contractor.municipalInscription)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 926,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 893,
                        columnNumber: 11
                    }, this),
                    activeTab === 'fiscal' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-xs font-semibold text-gray-700",
                                        children: "Comissão de Fiscalização"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 947,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            isGestor && (c.fiscalAssignments || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const asg = (c.fiscalAssignments || []).find((a)=>a.isActive);
                                                    if (asg?.fiscal) setGestorAlertFiscal({
                                                        id: asg.fiscal.id,
                                                        name: asg.fiscal.name
                                                    });
                                                },
                                                className: "flex items-center gap-1.5 text-[11px] bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 px-3 py-1.5 rounded-lg text-blue-400 transition-colors cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 956,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Enviar Alerta"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 950,
                                                columnNumber: 19
                                            }, this),
                                            isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowAssignModal(true),
                                                className: "flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 transition-colors cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 962,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Designar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 960,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 948,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 946,
                                columnNumber: 13
                            }, this),
                            (c.fiscalAssignments || []).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: (c.fiscalAssignments || []).map((asg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50/60 border border-gray-200 p-4 rounded-xl",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-9 w-9 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-xs text-gray-500",
                                                            children: asg.fiscal?.name?.charAt(0) || '?'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 973,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-semibold text-gray-700",
                                                                    children: asg.fiscal?.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 977,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-gray-500",
                                                                    children: [
                                                                        asg.fiscal?.registrationNumber,
                                                                        " · ",
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fiscalRoleLabel"][asg.role]
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 978,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 976,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 972,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        isGestor && asg.isActive && asg.fiscal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setGestorAlertFiscal({
                                                                    id: asg.fiscal.id,
                                                                    name: asg.fiscal.name
                                                                }),
                                                            title: "Enviar alerta a este fiscal",
                                                            className: "p-1.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-lg text-blue-400 transition-colors cursor-pointer",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                className: "h-3.5 w-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 987,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 983,
                                                            columnNumber: 27
                                                        }, this),
                                                        isGestor && asg.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                const activeCount = (c.fiscalAssignments || []).filter((a)=>a.isActive).length;
                                                                if (activeCount <= 1) {
                                                                    alert('Não é possível remover o último fiscal ativo do contrato.');
                                                                    return;
                                                                }
                                                                if (confirm(`Remover ${asg.fiscal?.name} da comissão de fiscalização?`)) removeAssignmentMutation.mutate(asg.id);
                                                            },
                                                            disabled: removeAssignmentMutation.isPending,
                                                            title: "Remover fiscal",
                                                            className: "p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                className: "h-3.5 w-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1000,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 991,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right text-[10px] text-gray-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: [
                                                                        "Portaria: ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            className: "text-gray-500",
                                                                            children: asg.designationAct
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                            lineNumber: 1004,
                                                                            columnNumber: 40
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1004,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: [
                                                                        "Desde ",
                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(asg.startDate)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1005,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `mt-1 inline-block px-2 py-0.5 rounded border font-semibold text-[9px] ${asg.isActive ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-gray-100 border-gray-300 text-gray-500'}`,
                                                                    children: asg.isActive ? 'Ativo' : 'Inativo'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1006,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1003,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 981,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 971,
                                            columnNumber: 21
                                        }, this)
                                    }, asg.id, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 970,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 968,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Nenhum fiscal designado."
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1015,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 945,
                        columnNumber: 11
                    }, this),
                    activeTab === 'gestor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 md:grid-cols-3 gap-5",
                            children: [
                                infoRow('Gestor Responsável', c.manager?.name || 'Jairo Vicente de Melo'),
                                infoRow('Matrícula', c.manager?.registrationNumber || 'IQG-0002'),
                                infoRow('E-mail', c.manager?.email || 'gestor@sigecontratos.com'),
                                infoRow('Perfil', 'GESTOR'),
                                infoRow('Setor', 'Gestão de Contratos — IQUEGO'),
                                infoRow('Responsável desde', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.signingDate))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 1022,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1021,
                        columnNumber: 11
                    }, this),
                    activeTab === 'vigencia' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end",
                                children: editingVigencia ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setEditingVigencia(false);
                                                setVigenciaEdits({});
                                            },
                                            className: "flex items-center gap-1.5 text-[11px] bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 1042,
                                                    columnNumber: 23
                                                }, this),
                                                " Cancelar"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1040,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateVigenciaMutation.mutate(vigenciaEdits),
                                            disabled: updateVigenciaMutation.isPending || Object.keys(vigenciaEdits).length === 0,
                                            className: "flex items-center gap-1.5 text-[11px] bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 rounded-lg text-zinc-950 font-semibold cursor-pointer disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 1047,
                                                    columnNumber: 23
                                                }, this),
                                                " ",
                                                updateVigenciaMutation.isPending ? 'Salvando...' : 'Salvar'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1044,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1039,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setEditingVigencia(true);
                                        setVigenciaEdits({});
                                    },
                                    className: "flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1053,
                                            columnNumber: 21
                                        }, this),
                                        " Editar Vigência"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1051,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1037,
                                columnNumber: 15
                            }, this),
                            editingVigencia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4 bg-gray-100/30 border border-gray-300 rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Início da Vigência"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1061,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: (vigenciaEdits.startDate ?? c.startDate ?? '').slice(0, 10),
                                                onChange: (e)=>setVigenciaEdits((p)=>({
                                                            ...p,
                                                            startDate: e.target.value
                                                        })),
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1062,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1060,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                children: "Término da Vigência"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1065,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: (vigenciaEdits.endDate ?? c.endDate ?? '').slice(0, 10),
                                                onChange: (e)=>setVigenciaEdits((p)=>({
                                                            ...p,
                                                            endDate: e.target.value
                                                        })),
                                                className: inputCls
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1066,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1064,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1059,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 uppercase tracking-widest",
                                                children: "Início"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1072,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-bold text-gray-800 mt-1",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.startDate)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1073,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1071,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 uppercase tracking-widest",
                                                children: "Término"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1076,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-bold text-gray-800 mt-1",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.endDate)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1077,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1075,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `border p-4 rounded-xl text-center ${daysLeft <= 0 ? 'bg-red-500/10 border-red-500/20' : daysLeft <= 90 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 uppercase tracking-widest",
                                                children: daysLeft > 0 ? 'Dias Restantes' : 'Dias Vencido'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1080,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-xl font-bold mt-1 ${daysLeft <= 0 ? 'text-red-400' : daysLeft <= 90 ? 'text-amber-400' : 'text-emerald-400'}`,
                                                children: Math.abs(daysLeft)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1081,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1079,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 uppercase tracking-widest",
                                                children: "Prazo Decorrido"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1084,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl font-bold text-blue-400 mt-1",
                                                children: [
                                                    progress.toFixed(0),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1085,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1083,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1070,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-[10px] text-gray-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.startDate)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1090,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-gray-500",
                                                children: [
                                                    progress.toFixed(1),
                                                    "% decorrido"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1091,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(c.endDate)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1092,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1089,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 bg-white rounded-full overflow-hidden border border-gray-300",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full",
                                            style: {
                                                width: `${progress}%`,
                                                background: progress >= 90 ? '#ef4444' : progress >= 70 ? '#f59e0b' : '#10b981'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1095,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1094,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1088,
                                columnNumber: 13
                            }, this),
                            daysLeft <= 180 && daysLeft > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Atenção:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1100,
                                        columnNumber: 17
                                    }, this),
                                    " Contrato na janela de alerta de 180 dias. Providenciar prorrogação ou nova contratação."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1099,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1035,
                        columnNumber: 11
                    }, this),
                    activeTab === 'aditivos' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-xs font-semibold text-gray-700",
                                                children: "Termos Aditivos"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 mt-0.5",
                                                children: "Limite: 25% (serviços/compras) · 50% (reformas)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1112,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1110,
                                        columnNumber: 15
                                    }, this),
                                    (user.role === 'FISCAL' || isGestor) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAlterationForm((v)=>!v),
                                        className: "flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1116,
                                                columnNumber: 19
                                            }, this),
                                            " Novo Aditivo"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1115,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1109,
                                columnNumber: 13
                            }, this),
                            showAlterationForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                        children: "Registrar Novo Termo Aditivo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1123,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Tipo de Aditivo *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1126,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: altType,
                                                        onChange: (e)=>setAltType(e.target.value),
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer",
                                                        children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alterationTypeLabel"]).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: k,
                                                                children: v
                                                            }, k, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1129,
                                                                columnNumber: 76
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1127,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1125,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Número / Identificação"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1133,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: altNumber,
                                                        onChange: (e)=>setAltNumber(e.target.value),
                                                        placeholder: "Ex: 1º Termo Aditivo",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1134,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1132,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Impacto Financeiro (R$)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1139,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        step: "0.01",
                                                        value: altValueChange,
                                                        onChange: (e)=>setAltValueChange(e.target.value),
                                                        placeholder: "0,00 (negativo para supressão)",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1140,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1138,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Nova Data de Término"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1145,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: altNewEndDate,
                                                        onChange: (e)=>setAltNewEndDate(e.target.value),
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1146,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1144,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "col-span-2 flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Justificativa *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1150,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: altJustification,
                                                        onChange: (e)=>setAltJustification(e.target.value),
                                                        rows: 3,
                                                        placeholder: "Descreva a justificativa para o aditivo...",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1151,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1149,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1124,
                                        columnNumber: 17
                                    }, this),
                                    createAlterationMutation.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2",
                                        children: createAlterationMutation.error?.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1157,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setShowAlterationForm(false);
                                                    setAltType('ADDENDUM_VALUE_INCREASE');
                                                    setAltJustification('');
                                                    setAltValueChange('');
                                                    setAltNewEndDate('');
                                                    setAltNumber('');
                                                },
                                                className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                                children: "Cancelar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1162,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (!altJustification.trim()) {
                                                        alert('Preencha a justificativa.');
                                                        return;
                                                    }
                                                    createAlterationMutation.mutate({
                                                        contractId,
                                                        type: altType,
                                                        alterationNumber: altNumber || undefined,
                                                        justification: altJustification,
                                                        valueChange: Number(altValueChange) || 0,
                                                        newEndDate: altNewEndDate || undefined
                                                    });
                                                },
                                                disabled: createAlterationMutation.isPending,
                                                className: "flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1170,
                                                        columnNumber: 21
                                                    }, this),
                                                    " ",
                                                    createAlterationMutation.isPending ? 'Salvando...' : 'Registrar Aditivo'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1164,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1161,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1122,
                                columnNumber: 15
                            }, this),
                            (c.alterations || []).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: (c.alterations || []).map((alt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50/60 border border-gray-200 p-4 rounded-xl",
                                        children: editingAltId === alt.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col gap-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                                    children: "Número/Identificação"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1184,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: altEdits.alterationNumber ?? (alt.alterationNumber || ''),
                                                                    onChange: (e)=>setAltEdits((p)=>({
                                                                                ...p,
                                                                                alterationNumber: e.target.value
                                                                            })),
                                                                    className: inputCls
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1185,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1183,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col gap-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                                    children: "Nova Data de Término"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1188,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "date",
                                                                    value: (altEdits.newEndDate ?? alt.newEndDate ?? '').slice(0, 10),
                                                                    onChange: (e)=>setAltEdits((p)=>({
                                                                                ...p,
                                                                                newEndDate: e.target.value
                                                                            })),
                                                                    className: inputCls
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1189,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1187,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col gap-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                                    children: "Impacto Financeiro (R$)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1192,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    value: altEdits.valueChange ?? alt.valueChange ?? 0,
                                                                    onChange: (e)=>setAltEdits((p)=>({
                                                                                ...p,
                                                                                valueChange: Number(e.target.value)
                                                                            })),
                                                                    className: inputCls
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1193,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1191,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col gap-0.5 col-span-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                                    children: "Justificativa"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1196,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                    value: altEdits.justification ?? (alt.justification || ''),
                                                                    onChange: (e)=>setAltEdits((p)=>({
                                                                                ...p,
                                                                                justification: e.target.value
                                                                            })),
                                                                    rows: 2,
                                                                    className: inputCls
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1197,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1195,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 1182,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>updateAlterationMutation.mutate({
                                                                    id: alt.id,
                                                                    data: altEdits
                                                                }),
                                                            disabled: updateAlterationMutation.isPending,
                                                            className: "flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-1.5 rounded-lg text-xs cursor-pointer disabled:opacity-50",
                                                            children: updateAlterationMutation.isPending ? 'Salvando...' : 'Salvar'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1201,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setEditingAltId(null);
                                                                setAltEdits({});
                                                            },
                                                            className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-1.5 rounded-lg text-xs cursor-pointer",
                                                            children: "Cancelar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1206,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 1200,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1181,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-bold text-gray-700",
                                                                    children: alt.alterationNumber || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alterationTypeLabel"][alt.type]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1216,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] text-gray-500 mt-0.5",
                                                                    children: alt.justification
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1217,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1215,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 shrink-0 ml-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: badgeCls(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alterationStatusColor"][alt.status] || ''),
                                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alterationStatusLabel"][alt.status] || alt.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1220,
                                                                    columnNumber: 29
                                                                }, this),
                                                                isGestor && alt.status === 'PENDING_APPROVAL' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-1.5",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>approveAlterationMutation.mutate(alt.id),
                                                                            disabled: approveAlterationMutation.isPending,
                                                                            className: "p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 hover:bg-emerald-500/20 cursor-pointer disabled:opacity-50",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                                lineNumber: 1223,
                                                                                columnNumber: 297
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                            lineNumber: 1223,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>setRejectAltModal({
                                                                                    id: alt.id
                                                                                }),
                                                                            className: "p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 cursor-pointer",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                                lineNumber: 1224,
                                                                                columnNumber: 207
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                            lineNumber: 1224,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1222,
                                                                    columnNumber: 31
                                                                }, this),
                                                                isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        setEditingAltId(alt.id);
                                                                        setAltEdits({});
                                                                    },
                                                                    title: "Editar aditivo",
                                                                    className: "p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                        className: "h-3.5 w-3.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                        lineNumber: 1230,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1228,
                                                                    columnNumber: 31
                                                                }, this),
                                                                isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        if (confirm('Excluir este aditivo permanentemente?')) deleteAlterationMutation.mutate(alt.id);
                                                                    },
                                                                    disabled: deleteAlterationMutation.isPending,
                                                                    title: "Excluir aditivo",
                                                                    className: "p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        className: "h-3.5 w-3.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                        lineNumber: 1238,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1234,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1219,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 1214,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 flex gap-4 text-[10px] text-gray-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Impacto: ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "text-gray-700",
                                                                    children: [
                                                                        alt.valueChange >= 0 ? '+' : '',
                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(alt.valueChange)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1244,
                                                                    columnNumber: 42
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1244,
                                                            columnNumber: 27
                                                        }, this),
                                                        alt.newEndDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Nova vigência: ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "text-gray-700",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(alt.newEndDate)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1245,
                                                                    columnNumber: 67
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1245,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Solicitado por: ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "text-gray-500",
                                                                    children: alt.requester?.name || alt.requestedById
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1246,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1246,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(alt.createdAt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1247,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 1243,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, alt.id, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1179,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1177,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Nenhum aditivo registrado."
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1254,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1108,
                        columnNumber: 11
                    }, this),
                    activeTab === 'fiscalizacoes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-xs font-semibold text-gray-700",
                                                children: "Medições de Fiscalização"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1264,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 mt-0.5",
                                                children: [
                                                    "Total medido (aprovado): ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalMeasured),
                                                    " de ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(c.currentValue)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1265,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1263,
                                        columnNumber: 15
                                    }, this),
                                    (user.role === 'FISCAL' || isGestor) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowMeasurementForm((v)=>!v),
                                        className: "flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                        title: "Registre a medição do período fiscalizado, com valor executado e relatório",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1270,
                                                columnNumber: 19
                                            }, this),
                                            " Nova Medição"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1268,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1262,
                                columnNumber: 13
                            }, this),
                            showMeasurementForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                                children: "Registrar Nova Medição de Fiscalização"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1278,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-400 mt-0.5",
                                                children: "Informe o período fiscalizado, o valor executado e um relatório descritivo da medição."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1279,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1277,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Período De *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1283,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: msrPeriodStart,
                                                        onChange: (e)=>setMsrPeriodStart(e.target.value),
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1284,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1282,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Período Até *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1288,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: msrPeriodEnd,
                                                        onChange: (e)=>setMsrPeriodEnd(e.target.value),
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1289,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1287,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Valor da Medição (R$) *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1293,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        step: "0.01",
                                                        value: msrValue,
                                                        onChange: (e)=>setMsrValue(e.target.value),
                                                        placeholder: "0,00",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1294,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1292,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Relatório / Descrição *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1299,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: msrDesc,
                                                        onChange: (e)=>setMsrDesc(e.target.value),
                                                        placeholder: "Descreva o serviço executado no período...",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1300,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1298,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1281,
                                        columnNumber: 17
                                    }, this),
                                    createMeasurementMutation.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2",
                                        children: createMeasurementMutation.error?.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1306,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setShowMeasurementForm(false);
                                                    setMsrPeriodStart('');
                                                    setMsrPeriodEnd('');
                                                    setMsrValue('');
                                                    setMsrDesc('');
                                                },
                                                className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                                children: "Cancelar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1311,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (!msrPeriodStart || !msrPeriodEnd || !msrValue || !msrDesc.trim()) {
                                                        alert('Preencha todos os campos obrigatórios.');
                                                        return;
                                                    }
                                                    createMeasurementMutation.mutate({
                                                        contractId,
                                                        periodStart: msrPeriodStart,
                                                        periodEnd: msrPeriodEnd,
                                                        measurementValue: Number(msrValue),
                                                        reportDescription: msrDesc
                                                    });
                                                },
                                                disabled: createMeasurementMutation.isPending,
                                                className: "flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1319,
                                                        columnNumber: 21
                                                    }, this),
                                                    " ",
                                                    createMeasurementMutation.isPending ? 'Salvando...' : 'Registrar Medição'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1313,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1310,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1276,
                                columnNumber: 15
                            }, this),
                            (c.measurements || []).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: (c.measurements || []).map((msr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50/60 border border-gray-200 p-4 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-bold text-gray-700",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(msr.measurementValue)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1331,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-gray-500",
                                                                children: [
                                                                    "Período: ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(msr.periodStart),
                                                                    " — ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(msr.periodEnd)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1332,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-gray-500 mt-0.5 line-clamp-2",
                                                                children: msr.reportDescription
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1333,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1330,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 shrink-0 ml-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: badgeCls(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measurementStatusColor"][msr.status] || ''),
                                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measurementStatusLabel"][msr.status] || msr.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1336,
                                                                columnNumber: 25
                                                            }, this),
                                                            isGestor && msr.status === 'PENDING_GESTOR' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>approveMeasurementMutation.mutate(msr.id),
                                                                        disabled: approveMeasurementMutation.isPending,
                                                                        title: "Aprovar medição",
                                                                        className: "p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 cursor-pointer disabled:opacity-50 hover:bg-emerald-500/20",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                            lineNumber: 1339,
                                                                            columnNumber: 319
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                        lineNumber: 1339,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setRejectMsrModal({
                                                                                id: msr.id
                                                                            }),
                                                                        title: "Rejeitar medição",
                                                                        className: "p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 cursor-pointer hover:bg-red-500/20",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                            lineNumber: 1340,
                                                                            columnNumber: 228
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                        lineNumber: 1340,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1338,
                                                                columnNumber: 27
                                                            }, this),
                                                            isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    if (confirm('Excluir esta medição permanentemente?')) deleteMeasurementMutation.mutate(msr.id);
                                                                },
                                                                disabled: deleteMeasurementMutation.isPending,
                                                                title: "Excluir medição",
                                                                className: "p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-3.5 w-3.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1348,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1344,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1335,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1329,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 flex gap-4 text-[10px] text-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Fiscal: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-gray-500",
                                                                children: msr.fiscal?.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1354,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1354,
                                                        columnNumber: 23
                                                    }, this),
                                                    msr.approver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Aprovado por: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-gray-500",
                                                                children: msr.approver.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1355,
                                                                columnNumber: 60
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1355,
                                                        columnNumber: 40
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTime"])(msr.createdAt)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1356,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1353,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, msr.id, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1328,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1326,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Nenhuma medição registrada."
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1361,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1261,
                        columnNumber: 11
                    }, this),
                    activeTab === 'ocorrencias' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-xs font-semibold text-gray-700",
                                        children: "Registro de Ocorrências"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1369,
                                        columnNumber: 15
                                    }, this),
                                    (user.role === 'FISCAL' || isGestor) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowOccurrenceForm((v)=>!v),
                                        className: "flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1372,
                                                columnNumber: 19
                                            }, this),
                                            " Registrar Ocorrência"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1371,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1368,
                                columnNumber: 13
                            }, this),
                            showOccurrenceForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                        children: "Registrar Nova Ocorrência"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1379,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "col-span-2 flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Título *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1382,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: occTitle,
                                                        onChange: (e)=>setOccTitle(e.target.value),
                                                        placeholder: "Título da ocorrência...",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1383,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1381,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Severidade *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1388,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: occSeverity,
                                                        onChange: (e)=>setOccSeverity(e.target.value),
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500/50 cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "LOW",
                                                                children: "Baixa"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1391,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "MEDIUM",
                                                                children: "Média"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1392,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "HIGH",
                                                                children: "Alta"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1393,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "CRITICAL",
                                                                children: "Crítica"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1394,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1389,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1387,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "col-span-2 flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Descrição *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1398,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: occDesc,
                                                        onChange: (e)=>setOccDesc(e.target.value),
                                                        rows: 3,
                                                        placeholder: "Descreva a ocorrência em detalhes...",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1399,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1397,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1380,
                                        columnNumber: 17
                                    }, this),
                                    createOccurrenceMutation.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2",
                                        children: createOccurrenceMutation.error?.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1405,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setShowOccurrenceForm(false);
                                                    setOccTitle('');
                                                    setOccDesc('');
                                                    setOccSeverity('MEDIUM');
                                                },
                                                className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                                children: "Cancelar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1410,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (!occTitle.trim() || !occDesc.trim()) {
                                                        alert('Preencha título e descrição.');
                                                        return;
                                                    }
                                                    createOccurrenceMutation.mutate({
                                                        contractId,
                                                        title: occTitle,
                                                        description: occDesc,
                                                        severity: occSeverity
                                                    });
                                                },
                                                disabled: createOccurrenceMutation.isPending,
                                                className: "flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1418,
                                                        columnNumber: 21
                                                    }, this),
                                                    " ",
                                                    createOccurrenceMutation.isPending ? 'Salvando...' : 'Registrar Ocorrência'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1412,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1409,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1378,
                                columnNumber: 15
                            }, this),
                            (c.occurrences || []).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: (c.occurrences || []).map((occ)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50/60 border border-gray-200 p-4 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `p-2 rounded-lg border ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["occurrenceSeverityColor"][occ.severity] || ''}`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                    className: "h-3.5 w-3.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1431,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1430,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-bold text-gray-700",
                                                                        children: occ.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                        lineNumber: 1434,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[10px] text-gray-500 mt-0.5",
                                                                        children: occ.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                        lineNumber: 1435,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1433,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1429,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 shrink-0 ml-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: badgeCls(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["occurrenceSeverityColor"][occ.severity] || ''),
                                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["occurrenceSeverityLabel"][occ.severity]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1439,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: badgeCls(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["occurrenceStatusColor"][occ.status] || ''),
                                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["occurrenceStatusLabel"][occ.status] || occ.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1440,
                                                                columnNumber: 25
                                                            }, this),
                                                            isGestor && occ.status === 'OPEN' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setResolveOccModal({
                                                                        id: occ.id
                                                                    }),
                                                                className: "flex items-center gap-1 text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg text-emerald-400 cursor-pointer hover:bg-emerald-500/20",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                        className: "h-3 w-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                        lineNumber: 1443,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    " Resolver"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1442,
                                                                columnNumber: 27
                                                            }, this),
                                                            isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    if (confirm('Excluir esta ocorrência permanentemente?')) deleteOccurrenceMutation.mutate(occ.id);
                                                                },
                                                                disabled: deleteOccurrenceMutation.isPending,
                                                                title: "Excluir ocorrência",
                                                                className: "p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-40",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-3.5 w-3.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1451,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1447,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1438,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1428,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 flex gap-4 text-[10px] text-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Registrado por: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-gray-500",
                                                                children: occ.fiscal?.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1457,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1457,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTime"])(occ.createdAt)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1458,
                                                        columnNumber: 23
                                                    }, this),
                                                    occ.resolvedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Resolvido em: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-gray-500",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(occ.resolvedAt)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1459,
                                                                columnNumber: 62
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1459,
                                                        columnNumber: 42
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1456,
                                                columnNumber: 21
                                            }, this),
                                            occ.resolutionDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-emerald-400 font-semibold",
                                                        children: "Resolução:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1463,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-gray-500",
                                                        children: occ.resolutionDescription
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1464,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1462,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, occ.id, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1427,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1425,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Nenhuma ocorrência registrada."
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1470,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1367,
                        columnNumber: 11
                    }, this),
                    activeTab === 'pagamentos' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-xs font-semibold text-gray-700",
                                                children: "Registro de Pagamentos"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1479,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 mt-0.5",
                                                children: "Registre pagamentos realizados ao contratado"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1480,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1478,
                                        columnNumber: 15
                                    }, this),
                                    (user.role === 'FISCAL' || user.role === 'GESTOR' || user.role === 'ADMIN') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowPaymentForm((v)=>!v),
                                        className: "flex items-center gap-1.5 text-[11px] bg-white hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg text-gray-700 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1485,
                                                columnNumber: 19
                                            }, this),
                                            " Novo Pagamento"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1483,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1477,
                                columnNumber: 13
                            }, this),
                            showPaymentForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                                        children: "Registrar Novo Pagamento"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1493,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Data do Pagamento *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1496,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: payDate,
                                                        onChange: (e)=>setPayDate(e.target.value),
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1497,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1495,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Valor (R$) *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1501,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        step: "0.01",
                                                        value: payValue,
                                                        onChange: (e)=>setPayValue(e.target.value),
                                                        placeholder: "0,00",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1502,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1500,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Nota Fiscal / NF"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1507,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: payInvoice,
                                                        onChange: (e)=>setPayInvoice(e.target.value),
                                                        placeholder: "Ex: NF-001234",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1508,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1506,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-medium text-gray-500 uppercase tracking-widest",
                                                        children: "Descrição *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1513,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: payDesc,
                                                        onChange: (e)=>setPayDesc(e.target.value),
                                                        placeholder: "Ex: Pagamento referência junho/2026",
                                                        className: "bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1514,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1512,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1494,
                                        columnNumber: 17
                                    }, this),
                                    createPaymentMutation.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2",
                                        children: createPaymentMutation.error?.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1520,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 pt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setShowPaymentForm(false);
                                                    setPayDate('');
                                                    setPayValue('');
                                                    setPayInvoice('');
                                                    setPayDesc('');
                                                },
                                                className: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-xs font-semibold cursor-pointer",
                                                children: "Cancelar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1525,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (!payDate || !payValue || !payDesc.trim()) {
                                                        alert('Preencha data, valor e descrição.');
                                                        return;
                                                    }
                                                    createPaymentMutation.mutate({
                                                        contractId,
                                                        paymentDate: payDate,
                                                        value: Number(payValue),
                                                        invoiceNumber: payInvoice || undefined,
                                                        description: payDesc
                                                    });
                                                },
                                                disabled: createPaymentMutation.isPending,
                                                className: "flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1536,
                                                        columnNumber: 21
                                                    }, this),
                                                    " ",
                                                    createPaymentMutation.isPending ? 'Salvando...' : 'Registrar Pagamento'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1529,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1524,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1492,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500",
                                                children: "Total Pago (NFs)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1545,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold text-emerald-400 mt-1",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])((c.payments || []).reduce((s, p)=>s + Number(p.value), 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1546,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1544,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500",
                                                children: "Saldo Contratual"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1551,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold text-blue-400 mt-1",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(c.currentValue - (c.payments || []).reduce((s, p)=>s + Number(p.value), 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1552,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1550,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-100/40 border border-gray-200 p-4 rounded-xl text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500",
                                                children: "% Pago"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1557,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold text-amber-400 mt-1",
                                                children: [
                                                    c.currentValue > 0 ? ((c.payments || []).reduce((s, p)=>s + Number(p.value), 0) / c.currentValue * 100).toFixed(1) : '0.0',
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1558,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1556,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1543,
                                columnNumber: 13
                            }, this),
                            (c.payments || []).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-gray-200 text-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 text-left font-semibold",
                                                        children: "Data"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1570,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 text-left font-semibold",
                                                        children: "Descrição"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1571,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 text-left font-semibold",
                                                        children: "NF"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1572,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 text-left font-semibold",
                                                        children: "Registrado por"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1573,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 text-right font-semibold",
                                                        children: "Valor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1574,
                                                        columnNumber: 23
                                                    }, this),
                                                    isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 w-8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1575,
                                                        columnNumber: 36
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1569,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1568,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-gray-200",
                                            children: (c.payments || []).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "text-gray-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(p.paymentDate)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1581,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5 max-w-xs truncate",
                                                            children: p.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1582,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5 text-gray-500",
                                                            children: p.invoiceNumber || '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1583,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5 text-gray-500",
                                                            children: p.registeredBy?.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1584,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5 text-right font-bold text-emerald-600",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(p.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1585,
                                                            columnNumber: 25
                                                        }, this),
                                                        isGestor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5 text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    if (confirm('Excluir este pagamento?')) deletePaymentMutation.mutate(p.id);
                                                                },
                                                                disabled: deletePaymentMutation.isPending,
                                                                className: "p-1 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer disabled:opacity-40",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1591,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1588,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                            lineNumber: 1587,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, p.id, true, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 1580,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1578,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1567,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1566,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-100/20 border border-dashed border-gray-200 rounded-xl p-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                        className: "h-8 w-8 text-gray-300 mx-auto mb-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1602,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: "Nenhum pagamento registrado."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1603,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-gray-400 mt-1",
                                        children: 'Use o botão "Novo Pagamento" para registrar.'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1604,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1601,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1476,
                        columnNumber: 11
                    }, this),
                    activeTab === 'alertas' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertsTab, {
                        contractAlerts: contractAlerts,
                        user: user,
                        queryClient: queryClient
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1612,
                        columnNumber: 11
                    }, this),
                    activeTab === 'historico' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContractHistory, {
                        contractId: contractId,
                        user: user
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1616,
                        columnNumber: 39
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 796,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/ContractTabs.tsx",
        lineNumber: 589,
        columnNumber: 5
    }, this);
}
_s2(ContractTabs, "A048hIp5wsgvuHSBllfTHGOpsmg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c2 = ContractTabs;
// ── Alertas Tab ──────────────────────────────────────────────────────────────
function AlertsTab({ contractAlerts, user, queryClient }) {
    _s3();
    const isAdmin = user.role === 'ADMIN';
    const respondMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "AlertsTab.useMutation[respondMutation]": ({ id, response })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].alerts.respond(id, response)
        }["AlertsTab.useMutation[respondMutation]"],
        onSuccess: {
            "AlertsTab.useMutation[respondMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'alerts-all'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'alerts-pending'
                    ]
                });
            }
        }["AlertsTab.useMutation[respondMutation]"]
    });
    const deleteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "AlertsTab.useMutation[deleteMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].alerts.delete(id)
        }["AlertsTab.useMutation[deleteMutation]"],
        onSuccess: {
            "AlertsTab.useMutation[deleteMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'alerts-all'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'alerts-pending'
                    ]
                });
            }
        }["AlertsTab.useMutation[deleteMutation]"]
    });
    const typeLabels = {
        CONTRACT_EXPIRING_180: 'Vencimento em 180 dias',
        CONTRACT_EXPIRING_90: 'Vencimento em 90 dias — Elaborar Aditivo',
        RENEWAL_REQUESTED: 'Prorrogação solicitada ao Gestor',
        RENEWAL_APPROVED: 'Prorrogação Aprovada pelo Gestor',
        RENEWAL_REJECTED: 'Prorrogação Negada pelo Gestor',
        MEASUREMENT_OVERDUE: 'Medição em atraso',
        ALTERATION_OVERDUE: 'Aditivo pendente',
        OCCURRENCE_CRITICAL_OPEN: 'Ocorrência crítica aberta',
        COMMUNICATION_MANDATORY: 'Comunicado obrigatório do Gestor',
        NEW_PROCESS_AUTO_CREATED: 'Novo processo iniciado',
        PROCESS_PHASE_OVERDUE: 'Fase do processo em atraso',
        DATA_CHANGE_REQUEST: 'Solicitação de Alteração de Dados',
        REPORT_REQUEST: 'Solicitação de Relatório/Informação',
        DEADLINE_NOTICE: 'Aviso de Prazo',
        COMPLIANCE_NOTICE: 'Aviso de Conformidade',
        GENERAL_NOTICE: 'Comunicação Geral',
        GESTOR_CONTRACT_UPDATE: 'Atualização pelo Gestor'
    };
    const statusColor = {
        PENDING: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        RESPONDED: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        DISMISSED: 'text-gray-500 bg-gray-100 border-gray-300',
        EXPIRED: 'text-gray-400 bg-white border-gray-300'
    };
    const statusLabel = {
        PENDING: 'Pendente',
        RESPONDED: 'Respondido',
        DISMISSED: 'Dispensado',
        EXPIRED: 'Expirado'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-xs font-semibold text-gray-700",
                children: "Alertas deste Contrato"
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 1667,
                columnNumber: 7
            }, this),
            contractAlerts.length > 0 ? contractAlerts.map((alert1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `border p-4 rounded-xl space-y-3 ${alert1.status === 'PENDING' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-blue-50/60 border-gray-200'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-bold text-gray-500 uppercase tracking-wider block",
                                            children: typeLabels[alert1.type] || alert1.type
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1673,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold text-gray-700 mt-0.5",
                                            children: alert1.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1674,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-gray-500 mt-0.5",
                                            children: alert1.message
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1675,
                                            columnNumber: 17
                                        }, this),
                                        alert1.metadata?.senderName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-blue-400 mt-1",
                                            children: [
                                                "De: ",
                                                alert1.metadata.senderName
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1677,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1672,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 ml-4 shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[9px] font-bold px-2 py-0.5 rounded border ${statusColor[alert1.status] || ''}`,
                                            children: statusLabel[alert1.status] || alert1.status
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1681,
                                            columnNumber: 17
                                        }, this),
                                        isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (confirm('Excluir este alerta permanentemente?')) deleteMutation.mutate(alert1.id);
                                            },
                                            disabled: deleteMutation.isPending,
                                            title: "Excluir alerta",
                                            className: "p-1 text-red-500/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer disabled:opacity-40",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1690,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1685,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1680,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 1671,
                            columnNumber: 13
                        }, this),
                        alert1.status === 'PENDING' && alert1.type === 'CONTRACT_EXPIRING_180' && user.role === 'FISCAL' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-100/60 border border-gray-300 rounded-xl p-3 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold text-amber-400 uppercase tracking-widest",
                                    children: "Providência necessária:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1699,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-gray-700",
                                    children: "Informe ao Gestor a providência desejada para este contrato:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1700,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>respondMutation.mutate({
                                                    id: alert1.id,
                                                    response: 'EXTEND_CONTRACT'
                                                }),
                                            disabled: respondMutation.isPending,
                                            className: "flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-lg py-2 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50",
                                            children: "Prorrogar Contrato"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1702,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>respondMutation.mutate({
                                                    id: alert1.id,
                                                    response: 'NEW_PROCESS'
                                                }),
                                            disabled: respondMutation.isPending,
                                            className: "flex-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg py-2 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50",
                                            children: "Nova Licitação"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1708,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1701,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 1698,
                            columnNumber: 15
                        }, this),
                        alert1.status === 'PENDING' && alert1.type === 'RENEWAL_REQUESTED' && user.role === 'GESTOR' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-100/60 border border-gray-300 rounded-xl p-3 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold text-blue-400 uppercase tracking-widest",
                                    children: "Aprovação do Gestor necessária:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1721,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>respondMutation.mutate({
                                                    id: alert1.id,
                                                    response: 'APPROVE_RENEWAL'
                                                }),
                                            disabled: respondMutation.isPending,
                                            className: "flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-lg py-2 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    className: "h-3.5 w-3.5 inline mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 1727,
                                                    columnNumber: 21
                                                }, this),
                                                " Aprovar Prorrogação"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1723,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>respondMutation.mutate({
                                                    id: alert1.id,
                                                    response: 'REJECT_RENEWAL'
                                                }),
                                            disabled: respondMutation.isPending,
                                            className: "flex-1 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg py-2 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                    className: "h-3.5 w-3.5 inline mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                    lineNumber: 1733,
                                                    columnNumber: 21
                                                }, this),
                                                " Rejeitar"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                                            lineNumber: 1729,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1722,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 1720,
                            columnNumber: 15
                        }, this),
                        alert1.type === 'CONTRACT_EXPIRING_90' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-500/5 border border-red-500/20 rounded-xl p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold text-red-400 uppercase tracking-widest",
                                    children: "Ação urgente:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1742,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-gray-700 mt-1",
                                    children: "Preparar e encaminhar o Termo Aditivo de prorrogação com urgência. Prazo crítico."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                    lineNumber: 1743,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 1741,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] text-gray-400",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTime"])(alert1.createdAt)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/ContractTabs.tsx",
                            lineNumber: 1747,
                            columnNumber: 13
                        }, this)
                    ]
                }, alert1.id, true, {
                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                    lineNumber: 1670,
                    columnNumber: 11
                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-6 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                        className: "h-8 w-8 text-emerald-500 mx-auto mb-2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1752,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-emerald-400 font-semibold",
                        children: "Nenhum alerta para este contrato"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1753,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 1751,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/ContractTabs.tsx",
        lineNumber: 1666,
        columnNumber: 5
    }, this);
}
_s3(AlertsTab, "OpAFVFi7dzIscpJ8IDuL/NcH5ws=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c3 = AlertsTab;
// ── Histórico (usa auditoria) ─────────────────────────────────────────────────
function ContractHistory({ contractId, user }) {
    _s4();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const isAdmin = user.role === 'ADMIN';
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'audit-logs'
        ],
        queryFn: {
            "ContractHistory.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].audit.list()
        }["ContractHistory.useQuery"]
    });
    const logs = (data?.logs || []).filter((l)=>l.entityId === contractId || l.entityId.startsWith(contractId));
    const deleteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ContractHistory.useMutation[deleteMutation]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].audit.delete(id)
        }["ContractHistory.useMutation[deleteMutation]"],
        onSuccess: {
            "ContractHistory.useMutation[deleteMutation]": ()=>queryClient.invalidateQueries({
                    queryKey: [
                        'audit-logs'
                    ]
                })
        }["ContractHistory.useMutation[deleteMutation]"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-xs font-semibold text-gray-700",
                children: "Histórico de Movimentações"
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 1778,
                columnNumber: 7
            }, this),
            logs.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-4 top-0 bottom-0 w-px bg-gray-100"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1781,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: logs.map((log)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative pl-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-2.5 top-1 h-3 w-3 rounded-full bg-gray-200 border-2 border-gray-200"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1785,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50/60 border border-gray-200 p-3 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-bold text-gray-500 uppercase tracking-wide",
                                                                children: log.action
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1789,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-700 mt-0.5",
                                                                children: log.entityLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1790,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1788,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 shrink-0 ml-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-gray-400",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$labels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTime"])(log.createdAt)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1793,
                                                                columnNumber: 23
                                                            }, this),
                                                            isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    if (confirm('Excluir este registro do histórico permanentemente?')) deleteMutation.mutate(log.id);
                                                                },
                                                                disabled: deleteMutation.isPending,
                                                                title: "Excluir registro",
                                                                className: "p-1 text-red-500/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer disabled:opacity-40",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                    lineNumber: 1800,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                                lineNumber: 1795,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1792,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1787,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 mt-1",
                                                children: [
                                                    "por ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-gray-500",
                                                        children: log.userName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                        lineNumber: 1805,
                                                        columnNumber: 69
                                                    }, this),
                                                    " (",
                                                    log.userRole,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                                lineNumber: 1805,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                                        lineNumber: 1786,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, log.id, true, {
                                fileName: "[project]/src/components/views/ContractTabs.tsx",
                                lineNumber: 1784,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/ContractTabs.tsx",
                        lineNumber: 1782,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 1780,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500",
                children: "Nenhuma movimentação registrada."
            }, void 0, false, {
                fileName: "[project]/src/components/views/ContractTabs.tsx",
                lineNumber: 1812,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/ContractTabs.tsx",
        lineNumber: 1777,
        columnNumber: 5
    }, this);
}
_s4(ContractHistory, "pAesOOg9OyYQqX+QOy1x0HPJJOc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c4 = ContractHistory;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SuccessionPanel");
__turbopack_context__.k.register(_c1, "GestorAlertModal");
__turbopack_context__.k.register(_c2, "ContractTabs");
__turbopack_context__.k.register(_c3, "AlertsTab");
__turbopack_context__.k.register(_c4, "ContractHistory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_views_ContractTabs_tsx_1shz-ly._.js.map