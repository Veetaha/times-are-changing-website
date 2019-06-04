export const enum FilterOperator {
    Eq     = 'eq',
    Neq    = 'neq',
    Lt     = 'lt',
    Leq    = 'leq',
    Gt     = 'gt',
    Geq    = 'geq',
    In     = 'in',
    Nin    = 'nin',
    Like   = 'like',
    Nlike  = 'nlike',
    Ilike  = 'ilike',
    Nilike = 'nilike'
}

const operatorDescription = {
    [FilterOperator.Eq]:   "Defines `target == param` logical expression.",
    [FilterOperator.Neq]:  "Defines `target != param` logical expression.",
    [FilterOperator.Lt]:   "Defines `target < param` logical expression.",
    [FilterOperator.Leq]:  "Defines `target <= param` logical expression.",
    [FilterOperator.Gt]:   "Defines `target > param` logical expression.",
    [FilterOperator.Geq]:  "Defines `target <= param` logical expression.",
    [FilterOperator.In]:   "Defines `target IN param` logical expression.",
    [FilterOperator.Nin]:  "Defines `target NOT IN param` logical expression.",
    [FilterOperator.Like]:   
    "Matches `target` that contains `param` substring in case-sensitive way.",
    [FilterOperator.Nlike]:  
    "Matches `target` that doesn't contain `param` substring in case-sensitive way.",
    [FilterOperator.Ilike]:  
    "Matches `target` that contains `param` substring in case-insensitive way.",
    [FilterOperator.Nilike]: 
    "Matches `target` that doesnt't contain `param` substring in case-insensitive way." 
};

export function getDescr(operator: FilterOperator) {
    return operatorDescription[operator];
}