export const enum FilterOperator {
    Eq    = 'eq',
    Neq   = 'neq',
    Lt    = 'lt',
    Leq   = 'leq',
    Gt    = 'gt',
    Geq   = 'geq',
    In    = 'in',
    Nin   = 'nin',
    Regexp   = 'regexp',
    Nregexp  = 'nregexp',
    Iregexp  = 'iregexp',
    Niregexp = 'niregexp'
}

const operatorDescription = {
    [FilterOperator.Eq]:      "Defines `target == param` SQL logical expression.",
    [FilterOperator.Neq]:     "Defines `target <> param` SQL logical expression.",
    [FilterOperator.Lt]:      "Defines `target < param` SQL logical expression.",
    [FilterOperator.Leq]:     "Defines `target <= param` SQL logical expression.",
    [FilterOperator.Gt]:      "Defines `target > param` SQL logical expression.",
    [FilterOperator.Geq]:     "Defines `target <= param` SQL logical expression.",
    [FilterOperator.In]:      "Defines `target IN param` SQL logical expression.",
    [FilterOperator.Nin]:     "Defines `target NOT IN param` SQL logical expression.",
    [FilterOperator.Regexp]:  "Applies `param` POSIX case-sensitive regular expression to `target`.",
    [FilterOperator.Iregexp]: "Applies `param` POSIX case-insensitive regular expression to `target`.",
    [FilterOperator.Nregexp]:  
    "Applies `param` POSIX case-sensitive regular expression to `target` and negates the result.",
    [FilterOperator.Niregexp]: 
    "Applies `param` POSIX case-insensitive regular expression to `target` and negates the result.",
};

export function getDescr(operator: FilterOperator) {
    return operatorDescription[operator];
}