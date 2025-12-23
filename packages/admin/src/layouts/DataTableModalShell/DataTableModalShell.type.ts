import { PropDataTableShell } from "../DataTableShell/DataTableShell.type";

// ─────────────────────────────────────────────
// Shared Modal Types
// ─────────────────────────────────────────────

export type PropDataTableModalFormConfig = {
  initial?: Record<string, any>;
  steps?: string[];
  validation?: any[];
};

export type PropDataTableModalAction = {
  onCreateApi?: (data: any) => Promise<any>;
  onEditApi?: (id: string | number, data: any) => Promise<any>;
  onDeleteApi?: (id: string | number) => Promise<any>;
};

export type PropDataTableModalCallbacks = {
  onCreateSuccess?: (res: any) => void;
  onEditSuccess?: (res: any) => void;
  onDeleteSuccess?: (id: string | number) => void;
  onEditTrigger?: (row: any) => Promise<any>;
};

export type PropDataTableModalTransform = {
  transformOnCreate?: (data: any) => any;
  transformOnEdit?: (data: any) => any;
  transformOnDelete?: (id: any) => any;
};

// ─────────────────────────────────────────────
// Modal Shell Props
// ─────────────────────────────────────────────

export type PropDataTableModalShell = PropDataTableShell &
  PropDataTableModalAction &
  PropDataTableModalCallbacks &
  PropDataTableModalTransform & {
    // Modal-specific props
    modalWidth?: string | number;
    modalFormConfig?: PropDataTableModalFormConfig;
    showCreateButton?: boolean;
    createButtonLabel?: string;
    editFormComponent?: React.ReactNode;
    createFormComponent?: React.ReactNode;
    // Validator
    validator?: any;
  };
