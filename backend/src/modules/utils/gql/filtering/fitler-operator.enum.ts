export const enum FilterOperator {
    Eq    = 'eq',
    Neq   = 'neq',
    Lt    = 'lt',
    Leq   = 'leq',
    Gt    = 'gt',
    Geq   = 'geq',
    In    = 'in',
    Nin   = 'nin',
    Like  = 'like',
    Nlike = 'nlike',
    Ilike  = 'ilike',
    Nilike = 'nilike'
}

const operatorDescription = {
    [FilterOperator.Eq]:     "Defines `target == param` SQL logical expression.",
    [FilterOperator.Neq]:    "Defines `target <> param` SQL logical expression.",
    [FilterOperator.Lt]:     "Defines `target < param` SQL logical expression",
    [FilterOperator.Leq]:    "Defines `target <= param` SQL logical expression",
    [FilterOperator.Gt]:     "Defines `target > param` SQL logical expression",
    [FilterOperator.Geq]:    "Defines `target <= param` SQL logical expression",
    [FilterOperator.In]:     "Defines `target IN param` SQL logical expression",
    [FilterOperator.Nin]:    "Defines `target NOT IN param` SQL logical expression",
    [FilterOperator.Like]:   "Defines `target LIKE param` SQL logical expression",
    [FilterOperator.Nlike]:  "Defines `target NOT LIKE param` SQL logical expression",
    [FilterOperator.Ilike]:  "Defines `target ILIKE param` SQL logical expression",
    [FilterOperator.Nilike]: "Defines `target NOT ILIKE param` SQL logical expression"
};

export function getDescr(operator: FilterOperator) {
    return operatorDescription[operator];
}