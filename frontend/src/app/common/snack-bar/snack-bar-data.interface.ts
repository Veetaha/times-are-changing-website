export const enum SnackBarSeverity {
    Info    = 'info',    // this is used in scss styles
    Success = 'success', 
    Warning = 'warning', 
    Error   = 'error'
}

export interface SnackBarData {
    readonly severity: SnackBarSeverity;
    readonly title:    string;
    readonly body:     string;
}