import { PropTabsTab } from "@/src/components";

// ─────────────────────────────────────────────
// Shared bits
// ─────────────────────────────────────────────

export type PropDataTableBread = {
  label: string;
  link?: string;
};

type PropSustained = {
  sustained?: boolean;
};

type PropIdAccessor = {
  idAccessor?: string;
};

type PropRowStyle = {
  // row-styles
  enableRowStyle?: boolean;
  rowColor?: string;
  rowBackgroundColor?: string;
  rowStyle?: any;
};

type PropServerSearch = {
  hasServerSearch?: boolean;
};

// ─────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────

export type PropDataTableHeader = {
  bread: PropDataTableBread[];
  moduleInfo: any;
};

// ─────────────────────────────────────────────
// Toolbar
// ─────────────────────────────────────────────

export type PropDataTableToolbar = PropSustained & {
  customColumns: any[];
  hideFilters?: boolean;
  filterList: any[];
  setCustomColumns?: any;
  onToggleColumn?: any;
  onResetColumns?: any;
};

// ─────────────────────────────────────────────
// DataTable config
// ─────────────────────────────────────────────

export type PropDataTableShellDataTable = PropRowStyle &
  PropServerSearch & {
    customColumns?: any[];
    pageSizes?: number[];
    forceFilter?: (data: any) => any;
    disableActions?: boolean;
    columns: any[];
  } & PropIdAccessor;

// ─────────────────────────────────────────────
// Shell (full table wrapper)
// ─────────────────────────────────────────────

export type PropDataTableShell = PropSustained &
  PropDataTableHeader &
  PropDataTableShellDataTable & {
    tabs?: PropTabsTab[];
    hideFilters?: boolean;
    filterList: any[];
    tableActions?: any[];
    sortStatus?: any;
  };

export type PropDataTableShellActions = PropIdAccessor & PropSustained;
