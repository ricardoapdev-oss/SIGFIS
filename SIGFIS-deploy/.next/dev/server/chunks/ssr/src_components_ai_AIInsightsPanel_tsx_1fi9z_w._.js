module.exports = [
"[project]/src/components/ai/AIInsightsPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIInsightsPanel",
    ()=>AIInsightsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain.mjs [app-ssr] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.mjs [app-ssr] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.mjs [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.mjs [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.mjs [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-ssr] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs [app-ssr] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-right.mjs [app-ssr] (ecmascript) <export default as ArrowDownRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.mjs [app-ssr] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.mjs [app-ssr] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/ComposedChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const SECTIONS = [
    {
        id: 'insights',
        label: 'Insights',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"]
    },
    {
        id: 'recommendations',
        label: 'Recomendações',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"]
    },
    {
        id: 'predictive',
        label: 'Preditiva',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
    },
    {
        id: 'compliance',
        label: 'Compliance',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
    },
    {
        id: 'suppliers',
        label: 'Fornecedores',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"]
    },
    {
        id: 'assistant',
        label: 'Assistente',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
    },
    {
        id: 'diagnosis',
        label: 'Diagnóstico',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"]
    }
];
// ── Info Tooltip ──────────────────────────────────────────────────────────────
function InfoTooltip({ text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group inline-flex items-center shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                className: "h-3 w-3 text-gray-400 group-hover:text-gray-500 cursor-help transition-colors"
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-100 border border-gray-300 rounded-xl p-3 text-[10px] text-gray-700 leading-relaxed shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 text-left font-normal whitespace-normal",
                children: text
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
function SevBadge({ sev }) {
    const cls = sev === 'CRITICAL' ? 'text-red-400 bg-red-500/10 border-red-500/30' : sev === 'HIGH' ? 'text-orange-400 bg-orange-500/10 border-orange-500/30' : sev === 'MEDIUM' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    const label = sev === 'CRITICAL' ? 'Crítico' : sev === 'HIGH' ? 'Alto' : sev === 'MEDIUM' ? 'Médio' : 'Baixo';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${cls}`,
        children: label
    }, void 0, false, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
const GRADE_TOOLTIPS = {
    A: 'Excelente (90–100 pts): Fornecedor sem ocorrências abertas, medições em dia e processos regulares. Recomendado para novos contratos e renovações.',
    B: 'Bom (75–89 pts): Desempenho satisfatório com eventuais pendências menores. Apto para renovação com monitoramento padrão.',
    C: 'Regular (60–74 pts): Fornecedor com algumas pendências. Exige acompanhamento mais próximo pelo fiscal designado.',
    D: 'Abaixo do esperado (45–59 pts): Ocorrências recorrentes ou medições atrasadas. Requerer plano de ação corretiva formal.',
    F: 'Crítico (<45 pts): Múltiplas não conformidades. Avaliar aplicação de sanções contratuais ou rescisão conforme cláusula contratual.'
};
function GradeChip({ grade, withTooltip }) {
    const cls = grade === 'A' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : grade === 'B' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' : grade === 'C' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : grade === 'D' ? 'text-orange-400 bg-orange-500/10 border-orange-500/30' : 'text-red-400 bg-red-500/10 border-red-500/30';
    if (withTooltip && GRADE_TOOLTIPS[grade]) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `text-sm font-black px-2.5 py-1 rounded-lg border ${cls}`,
                    children: grade
                }, void 0, false, {
                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTooltip, {
                    text: GRADE_TOOLTIPS[grade]
                }, void 0, false, {
                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `text-sm font-black px-2.5 py-1 rounded-lg border ${cls}`,
        children: grade
    }, void 0, false, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 72,
        columnNumber: 10
    }, this);
}
function ScoreGauge({ score }) {
    const pct = Math.min(1, Math.max(0, score / 100));
    const cx = 60, cy = 60, r = 48;
    const angle = Math.PI - pct * Math.PI;
    const ex = cx + r * Math.cos(angle);
    const ey = cy - r * Math.sin(angle);
    const largeArc = pct > 0.5 ? 1 : 0;
    const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "120",
        height: "70",
        viewBox: "0 0 120 70",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`,
                fill: "none",
                stroke: "#27272a",
                strokeWidth: "10",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            score > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: `M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`,
                fill: "none",
                stroke: color,
                strokeWidth: "10",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 86,
                columnNumber: 21
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: cx,
                y: cy - 6,
                textAnchor: "middle",
                fill: color,
                fontSize: "22",
                fontWeight: "bold",
                children: score
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: cx,
                y: cy + 10,
                textAnchor: "middle",
                fill: "#71717a",
                fontSize: "9",
                children: "/ 100"
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
// ── Section 1: Insights ────────────────────────────────────────────────────────
function InsightsSection({ insights, onNavigate }) {
    const catIcon = (cat)=>cat === 'EXPIRY' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
            lineNumber: 96,
            columnNumber: 24
        }, this) : cat === 'FISCAL' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
            lineNumber: 97,
            columnNumber: 26
        }, this) : cat === 'MEASUREMENT' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
            lineNumber: 98,
            columnNumber: 31
        }, this) : cat === 'OCCURRENCE' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
            lineNumber: 99,
            columnNumber: 30
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
            className: "h-3.5 w-3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this);
    const catLabel = {
        EXPIRY: 'Vencimento',
        FISCAL: 'Fiscal',
        MEASUREMENT: 'Medição',
        OCCURRENCE: 'Ocorrência',
        WORKLOAD: 'Carga de Trabalho'
    };
    if (!insights.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-10 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                className: "h-10 w-10 text-emerald-400 mx-auto mb-3"
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-bold text-emerald-400",
                children: "Nenhum insight crítico identificado"
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500 mt-1",
                children: "A carteira está dentro dos parâmetros normais."
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
    const critical = insights.filter((i)=>i.severity === 'CRITICAL').length;
    const high = insights.filter((i)=>i.severity === 'HIGH').length;
    const medium = insights.filter((i)=>i.severity === 'MEDIUM').length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-black text-red-400",
                                children: critical
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-widest text-gray-500 mt-0.5",
                                children: "Críticos"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-black text-orange-400",
                                children: high
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-widest text-gray-500 mt-0.5",
                                children: "Altos"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-black text-amber-400",
                                children: medium
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-widest text-gray-500 mt-0.5",
                                children: "Médios"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: insights.map((ins)=>{
                    const sevBg = ins.severity === 'CRITICAL' ? 'border-red-500/30 bg-red-500/5' : ins.severity === 'HIGH' ? 'border-orange-500/30 bg-orange-500/5' : ins.severity === 'MEDIUM' ? 'border-amber-500/30 bg-amber-500/5' : 'border-blue-500/20 bg-blue-500/5';
                    const iconColor = ins.severity === 'CRITICAL' ? 'text-red-400' : ins.severity === 'HIGH' ? 'text-orange-400' : ins.severity === 'MEDIUM' ? 'text-amber-400' : 'text-blue-400';
                    const btnCls = ins.severity === 'CRITICAL' ? 'text-red-400 border-red-500/30 bg-red-500/10' : ins.severity === 'HIGH' ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 rounded-xl border ${sevBg}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `shrink-0 mt-0.5 ${iconColor}`,
                                    children: catIcon(ins.category)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 142,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 flex-wrap mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SevBadge, {
                                                    sev: ins.severity
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] text-gray-500 uppercase tracking-widest",
                                                    children: catLabel[ins.category] ?? ins.category
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 21
                                                }, this),
                                                ins.contractNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] text-gray-400",
                                                    children: ins.contractNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 44
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 144,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-gray-800",
                                            children: ins.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-gray-500 mt-1 leading-snug",
                                            children: ins.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 150,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2.5 flex items-center justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 bg-gray-100/60 border border-gray-300 rounded-lg px-2.5 py-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[9px] text-gray-500 uppercase tracking-widest mb-0.5",
                                                            children: "Ação Recomendada"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] text-gray-700",
                                                            children: ins.action
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 21
                                                }, this),
                                                ins.contractId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onNavigate('details', ins.contractId),
                                                    className: `shrink-0 flex items-center gap-1 text-[9px] font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ${btnCls}`,
                                                    children: [
                                                        "Ver ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "h-2.5 w-2.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 151,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 143,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 141,
                            columnNumber: 15
                        }, this)
                    }, ins.id, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 140,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
// ── Section 2: Recommendations ────────────────────────────────────────────────
function RecommendationsSection({ recommendations, onNavigate }) {
    if (!recommendations.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-10 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                className: "h-10 w-10 text-emerald-400 mx-auto mb-3"
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-bold text-emerald-400",
                children: "Nenhuma ação prioritária pendente"
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] text-gray-500 uppercase tracking-widest",
                children: [
                    recommendations.length,
                    " ações priorizadas por impacto"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            recommendations.map((rec, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-100/30 border border-gray-200 rounded-xl p-4 flex items-start gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 shrink-0",
                            children: rec.priority
                        }, void 0, false, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 flex-wrap mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest",
                                            children: rec.category
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 189,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${rec.impact === 'HIGH' ? 'text-red-400 bg-red-500/10' : rec.impact === 'MEDIUM' ? 'text-amber-400 bg-amber-500/10' : 'text-blue-400 bg-blue-500/10'}`,
                                            children: [
                                                "Impacto ",
                                                rec.impact === 'HIGH' ? 'Alto' : rec.impact === 'MEDIUM' ? 'Médio' : 'Baixo'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${rec.effort === 'LOW' ? 'text-emerald-400 bg-emerald-500/10' : rec.effort === 'MEDIUM' ? 'text-gray-500 bg-gray-100' : 'text-red-400 bg-red-500/10'}`,
                                            children: [
                                                "Esforço ",
                                                rec.effort === 'LOW' ? 'Baixo' : rec.effort === 'MEDIUM' ? 'Médio' : 'Alto'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold text-gray-800",
                                    children: rec.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 197,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-gray-500 mt-0.5 leading-snug",
                                    children: rec.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this),
                        rec.contractId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onNavigate('details', rec.contractId),
                            className: "shrink-0 flex items-center gap-1 text-[9px] font-bold text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer",
                            children: [
                                "Ver ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "h-2.5 w-2.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 203,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 201,
                            columnNumber: 13
                        }, this)
                    ]
                }, idx, true, {
                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
// ── Section 3: Predictive ─────────────────────────────────────────────────────
function PredictiveSection({ predictions, monthlyData }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-3",
                children: predictions.map((pred, i)=>{
                    const TrendIcon = pred.trend === 'UP' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"] : pred.trend === 'DOWN' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__["ArrowDownRight"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"];
                    const trendColor = pred.trend === 'UP' ? 'text-emerald-400' : pred.trend === 'DOWN' ? 'text-red-400' : 'text-gray-500';
                    const barColor = pred.probability > 0.7 ? '#ef4444' : pred.probability > 0.4 ? '#f59e0b' : '#10b981';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-100/30 border border-gray-200 rounded-xl p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TrendIcon, {
                                                    className: `h-3.5 w-3.5 ${trendColor}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] text-gray-500 uppercase tracking-widest",
                                                    children: pred.timeframe
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 225,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5 mb-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold text-gray-800",
                                                    children: pred.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 21
                                                }, this),
                                                pred.tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTooltip, {
                                                    text: pred.tooltip
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 47
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 229,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-gray-500 leading-snug",
                                            children: pred.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 233,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 224,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "shrink-0 text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-black text-gray-800",
                                            children: [
                                                Math.round(pred.probability * 100),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 236,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[9px] text-gray-500 uppercase tracking-widest",
                                            children: "Probabilidade"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 237,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1.5 h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full rounded-full",
                                                style: {
                                                    width: `${pred.probability * 100}%`,
                                                    background: barColor
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 239,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 238,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 235,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 223,
                            columnNumber: 15
                        }, this)
                    }, i, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 222,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            monthlyData.length > 0 && (()=>{
                const chartData = monthlyData.map((m)=>({
                        name: m.name,
                        valueM: m.value > 0 ? +(m.value / 1_000_000).toFixed(2) : 0,
                        measuredK: m.measured > 0 ? Math.round(m.measured / 1000) : 0
                    }));
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-100/20 border border-gray-200 rounded-xl p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    className: "h-3.5 w-3.5 text-violet-400"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this),
                                " Evolução Financeira — Últimos 6 Meses"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: 180,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComposedChart"], {
                                data: chartData,
                                margin: {
                                    top: 4,
                                    right: 32,
                                    bottom: 4,
                                    left: -10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                            id: "intValGrad",
                                            x1: "0",
                                            y1: "0",
                                            x2: "0",
                                            y2: "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "5%",
                                                    stopColor: "#6366f1",
                                                    stopOpacity: 0.2
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "95%",
                                                    stopColor: "#6366f1",
                                                    stopOpacity: 0
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 261,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 260,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        strokeDasharray: "3 3",
                                        stroke: "#27272a",
                                        vertical: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 266,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "name",
                                        tick: {
                                            fill: '#71717a',
                                            fontSize: 9
                                        },
                                        axisLine: false,
                                        tickLine: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 267,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                        yAxisId: "value",
                                        tick: {
                                            fill: '#71717a',
                                            fontSize: 9
                                        },
                                        axisLine: false,
                                        tickLine: false,
                                        tickFormatter: (v)=>`${v}M`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 268,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                        yAxisId: "pct",
                                        orientation: "right",
                                        tick: {
                                            fill: '#71717a',
                                            fontSize: 9
                                        },
                                        axisLine: false,
                                        tickLine: false,
                                        tickFormatter: (v)=>`${v}K`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 270,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        contentStyle: {
                                            background: '#18181b',
                                            border: '1px solid #3f3f46',
                                            borderRadius: 8,
                                            fontSize: 11
                                        },
                                        formatter: (v, name)=>name === 'Carteira ativa' ? [
                                                `R$ ${Number(v).toFixed(2).replace('.', ',')}M`,
                                                name
                                            ] : [
                                                `${Number(v).toLocaleString('pt-BR')} mil`,
                                                name
                                            ]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 272,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                        yAxisId: "value",
                                        type: "monotone",
                                        dataKey: "valueM",
                                        stroke: "#6366f1",
                                        strokeWidth: 1.5,
                                        fill: "url(#intValGrad)",
                                        dot: false,
                                        name: "Carteira ativa"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                        yAxisId: "pct",
                                        type: "monotone",
                                        dataKey: "measuredK",
                                        stroke: "#10b981",
                                        strokeWidth: 2,
                                        dot: {
                                            fill: '#10b981',
                                            r: 3,
                                            strokeWidth: 0
                                        },
                                        activeDot: {
                                            r: 5
                                        },
                                        name: "Executado/medido"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 281,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-1.5 w-4 rounded-full bg-indigo-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 286,
                                            columnNumber: 58
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] text-gray-500",
                                            children: "Carteira ativa (R$ M — eixo esquerdo)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 286,
                                            columnNumber: 114
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 286,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-0.5 w-4 rounded-full bg-emerald-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 287,
                                            columnNumber: 58
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] text-gray-500",
                                            children: "% executado (eixo direito)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 287,
                                            columnNumber: 115
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 285,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                    lineNumber: 254,
                    columnNumber: 11
                }, this);
            })()
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
const COMPLIANCE_TOOLTIPS = {
    'Cobertura Fiscal': 'Peso: 25 pts — Percentual de contratos ativos com fiscal titular formalmente designado. Contratos sem fiscal violam o art. 117 da Lei 14.133/2021 (Nova Lei de Licitações), que exige designação de gestor/fiscal como condição de regularidade. Pontuação máxima quando 100% dos contratos ativos têm designação registrada.',
    'Ocorrências Críticas': 'Peso: 20 pts — Mede o índice de contratos com ocorrências (irregularidades, inadimplementos ou não conformidades) ainda em aberto. Ocorrências sem resolução formal indicam falha na fiscalização e podem caracterizar omissão do gestor. Cada contrato com ocorrência ativa reduz a pontuação proporcional ao total da carteira.',
    'Medições Pendentes': 'Peso: 20 pts — Avalia a regularidade das medições mensais de execução. Atrasos nas medições dificultam o acompanhamento da execução física e financeira do contrato, podendo levar a pagamentos sem correspondência com o serviço prestado — o que configura falha de fiscalização. A pontuação decresce por contrato com medição não aprovada.',
    'Contratos Expirando': 'Peso: 20 pts — Identifica contratos ativos a vencer em até 30 dias sem processo de renovação ou nova licitação formalmente iniciado. A descontinuidade de serviço por falta de contrato vigente configura irregularidade administrativa. A pontuação é reduzida proporcionalmente ao número de contratos nessa situação.',
    'Processos em Dia': 'Peso: 15 pts — Verifica se os processos licitatórios vinculados aos contratos estão em andamento regular, sem etapas com prazo vencido ou com status "Bloqueado". Processos atrasados comprometem a formalização tempestiva de novos contratos e aditivos, gerando risco de desabastecimento ou contratação emergencial.'
};
// ── Section 4: Compliance ─────────────────────────────────────────────────────
function ComplianceSection({ compliance }) {
    if (!compliance) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center py-8 text-gray-500 text-xs",
        children: "Dados insuficientes para calcular compliance."
    }, void 0, false, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 306,
        columnNumber: 27
    }, this);
    const { overallScore, grade, dimensions, contractsAudit } = compliance;
    const dimBarColor = (s)=>s === 'OK' ? 'bg-emerald-500' : s === 'WARNING' ? 'bg-amber-500' : 'bg-red-500';
    const dimTextColor = (s)=>s === 'OK' ? 'text-emerald-400' : s === 'WARNING' ? 'text-amber-400' : 'text-red-400';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-100/20 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoreGauge, {
                                score: overallScore
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GradeChip, {
                                        grade: grade
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 316,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-gray-700",
                                                children: "Score Geral"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500",
                                                children: "Compliance Contratual"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 319,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-3 w-full",
                        children: dimensions.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-gray-500",
                                                        children: d.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTooltip, {
                                                        text: COMPLIANCE_TOOLTIPS[d.name] ?? ''
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 327,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-[10px] font-bold ${dimTextColor(d.status)}`,
                                                children: [
                                                    d.score,
                                                    "/",
                                                    d.maxScore
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 331,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 326,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1.5 bg-gray-100 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `h-full rounded-full transition-all ${dimBarColor(d.status)}`,
                                            style: {
                                                width: `${d.score / d.maxScore * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 334,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, d.name, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-100/20 border border-gray-200 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-gray-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest",
                            children: "Auditoria por Contrato (Top 10 Ativos)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divide-y divide-gray-200",
                        children: contractsAudit.map((c)=>{
                            const g = c.score >= 90 ? 'A' : c.score >= 75 ? 'B' : c.score >= 60 ? 'C' : c.score >= 45 ? 'D' : 'F';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3 flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GradeChip, {
                                            grade: g
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 349,
                                            columnNumber: 43
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 349,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-gray-700",
                                                children: c.contractNumber
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 351,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-500 truncate",
                                                children: c.object
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 352,
                                                columnNumber: 19
                                            }, this),
                                            c.issues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1 mt-1",
                                                children: c.issues.map((issue, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[8px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded-full",
                                                        children: issue
                                                    }, i, false, {
                                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                        lineNumber: 356,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 354,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 350,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "shrink-0 text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-bold text-gray-700",
                                                children: c.score
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 362,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-gray-400",
                                                children: "/100"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 363,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 361,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, c.contractId, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 348,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 311,
        columnNumber: 5
    }, this);
}
// ── Section 5: Suppliers ──────────────────────────────────────────────────────
function SuppliersSection({ suppliers }) {
    if (!suppliers.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center py-8 text-gray-500 text-xs",
        children: "Nenhum fornecedor encontrado."
    }, void 0, false, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 376,
        columnNumber: 33
    }, this);
    const counts = {
        A: suppliers.filter((s)=>s.grade === 'A').length,
        B: suppliers.filter((s)=>s.grade === 'B').length,
        C: suppliers.filter((s)=>s.grade === 'C').length,
        D: suppliers.filter((s)=>s.grade === 'D' || s.grade === 'F').length
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-3",
                children: [
                    {
                        grade: 'A',
                        count: counts.A,
                        color: 'bg-emerald-500/10 border-emerald-500/20',
                        num: 'text-emerald-400'
                    },
                    {
                        grade: 'B',
                        count: counts.B,
                        color: 'bg-blue-500/10 border-blue-500/20',
                        num: 'text-blue-400'
                    },
                    {
                        grade: 'C',
                        count: counts.C,
                        color: 'bg-amber-500/10 border-amber-500/20',
                        num: 'text-amber-400'
                    },
                    {
                        grade: 'D/F',
                        count: counts.D,
                        color: 'bg-red-500/10 border-red-500/20',
                        num: 'text-red-400'
                    }
                ].map(({ grade, count, color, num })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${color} border rounded-xl p-3 text-center`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-2xl font-black ${num}`,
                                children: count
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-1 mt-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] text-gray-500 uppercase tracking-widest",
                                        children: [
                                            "Nota ",
                                            grade
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTooltip, {
                                        text: GRADE_TOOLTIPS[grade] ?? GRADE_TOOLTIPS['F']
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this)
                        ]
                    }, grade, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 387,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-100/20 border border-gray-200 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 grid grid-cols-12 gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-1",
                                children: "#"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-4",
                                children: "Fornecedor"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 399,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2 text-center",
                                children: "Contratos"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 400,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2 text-center",
                                children: "Ocorrências"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 401,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2 text-center",
                                children: "Score"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-1 text-center",
                                children: "Nota"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divide-y divide-gray-200 max-h-[420px] overflow-y-auto",
                        children: suppliers.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-gray-100/20 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-1 text-xs font-bold text-gray-400",
                                        children: i + 1
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-4 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-gray-800 truncate",
                                                children: s.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 410,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-gray-500 truncate",
                                                children: s.category
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 411,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 409,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-gray-700",
                                                children: s.activeContracts
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 414,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-gray-400",
                                                children: "ativos"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 413,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-xs font-bold ${s.openOccurrences > 0 ? 'text-red-400' : 'text-gray-500'}`,
                                                children: s.openOccurrences
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 418,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-gray-400",
                                                children: "abertas"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 419,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 417,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-gray-800",
                                                children: s.score
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 422,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1 bg-gray-100 rounded-full mt-1 overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full rounded-full",
                                                    style: {
                                                        width: `${s.score}%`,
                                                        background: s.score >= 75 ? '#10b981' : s.score >= 50 ? '#f59e0b' : '#ef4444'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 424,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 423,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-1 flex justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GradeChip, {
                                            grade: s.grade,
                                            withTooltip: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 427,
                                            columnNumber: 63
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, s.contractorId, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 379,
        columnNumber: 5
    }, this);
}
// ── Section 6: Assistant ──────────────────────────────────────────────────────
function AssistantSection({ chatHistory, setChatHistory, chatInput, setChatInput, processQuestion }) {
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [
        chatHistory
    ]);
    const sendMessage = ()=>{
        const q = chatInput.trim();
        if (!q) return;
        const answer = processQuestion(q);
        setChatHistory((prev)=>[
                ...prev,
                {
                    role: 'user',
                    text: q
                },
                {
                    role: 'assistant',
                    text: answer
                }
            ]);
        setChatInput('');
    };
    const suggestions = [
        'Quantos contratos vencem este mês?',
        'Qual fiscal tem mais contratos?',
        'Quais contratos têm medição pendente?',
        'Qual o valor total da carteira?',
        'Quais contratos estão sem fiscal?',
        'Qual contrato tem o maior valor?',
        'Quantos contratos estão com ocorrência aberta?',
        'Qual a taxa de execução financeira?',
        'Quais contratos vencem em 90 dias?',
        'Quais fornecedores têm nota abaixo de C?',
        'Qual contrato tem menos dias restantes?',
        'Qual a média de valor dos contratos ativos?',
        'Quais contratos foram encerrados?',
        'Quais contratos têm processo atrasado?',
        'Qual o saldo financeiro a pagar?'
    ];
    const ASSISTANT_TOOLTIP = 'O assistente responde perguntas em linguagem natural sobre a carteira de contratos. Você pode perguntar sobre: vencimentos e prazos, fiscais designados, medições pendentes, ocorrências abertas, valores financeiros, fornecedores, riscos e compliance. As respostas são calculadas em tempo real a partir dos dados do sistema.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-violet-500/5 border border-violet-500/20 rounded-xl p-3 flex items-start gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                        className: "h-4 w-4 text-violet-400 shrink-0 mt-0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 478,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-gray-500",
                        children: "Assistente baseado nos dados reais da carteira. Faça perguntas em linguagem natural sobre contratos, fiscais, medições e valores."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 479,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50/60 border border-gray-200 rounded-xl p-4 min-h-[240px] max-h-[400px] overflow-y-auto space-y-3",
                children: [
                    chatHistory.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                className: "h-8 w-8 text-gray-400 mx-auto mb-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 484,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400",
                                children: "Faça uma pergunta sobre a carteira de contratos"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 485,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 justify-center mt-4",
                                children: suggestions.slice(0, 3).map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setChatInput(s),
                                        className: "text-[10px] text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer",
                                        children: s
                                    }, i, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 488,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 486,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 483,
                        columnNumber: 11
                    }, this) : chatHistory.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `max-w-[80%] rounded-xl px-3 py-2 ${msg.role === 'user' ? 'bg-violet-500/20 border border-violet-500/30 text-gray-800' : 'bg-gray-100/60 border border-gray-300 text-gray-700'}`,
                                children: [
                                    msg.role === 'assistant' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[8px] font-bold text-violet-400 uppercase tracking-widest mb-1",
                                        children: "Assistente"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 499,
                                        columnNumber: 46
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                        className: "text-[11px] whitespace-pre-wrap font-sans leading-relaxed",
                                        children: msg.text
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 500,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 498,
                                columnNumber: 15
                            }, this)
                        }, i, false, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 497,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 481,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: chatInput,
                        onChange: (e)=>setChatInput(e.target.value),
                        onKeyDown: (e)=>e.key === 'Enter' && sendMessage(),
                        placeholder: "Pergunte sobre contratos, fiscais, medições...",
                        className: "flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 508,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: sendMessage,
                        className: "bg-violet-500 hover:bg-violet-400 text-white px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 512,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 511,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 507,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] text-gray-400 uppercase tracking-widest",
                                children: "Sugestões rápidas"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 517,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTooltip, {
                                text: ASSISTANT_TOOLTIP
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 518,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 516,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: suggestions.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setChatInput(s),
                                className: "flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "h-2.5 w-2.5 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 524,
                                        columnNumber: 15
                                    }, this),
                                    s
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 522,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 520,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 515,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 476,
        columnNumber: 5
    }, this);
}
// ── Section 7: Diagnosis ──────────────────────────────────────────────────────
function DiagnosisSection({ contracts, selectedContractId, setSelectedContractId, diagnosis, onNavigate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2",
                        children: "Selecionar Contrato para Diagnóstico"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 541,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedContractId,
                        onChange: (e)=>setSelectedContractId(e.target.value),
                        className: "w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500/50 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "— Selecione um contrato ativo —"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 544,
                                columnNumber: 11
                            }, this),
                            contracts.filter((c)=>c.status === 'ACTIVE').map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: c.id,
                                    children: [
                                        c.contractNumber,
                                        " — ",
                                        (c.objectDescription ?? '').substring(0, 55)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 546,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 542,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 540,
                columnNumber: 7
            }, this),
            !diagnosis ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-100/20 border border-gray-200 rounded-xl p-10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "h-8 w-8 text-gray-400 mx-auto mb-3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 552,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-400",
                        children: "Selecione um contrato para gerar o diagnóstico de saúde"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 553,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 551,
                columnNumber: 9
            }, this) : (()=>{
                const { contract: c, daysRemaining, issues, score } = diagnosis;
                const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 45 ? 'D' : 'F';
                const fiscal = c.fiscalAssignments?.[0]?.fiscal;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-100/30 border border-gray-200 rounded-xl p-5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoreGauge, {
                                                score: score
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 564,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GradeChip, {
                                                    grade: grade
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 565,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 565,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 563,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest",
                                                children: "Diagnóstico Individual"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 568,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-black text-gray-900 mt-0.5",
                                                children: c.contractNumber
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 569,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-0.5 line-clamp-2",
                                                children: c.objectDescription
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 570,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-4 mt-3 text-[10px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-400",
                                                                children: "Contratada"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                                lineNumber: 572,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-700 font-bold",
                                                                children: c.contractor?.tradeName || c.contractor?.name || '—'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                                lineNumber: 572,
                                                                columnNumber: 69
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                        lineNumber: 572,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-400",
                                                                children: "Valor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                                lineNumber: 573,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-700 font-bold",
                                                                children: (c.currentValue ?? 0).toLocaleString('pt-BR', {
                                                                    style: 'currency',
                                                                    currency: 'BRL'
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                                lineNumber: 573,
                                                                columnNumber: 64
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                        lineNumber: 573,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-400",
                                                                children: "Vencimento"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                                lineNumber: 574,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `font-bold ${daysRemaining <= 30 ? 'text-red-400' : daysRemaining <= 90 ? 'text-amber-400' : 'text-gray-700'}`,
                                                                children: [
                                                                    new Date(c.endDate).toLocaleDateString('pt-BR'),
                                                                    " (",
                                                                    daysRemaining,
                                                                    "d)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                                lineNumber: 574,
                                                                columnNumber: 69
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-400",
                                                                children: "Fiscal"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                                lineNumber: 575,
                                                                columnNumber: 26
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `font-bold ${fiscal ? 'text-gray-700' : 'text-red-400'}`,
                                                                children: fiscal?.name ?? 'Sem designação'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                                lineNumber: 575,
                                                                columnNumber: 65
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                lineNumber: 571,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 567,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 562,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 561,
                            columnNumber: 13
                        }, this),
                        issues.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-500/5 border border-red-500/20 rounded-xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2",
                                    children: "Não conformidades identificadas"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 582,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1.5",
                                    children: issues.map((issue, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-2 text-[11px] text-gray-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                    className: "h-3 w-3 text-red-400 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 23
                                                }, this),
                                                " ",
                                                issue
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 585,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 583,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 581,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                    className: "h-5 w-5 text-emerald-400 shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 593,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold text-emerald-400",
                                    children: "Contrato em conformidade — nenhuma não conformidade identificada"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 594,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 592,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                            children: [
                                {
                                    label: 'Fiscal Designado',
                                    ok: (c.fiscalAssignments?.length ?? 0) > 0
                                },
                                {
                                    label: 'Sem Ocorrências Abertas',
                                    ok: !c.hasOpenOccurrences
                                },
                                {
                                    label: 'Medições em Dia',
                                    ok: !c.hasPendingMeasurements
                                },
                                {
                                    label: 'Processo sem Atraso',
                                    ok: !c.hasDelayedProcesses
                                }
                            ].map(({ label, ok })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `rounded-xl p-3 border text-center ${ok ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`,
                                    children: [
                                        ok ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            className: "h-4 w-4 text-emerald-400 mx-auto mb-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 605,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                            className: "h-4 w-4 text-red-400 mx-auto mb-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 605,
                                            columnNumber: 93
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[9px] text-gray-500",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                            lineNumber: 606,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, label, true, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 604,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 597,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onNavigate('details', c.id),
                            className: "w-full flex items-center justify-center gap-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-400 font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                    className: "h-3.5 w-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                    lineNumber: 612,
                                    columnNumber: 15
                                }, this),
                                " Abrir Contrato Completo"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                            lineNumber: 610,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                    lineNumber: 560,
                    columnNumber: 11
                }, this);
            })()
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 539,
        columnNumber: 5
    }, this);
}
function AIInsightsPanel({ user, onNavigate }) {
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('insights');
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [chatHistory, setChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedContractId, setSelectedContractId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const { data: dashData, isLoading: dashLoading, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'intelligence-dash',
            user.id
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].dashboard.gestor(),
        staleTime: 60_000
    });
    // Reusa cache de contratos já carregado pelo ContractsListView (mesma queryKey)
    const { data: contractsRaw, isLoading: contractsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'contracts-list',
            user.id
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].contracts.list(),
        staleTime: 300_000
    });
    const contracts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Array.isArray(contractsRaw) ? contractsRaw : contractsRaw?.data ?? [], [
        contractsRaw
    ]);
    const dash = dashData;
    const isLoading = dashLoading || contractsLoading;
    const autoInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!dash || !contracts.length) return [];
        const insights = [];
        const now = new Date();
        contracts.filter((c)=>c.status === 'ACTIVE').forEach((c)=>{
            const days = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
            if (days < 0) insights.push({
                id: `exp-${c.id}`,
                category: 'EXPIRY',
                severity: 'CRITICAL',
                title: `Contrato vencido há ${Math.abs(days)}d`,
                description: `${c.contractNumber} encerrou em ${new Date(c.endDate).toLocaleDateString('pt-BR')} e ainda está ativo.`,
                action: 'Encerrar ou regularizar prorrogação imediatamente.',
                contractId: c.id,
                contractNumber: c.contractNumber
            });
            else if (days <= 30) insights.push({
                id: `exp-${c.id}`,
                category: 'EXPIRY',
                severity: 'CRITICAL',
                title: `Vence em ${days} dias`,
                description: `${c.contractNumber} — risco iminente de descontinuidade.`,
                action: 'Iniciar processo de prorrogação ou nova licitação urgentemente.',
                contractId: c.id,
                contractNumber: c.contractNumber
            });
            else if (days <= 60) insights.push({
                id: `exp-${c.id}`,
                category: 'EXPIRY',
                severity: 'HIGH',
                title: `Vence em ${days} dias`,
                description: `${c.contractNumber} encerra em ${new Date(c.endDate).toLocaleDateString('pt-BR')}.`,
                action: 'Iniciar processo de renovação ou licitação substitutiva.',
                contractId: c.id,
                contractNumber: c.contractNumber
            });
            else if (days <= 90) insights.push({
                id: `exp-${c.id}`,
                category: 'EXPIRY',
                severity: 'MEDIUM',
                title: `Atenção: vence em ${days} dias`,
                description: `${c.contractNumber} — planejar renovação.`,
                action: 'Avaliar necessidade e iniciar processo de renovação.',
                contractId: c.id,
                contractNumber: c.contractNumber
            });
        });
        const noFiscal = contracts.filter((c)=>c.status === 'ACTIVE' && !c.fiscalAssignments?.some((a)=>a.isActive));
        if (noFiscal.length) insights.push({
            id: 'no-fiscal',
            category: 'FISCAL',
            severity: 'HIGH',
            title: `${noFiscal.length} contrato(s) sem fiscal designado`,
            description: `Contratos: ${noFiscal.slice(0, 3).map((c)=>c.contractNumber).join(', ')}${noFiscal.length > 3 ? ` +${noFiscal.length - 3}` : ''}.`,
            action: 'Designar fiscal titular conforme Lei 14.133/21.'
        });
        const pendingMsr = contracts.filter((c)=>c.measurements?.some((m)=>m.status === 'PENDING_GESTOR' || m.status === 'PENDING_FISCAL') || c.hasPendingMeasurements);
        if (pendingMsr.length) insights.push({
            id: 'pending-msr',
            category: 'MEASUREMENT',
            severity: 'MEDIUM',
            title: `${pendingMsr.length} contrato(s) com medição aguardando homologação`,
            description: `Medições submetidas aguardando aprovação do gestor.`,
            action: 'Revisar e aprovar ou reprovar as medições pendentes.'
        });
        const openOcc = contracts.filter((c)=>c.occurrences?.some((o)=>o.status !== 'RESOLVED') || c.hasOpenOccurrences);
        if (openOcc.length) insights.push({
            id: 'open-occ',
            category: 'OCCURRENCE',
            severity: dash?.riskSummary?.critical > 0 ? 'HIGH' : 'MEDIUM',
            title: `${openOcc.length} contrato(s) com ocorrências abertas`,
            description: `Ocorrências abertas aguardando resolução formal.`,
            action: 'Acompanhar e resolver, especialmente as críticas.'
        });
        const overloaded = (dash?.fiscalWorkload ?? []).filter((f)=>f.contracts >= 5);
        if (overloaded.length) insights.push({
            id: 'workload',
            category: 'WORKLOAD',
            severity: 'MEDIUM',
            title: `${overloaded.length} fiscal(is) com carga excessiva (≥5 contratos)`,
            description: `${overloaded.map((f)=>f.shortName).join(', ')} — risco de falhas.`,
            action: 'Redistribuir contratos ou designar fiscais substitutos.'
        });
        const order = {
            CRITICAL: 0,
            HIGH: 1,
            MEDIUM: 2,
            LOW: 3
        };
        return insights.sort((a, b)=>(order[a.severity] ?? 4) - (order[b.severity] ?? 4));
    }, [
        dash,
        contracts
    ]);
    const recommendations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const recs = [];
        const now = new Date();
        let p = 1;
        contracts.filter((c)=>{
            const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
            return c.status === 'ACTIVE' && d >= 0 && d <= 30;
        }).forEach((c)=>recs.push({
                priority: p++,
                category: 'Renovação Urgente',
                title: `Renovar: ${c.contractNumber}`,
                description: 'Vence em menos de 30 dias. Risco de descontinuidade imediata.',
                impact: 'HIGH',
                effort: 'HIGH',
                contractId: c.id
            }));
        contracts.filter((c)=>c.measurements?.some((m)=>m.status === 'PENDING_GESTOR' || m.status === 'PENDING_FISCAL') || c.hasPendingMeasurements).forEach((c)=>recs.push({
                priority: p++,
                category: 'Homologação',
                title: `Homologar medição: ${c.contractNumber}`,
                description: 'Medição aguardando aprovação. Prazo médio: 10 dias úteis.',
                impact: 'MEDIUM',
                effort: 'LOW',
                contractId: c.id
            }));
        const noFiscal = contracts.filter((c)=>c.status === 'ACTIVE' && !c.fiscalAssignments?.some((a)=>a.isActive));
        if (noFiscal.length) recs.push({
            priority: p++,
            category: 'Designação',
            title: `Designar fiscal para ${noFiscal.length} contrato(s)`,
            description: 'A Lei 14.133/21 exige designação formal de fiscal. Risco de autuação.',
            impact: 'HIGH',
            effort: 'MEDIUM'
        });
        contracts.filter((c)=>c.occurrences?.some((o)=>o.status !== 'RESOLVED') || c.hasOpenOccurrences).forEach((c)=>recs.push({
                priority: p++,
                category: 'Ocorrência',
                title: `Resolver ocorrência: ${c.contractNumber}`,
                description: 'Ocorrência aberta requer documentação de resolução.',
                impact: 'MEDIUM',
                effort: 'MEDIUM',
                contractId: c.id
            }));
        contracts.filter((c)=>{
            const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
            return c.status === 'ACTIVE' && d > 30 && d <= 60;
        }).slice(0, 3).forEach((c)=>recs.push({
                priority: p++,
                category: 'Renovação',
                title: `Planejar renovação: ${c.contractNumber}`,
                description: 'Contrato vence em 31–60 dias.',
                impact: 'HIGH',
                effort: 'MEDIUM',
                contractId: c.id
            }));
        return recs;
    }, [
        contracts
    ]);
    const predictions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!dash) return [];
        const monthly = dash?.charts?.monthlyEvolution ?? [];
        const last3 = monthly.slice(-3);
        const measuredTrend = last3.length >= 2 ? last3[last3.length - 1].measured - last3[0].measured : 0;
        return [
            {
                title: 'Contratos em risco de descontinuidade',
                description: `${dash?.extendedAlerts?.expiring30 ?? 0} contratos vencem nos próximos 30 dias sem renovação confirmada.`,
                probability: Math.min(0.9, 0.3 + (dash?.extendedAlerts?.expiring30 ?? 0) * 0.2),
                timeframe: 'Próximos 30 dias',
                trend: 'DOWN',
                tooltip: 'Contratos ativos que encerram nos próximos 30 dias sem processo formal de renovação ou nova licitação iniciada. O risco de descontinuidade representa a probabilidade de o serviço ou fornecimento ser interrompido por falta de cobertura contratual — o que configura irregularidade administrativa.'
            },
            {
                title: 'Tendência de execução financeira',
                description: measuredTrend > 0 ? `Execução cresceu R$ ${measuredTrend.toLocaleString('pt-BR')} nos últimos 3 meses.` : measuredTrend < 0 ? `Execução reduziu R$ ${Math.abs(measuredTrend).toLocaleString('pt-BR')} — possível subexecução.` : 'Execução financeira estável.',
                probability: 0.75,
                timeframe: 'Últimos 3 meses',
                trend: measuredTrend > 0 ? 'UP' : measuredTrend < 0 ? 'DOWN' : 'STABLE',
                tooltip: 'Compara o total de medições aprovadas (valores efetivamente pagos à contratada) entre os últimos 3 meses. Redução pode indicar subexecução — quando o contratado entrega menos do que o previsto — o que pode gerar necessidade de glosa ou distrato parcial. Crescimento indica boa evolução dos serviços.'
            },
            {
                title: 'Risco de não conformidade',
                description: `${dash?.riskSummary?.critical ?? 0} contratos em risco crítico. Resolução necessária em até 15 dias.`,
                probability: Math.min(0.85, 0.2 + (dash?.riskSummary?.critical ?? 0) * 0.15),
                timeframe: 'Próximas 2 semanas',
                trend: 'STABLE',
                tooltip: 'Contratos classificados em risco crítico possuem irregularidades que podem resultar em autuação pelo controle interno, glosa de valores ou questionamento pelo TCE. Exemplos: contrato vencido ainda ativo, ausência de fiscal designado, ocorrência crítica sem resposta ou processo judicial aberto. Resolução em até 15 dias úteis é o prazo mínimo recomendado.'
            },
            {
                title: 'Risco de sobrecarga de fiscais',
                description: `${(dash?.fiscalWorkload ?? []).filter((f)=>f.contracts >= 5).length} fiscal(is) acima da capacidade. Risco de falhas na fiscalização.`,
                probability: 0.6,
                timeframe: 'Situação atual',
                trend: 'STABLE',
                tooltip: 'Fiscais com 5 ou mais contratos simultâneos excedem a capacidade operacional recomendada. A sobrecarga aumenta o risco de medições não realizadas no prazo, ocorrências não identificadas a tempo e falhas de registro — o que pode comprometer a regularidade do contrato e a responsabilidade do fiscal perante a Lei 8.666/93 e a Lei 14.133/21.'
            }
        ];
    }, [
        dash
    ]);
    const compliance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!contracts.length || !dash) return null;
        const active = contracts.filter((c)=>c.status === 'ACTIVE');
        const total = active.length;
        if (!total) return null;
        const now = new Date();
        const fiscalScore = Math.round(active.filter((c)=>c.fiscalAssignments?.length > 0).length / total * 25);
        const occScore = Math.round(Math.max(0, 1 - active.filter((c)=>c.hasOpenOccurrences).length / total) * 20);
        const msrScore = Math.round(Math.max(0, 1 - active.filter((c)=>c.hasPendingMeasurements).length / total) * 20);
        const exp30 = active.filter((c)=>{
            const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
            return d >= 0 && d <= 30;
        }).length;
        const expiryScore = Math.round(Math.max(0, 1 - exp30 / total) * 20);
        const processScore = Math.round(Math.max(0, 1 - active.filter((c)=>c.hasDelayedProcesses).length / total) * 15);
        const totalScore = fiscalScore + occScore + msrScore + expiryScore + processScore;
        const grade = totalScore >= 90 ? 'A' : totalScore >= 75 ? 'B' : totalScore >= 60 ? 'C' : totalScore >= 45 ? 'D' : 'F';
        const st = (v, min1, min2)=>v >= min1 ? 'OK' : v >= min2 ? 'WARNING' : 'CRITICAL';
        return {
            overallScore: totalScore,
            grade,
            dimensions: [
                {
                    name: 'Cobertura Fiscal',
                    score: fiscalScore,
                    maxScore: 25,
                    status: st(fiscalScore, 20, 12)
                },
                {
                    name: 'Ocorrências Críticas',
                    score: occScore,
                    maxScore: 20,
                    status: st(occScore, 16, 10)
                },
                {
                    name: 'Medições Pendentes',
                    score: msrScore,
                    maxScore: 20,
                    status: st(msrScore, 16, 10)
                },
                {
                    name: 'Contratos Expirando',
                    score: expiryScore,
                    maxScore: 20,
                    status: st(expiryScore, 16, 10)
                },
                {
                    name: 'Processos em Dia',
                    score: processScore,
                    maxScore: 15,
                    status: st(processScore, 12, 7)
                }
            ],
            contractsAudit: active.slice(0, 10).map((c)=>{
                const issues = [];
                if (!c.fiscalAssignments?.length) issues.push('Sem fiscal');
                if (c.hasOpenOccurrences) issues.push('Ocorrência aberta');
                if (c.hasPendingMeasurements) issues.push('Medição pendente');
                if (c.hasDelayedProcesses) issues.push('Processo atrasado');
                const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
                if (d >= 0 && d <= 90) issues.push(`Vence em ${d}d`);
                return {
                    contractId: c.id,
                    contractNumber: c.contractNumber,
                    object: (c.objectDescription ?? '').substring(0, 45),
                    score: Math.max(0, 100 - issues.length * 18),
                    issues
                };
            })
        };
    }, [
        contracts,
        dash
    ]);
    const suppliers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!contracts.length) return [];
        const map = {};
        contracts.forEach((c)=>{
            if (!c.contractor) return;
            const id = c.contractorId ?? c.contractor?.id ?? 'unknown';
            if (!map[id]) map[id] = {
                name: c.contractor?.tradeName || c.contractor?.corporateName || c.contractor?.name || '—',
                category: c.contractor?.category ?? 'N/A',
                list: []
            };
            map[id].list.push(c);
        });
        return Object.entries(map).map(([id, d])=>{
            const active = d.list.filter((c)=>c.status === 'ACTIVE');
            const withOcc = d.list.filter((c)=>c.hasOpenOccurrences).length;
            const withPend = d.list.filter((c)=>c.hasPendingMeasurements).length;
            const withDel = d.list.filter((c)=>c.hasDelayedProcesses).length;
            const score = Math.max(0, Math.min(100, 100 - withOcc * 15 - withPend * 5 - withDel * 10));
            const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 45 ? 'D' : 'F';
            return {
                contractorId: id,
                name: d.name,
                category: d.category,
                contractCount: d.list.length,
                activeContracts: active.length,
                openOccurrences: withOcc,
                pendingMeasurements: withPend,
                score,
                grade
            };
        }).sort((a, b)=>b.score - a.score);
    }, [
        contracts
    ]);
    const processQuestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(q)=>{
            if (!dash || !contracts.length) return 'Carregando dados...';
            const ql = q.toLowerCase();
            const now = new Date();
            if (ql.match(/quantos contratos|total de contratos/)) {
                return `${contracts.length} contratos cadastrados.\n${contracts.filter((c)=>c.status === 'ACTIVE').length} ativos, ${contracts.filter((c)=>c.status === 'CONCLUDED').length} encerrados.`;
            }
            if (ql.match(/venc|encerr|expir/)) {
                const e30 = contracts.filter((c)=>{
                    const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
                    return c.status === 'ACTIVE' && d >= 0 && d <= 30;
                });
                const e60 = contracts.filter((c)=>{
                    const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
                    return c.status === 'ACTIVE' && d > 30 && d <= 60;
                });
                return `${e30.length} contrato(s) vencem em 30 dias.\n${e60.length} em 60 dias.\nCríticos: ${e30.map((c)=>c.contractNumber).join(', ') || 'Nenhum'}.`;
            }
            if (ql.match(/fiscal|responsável|quem cuida/)) {
                const wl = dash?.fiscalWorkload ?? [];
                return `Fiscais com mais contratos:\n${wl.slice(0, 3).map((f, i)=>`${i + 1}. ${f.name} — ${f.contracts} contratos`).join('\n')}`;
            }
            if (ql.match(/medi[çc]|medir/)) {
                const pend = contracts.filter((c)=>c.hasPendingMeasurements);
                return `${pend.length} medição(ões) pendentes.\n${pend.slice(0, 3).map((c)=>c.contractNumber).join(', ')}${pend.length > 3 ? ` +${pend.length - 3}` : ''}.`;
            }
            if (ql.match(/ocorrência|ocorr|problema/)) {
                const occ = contracts.filter((c)=>c.hasOpenOccurrences);
                return `${occ.length} contrato(s) com ocorrências abertas.\n${occ.slice(0, 3).map((c)=>c.contractNumber).join(', ')}${occ.length > 3 ? ` +${occ.length - 3}` : ''}.`;
            }
            if (ql.match(/valor|financ|dinheiro|r\$/)) {
                const fin = dash?.financial;
                return `Carteira: R$ ${fin?.totalContracted?.toLocaleString('pt-BR') ?? '-'}\nExecutado: R$ ${fin?.totalExecuted?.toLocaleString('pt-BR') ?? '-'}\nExecução: ${fin?.executionPercent?.toFixed(1) ?? '-'}%`;
            }
            if (ql.match(/risco|crítico|alerta/)) {
                const rs = dash?.riskSummary;
                return `Mapa de Riscos:\nCrítico: ${rs?.critical ?? 0}\nAlto: ${rs?.high ?? 0}\nMédio: ${rs?.medium ?? 0}\nBaixo: ${rs?.low ?? 0}`;
            }
            if (ql.match(/saúde|pontuação|score/)) {
                const h = dash?.health;
                return `Saúde da Carteira: ${h?.score ?? '-'}/100 — ${h?.level ?? '-'}`;
            }
            if (ql.match(/fornecedor|contratad|empresa/)) {
                return `Melhores fornecedores:\n${suppliers.slice(0, 3).map((s, i)=>`${i + 1}. ${s.name} — ${s.score}/100 (${s.grade})`).join('\n')}`;
            }
            if (ql.match(/sem fiscal|sem designação/)) {
                const nf = contracts.filter((c)=>c.status === 'ACTIVE' && !c.fiscalAssignments?.length);
                return nf.length > 0 ? `${nf.length} contrato(s) sem fiscal:\n${nf.map((c)=>`• ${c.contractNumber}`).join('\n')}` : '✅ Todos os contratos ativos têm fiscal designado.';
            }
            if (ql.match(/maior valor|mais caro|maior contrato/)) {
                const active = contracts.filter((c)=>c.status === 'ACTIVE');
                if (!active.length) return 'Nenhum contrato ativo encontrado.';
                const top = active.sort((a, b)=>Number(b.currentValue) - Number(a.currentValue))[0];
                return `Contrato de maior valor:\n• ${top.contractNumber}\n• ${(top.objectDescription ?? '').substring(0, 60)}\n• R$ ${Number(top.currentValue).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                })}`;
            }
            if (ql.match(/ocorrência|ocorr|problema/)) {
                const occ = contracts.filter((c)=>c.hasOpenOccurrences);
                return `${occ.length} contrato(s) com ocorrências abertas:\n${occ.slice(0, 5).map((c)=>`• ${c.contractNumber}`).join('\n')}${occ.length > 5 ? `\n+${occ.length - 5} outros` : ''}`;
            }
            if (ql.match(/taxa.*execu|execu.*financ|percent.*execu/)) {
                const fin = dash?.financial;
                return `Taxa de Execução Financeira: ${fin?.executionPercent?.toFixed(1) ?? '-'}%\nContratado: R$ ${fin?.totalContracted?.toLocaleString('pt-BR') ?? '-'}\nExecutado: R$ ${fin?.totalExecuted?.toLocaleString('pt-BR') ?? '-'}\nSaldo: R$ ${fin?.balance?.toLocaleString('pt-BR') ?? '-'}`;
            }
            if (ql.match(/90 dias|noventa dias|trim/)) {
                const e90 = contracts.filter((c)=>{
                    const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
                    return c.status === 'ACTIVE' && d >= 0 && d <= 90;
                });
                return `${e90.length} contrato(s) vencem em até 90 dias:\n${e90.map((c)=>{
                    const d = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
                    return `• ${c.contractNumber} (${d}d)`;
                }).join('\n') || 'Nenhum'}`;
            }
            if (ql.match(/nota.*c|abaixo.*c|nota d|nota f|fornecedor.*ruim|pior fornecedor/)) {
                const bad = suppliers.filter((s)=>s.grade === 'C' || s.grade === 'D' || s.grade === 'F');
                return bad.length > 0 ? `${bad.length} fornecedor(es) com nota C ou abaixo:\n${bad.map((s)=>`• ${s.name} — Nota ${s.grade} (${s.score}/100)`).join('\n')}` : '✅ Todos os fornecedores têm nota B ou superior.';
            }
            if (ql.match(/menos dias|mais próximo.*venc|vence primeiro|primeiro.*venc/)) {
                const active = contracts.filter((c)=>c.status === 'ACTIVE' && c.endDate);
                if (!active.length) return 'Nenhum contrato ativo com data de vencimento.';
                const closest = active.sort((a, b)=>new Date(a.endDate).getTime() - new Date(b.endDate).getTime())[0];
                const d = Math.round((new Date(closest.endDate).getTime() - now.getTime()) / 86400000);
                return `Contrato que vence primeiro:\n• ${closest.contractNumber}\n• ${(closest.objectDescription ?? '').substring(0, 50)}\n• Vence em ${d} dia(s) — ${new Date(closest.endDate).toLocaleDateString('pt-BR')}`;
            }
            if (ql.match(/média.*valor|valor médio|ticket médio/)) {
                const active = contracts.filter((c)=>c.status === 'ACTIVE');
                if (!active.length) return 'Nenhum contrato ativo.';
                const avg = active.reduce((s, c)=>s + Number(c.currentValue), 0) / active.length;
                return `Valor médio dos contratos ativos: R$ ${avg.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                })}\nBaseado em ${active.length} contrato(s) ativo(s).`;
            }
            if (ql.match(/encerr|conclu|finaliz/)) {
                const concluded = contracts.filter((c)=>c.status === 'CONCLUDED' || c.status === 'RESCINDED' || c.status === 'EXPIRED');
                return `${concluded.length} contrato(s) encerrado(s):\n• Encerrados: ${contracts.filter((c)=>c.status === 'CONCLUDED').length}\n• Rescindidos: ${contracts.filter((c)=>c.status === 'RESCINDED').length}\n• Vencidos: ${contracts.filter((c)=>c.status === 'EXPIRED').length}`;
            }
            if (ql.match(/processo.*atras|atras.*processo|processo.*atraso/)) {
                const delayed = contracts.filter((c)=>c.hasDelayedProcesses);
                return delayed.length > 0 ? `${delayed.length} contrato(s) com processo atrasado:\n${delayed.slice(0, 5).map((c)=>`• ${c.contractNumber}`).join('\n')}${delayed.length > 5 ? `\n+${delayed.length - 5} outros` : ''}` : '✅ Nenhum processo com atraso identificado.';
            }
            if (ql.match(/saldo|a pagar|restante.*financ|financ.*restante/)) {
                const fin = dash?.financial;
                return `Saldo financeiro a pagar: R$ ${fin?.balance?.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                }) ?? '-'}\nCorresponde a ${fin?.executionPercent != null ? (100 - fin.executionPercent).toFixed(1) : '-'}% do valor total contratado.`;
            }
            return `Não encontrei uma resposta específica. Exemplos de perguntas:\n• "Qual contrato tem o maior valor?"\n• "Quantos contratos vencem em 90 dias?"\n• "Qual a taxa de execução financeira?"\n• "Quais fornecedores têm nota abaixo de C?"\n• "Qual contrato tem menos dias restantes?"\n• "Quais contratos foram encerrados?"\n• "Qual o saldo financeiro a pagar?"`;
        }, [
        dash,
        contracts,
        suppliers
    ]);
    const selectedContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>contracts.find((c)=>c.id === selectedContractId), [
        contracts,
        selectedContractId
    ]);
    const diagnosis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedContract) return null;
        const c = selectedContract;
        const now = new Date();
        const daysRemaining = Math.round((new Date(c.endDate).getTime() - now.getTime()) / 86400000);
        const issues = [];
        if (!c.fiscalAssignments?.length) issues.push('Sem fiscal designado');
        if (c.hasOpenOccurrences) issues.push('Ocorrência em aberto');
        if (c.hasPendingMeasurements) issues.push('Medição pendente de aprovação');
        if (c.hasDelayedProcesses) issues.push('Processo com fase atrasada');
        if (daysRemaining >= 0 && daysRemaining <= 30) issues.push(`Vence em ${daysRemaining} dias — URGENTE`);
        else if (daysRemaining >= 0 && daysRemaining <= 90) issues.push(`Vence em ${daysRemaining} dias`);
        return {
            contract: c,
            daysRemaining,
            issues,
            score: Math.max(0, 100 - issues.length * 18)
        };
    }, [
        selectedContract
    ]);
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-48 gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                className: "h-8 w-8 text-violet-400 animate-pulse"
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 889,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500",
                children: "Carregando inteligência contratual..."
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 890,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 888,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-base font-bold text-gray-900 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                                        className: "h-4 w-4 text-violet-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                        lineNumber: 899,
                                        columnNumber: 13
                                    }, this),
                                    " Inteligência Contratual"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 898,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-gray-500 mt-0.5",
                                children: "Análise preditiva, compliance e assistência baseada nos dados reais da carteira"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 901,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 897,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>refetch(),
                        className: "flex items-center gap-1.5 text-[10px] text-gray-500 hover:text-gray-700 border border-gray-300 bg-gray-100/40 px-3 py-1.5 rounded-lg transition-colors cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 904,
                                columnNumber: 11
                            }, this),
                            " Atualizar"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 903,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 896,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 flex-wrap bg-gray-100/30 p-1 rounded-xl border border-gray-200",
                children: SECTIONS.map((s)=>{
                    const Icon = s.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveSection(s.id),
                        className: `flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer flex-1 justify-center whitespace-nowrap ${activeSection === s.id ? 'bg-gray-100 text-white' : 'text-gray-500 hover:text-gray-700'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-3 w-3 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 914,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden lg:inline",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                                lineNumber: 915,
                                columnNumber: 15
                            }, this)
                        ]
                    }, s.id, true, {
                        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                        lineNumber: 912,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 908,
                columnNumber: 7
            }, this),
            activeSection === 'insights' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InsightsSection, {
                insights: autoInsights,
                onNavigate: onNavigate
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 921,
                columnNumber: 47
            }, this),
            activeSection === 'recommendations' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RecommendationsSection, {
                recommendations: recommendations,
                onNavigate: onNavigate
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 922,
                columnNumber: 47
            }, this),
            activeSection === 'predictive' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PredictiveSection, {
                predictions: predictions,
                monthlyData: dash?.charts?.monthlyEvolution ?? []
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 923,
                columnNumber: 47
            }, this),
            activeSection === 'compliance' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ComplianceSection, {
                compliance: compliance
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 924,
                columnNumber: 47
            }, this),
            activeSection === 'suppliers' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuppliersSection, {
                suppliers: suppliers
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 925,
                columnNumber: 47
            }, this),
            activeSection === 'assistant' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AssistantSection, {
                chatHistory: chatHistory,
                setChatHistory: setChatHistory,
                chatInput: chatInput,
                setChatInput: setChatInput,
                processQuestion: processQuestion
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 926,
                columnNumber: 47
            }, this),
            activeSection === 'diagnosis' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DiagnosisSection, {
                contracts: contracts,
                selectedContractId: selectedContractId,
                setSelectedContractId: setSelectedContractId,
                diagnosis: diagnosis,
                onNavigate: onNavigate
            }, void 0, false, {
                fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
                lineNumber: 927,
                columnNumber: 47
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIInsightsPanel.tsx",
        lineNumber: 895,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_components_ai_AIInsightsPanel_tsx_1fi9z_w._.js.map