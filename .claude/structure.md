# Settle Project Structure Reference

## Project Overview

A monorepo using pnpm with multiple apps and shared packages. The project has two main admin applications (settle-admin, vapp) and shared component libraries.

**Technology Stack:**
- Framework: Next.js 16.1.0 (Turbopack for settle-admin, webpack for vapp)
- UI Library: Mantine (components, hooks, notifications)
- State Management: Zustand
- Forms & Validation: Zod
- Table: Mantine DataTable
- Icons: Phosphor Icons
- Package Manager: pnpm

---

## Directory Structure

```
settle/
├── apps/
│   ├── settle-admin/          # Admin portal (main focus)
│   │   ├── app/               # Next.js app directory
│   │   │   └── (admin)/       # Admin route group
│   │   │       └── [module]/  # Dynamic module pages
│   │   └── modules/           # Feature modules
│   │       └── applicant-config/
│   │           ├── module.api.ts
│   │           ├── module.config.ts
│   │           └── pages/list/index.tsx
│   └── vapp/                  # Application portal
├── packages/
│   ├── admin/                 # Shared admin UI components & layouts
│   │   ├── src/
│   │   │   ├── layouts/       # Layout components
│   │   │   │   ├── AdminShell/
│   │   │   │   ├── DataTableShell/
│   │   │   │   └── ConfigShell/
│   │   │   └── components/
│   ├── core/                  # Core utilities & helpers
│   │   ├── src/
│   │   │   ├── helpers/
│   │   │   │   ├── apiDispatch/    # HTTP client
│   │   │   │   └── moduleApiCall/  # Module API wrapper
│   │   │   ├── handlers/
│   │   │   ├── wrappers/
│   │   │   └── stores/
│   ├── eslint-config/
│   └── ui/
└── .claude/
    └── settings.local.json
```

---

## Key Layouts & Components

### 1. AdminShell (`packages/admin/src/layouts/AdminShell/AdminShell.tsx`)

**Purpose:** Main layout wrapper for all admin pages

**Key Features:**
- AppShell with fixed sidebar navbar (width: 300px)
- Paper container with `overflow: hidden` (critical constraint)
- Height: `calc(100vh - 24px)` on lg breakpoint
- Contains children with overflow management

**Usage:**
```tsx
<AdminShell navItems={...} navModules={...}>
  {children}
</AdminShell>
```

**Note:** The `overflow: hidden` on Paper constrains child components. ConfigShell handles this with internal scroll containers.

---

### 2. ConfigShell (`packages/admin/src/layouts/ConfigShell/ConfigShell.tsx`)

**Purpose:** Lightweight config page framework for 1-3 field items (replaces DataTableShell for simple cases)

**Architecture:**
- Flexbox layout with sticky header
- Header (flex-shrink: 0, position: sticky, top: 0)
- Content area (flex: 1, overflow: auto, overflowX: auto)
- Integrates with DataTableWrapper for data management

**Key Components:**
- `ConfigShellHeader`: Displays module title, description, breadcrumbs
- `ConfigShellCard`: Single-row item display with dropdown menu (default)
- `ConfigShellCardNew`: Dashed card form for creating new items
- Search bar with live filtering using autoSearch helper

**API Pattern:**
ConfigShell accepts API functions directly (modern approach):
```tsx
<ConfigShell
  moduleInfo={moduleInfo}
  fields={configFields}
  idAccessor="id"
  onCreateApi={createApplicantConfig}
  onEditApi={updateApplicantConfig}
  onDeleteApi={deleteApplicantConfig}
  validator={applicantConfigSchema}
/>
```

**CRUD Handling:** All handled internally by ConfigShell:
- Validation using Zod schemas
- Notifications for success/error
- Loading states
- Auto-refetch on mutation

**Optional Features:**
- `transformOnCreate/Edit/Delete`: Data transformation before API call
- `renderCard`: Custom card component (inherits all handlers)
- `renderNewCard`: Custom creation form

**Type Definitions:** `ConfigShell.type.ts`

---

### 3. DataTableWrapper (`packages/core/src/wrappers/DataTableWrapper/`)

**Purpose:** Context-based data fetching and state management for tables

**Features:**
- React Query integration for data fetching
- Zustand store for UI state (search, pagination, sorting)
- Proper selector pattern to avoid infinite renders

**Context Usage:**
```tsx
const { data, refetch } = DataTableWrapper.useDataTableContext();
const search = DataTableWrapper.useDataTableWrapperStore((state) => state.search);
const setSearch = DataTableWrapper.useDataTableWrapperStore((state) => state.setSearch);
```

**Critical Pattern:**
Always use separate selector calls for each piece of state:
```tsx
// CORRECT - splits selectors
const search = store((state) => state.search);
const setSearch = store((state) => state.setSearch);

// WRONG - creates new object every render
const { search, setSearch } = store((state) => ({ search: state.search, setSearch: state.setSearch }));
```

---

## Module Implementation Pattern

### File Structure
```
apps/settle-admin/modules/applicant-config/
├── module.api.ts       # API functions
├── module.config.ts    # Configuration & validation schemas
├── module.type.ts      # (optional) Type definitions
└── pages/
    └── list/
        └── index.tsx   # Minimal list page (48 lines)
```

### module.config.ts Example
```typescript
import { PropConfigField } from "@settle/admin";
import { z } from "zod";

export const moduleInfo = {
  label: "Applicant Configuration",
  description: "Manage applicant config settings",
  bread: [
    { label: "Admin Portal" },
    { label: "Applicant Config" },
  ],
};

export const configFields: PropConfigField[] = [
  {
    name: "name",
    label: "Category Name",
    placeholder: "e.g., Accommodation / Hospitality",
    type: "text",
    required: true,
  },
];

export const applicantConfigSchema = z.object({
  name: z.string().min(1, "Required").min(3, "At least 3 chars"),
});
```

### module.api.ts Example
```typescript
import { moduleApiCall } from "@settle/core";

const API_ENDPOINT = "/api/categories/";

export const getApplicantConfigs = (paginationProps?: any) =>
  moduleApiCall.getRecords(API_ENDPOINT, paginationProps);

export const createApplicantConfig = (data: any) =>
  moduleApiCall.createRecord(API_ENDPOINT, data);

export const updateApplicantConfig = (id: string | number, data: any) =>
  moduleApiCall.editRecord(API_ENDPOINT, id, data);

export const deleteApplicantConfig = (id: string | number) =>
  moduleApiCall.deleteRecord(API_ENDPOINT, id);
```

### pages/list/index.tsx Example
```typescript
"use client";

import { DataTableWrapper } from "@settle/core";
import { ConfigShell } from "@settle/admin";
import { getApplicantConfigs, createApplicantConfig, updateApplicantConfig, deleteApplicantConfig } from "../../module.api";
import { moduleInfo, configFields, applicantConfigSchema } from "../../module.config";

export function _List() {
  return (
    <DataTableWrapper
      queryKey="applicant-config.list"
      queryGetFn={getApplicantConfigs}
      dataKey="results"
    >
      <ConfigShell
        moduleInfo={moduleInfo}
        bread={moduleInfo.bread}
        fields={configFields}
        idAccessor="id"
        onCreateApi={createApplicantConfig}
        onEditApi={updateApplicantConfig}
        onDeleteApi={deleteApplicantConfig}
        validator={applicantConfigSchema}
      />
    </DataTableWrapper>
  );
}
```

---

## Important Patterns & Rules

### 1. "use client" Directive
- ALL pages and components using interactive features MUST have `"use client"` at top
- Mantine uses random IDs that differ between server/client without this
- Failure = hydration mismatch errors

### 2. API Response Structure
- Standard response: `{ results: [], total: number }`
- `dataKey` prop in DataTableWrapper specifies where array is: `dataKey="results"`
- moduleApiCall helpers handle extraction automatically

### 3. Zustand Store Pattern
- ALWAYS use separate selector calls for each state value
- Each call is memoized independently
- Destructuring creates new object = infinite loop

### 4. Mantine Container
- `size="sm"` = max-width 576px (standard for layouts)
- Provides left/right padding automatically
- Recommended for ConfigShell/DataTableShell

### 5. Field Types
Supported field types in PropConfigField:
- `"text"` (default TextInput)
- `"email"` (email TextInput)
- `"number"` (number TextInput)
- `"textarea"` (Textarea component)

### 6. Validation
- Zod schemas defined in module.config.ts
- Passed to ConfigShell via `validator` prop
- ConfigShell handles ZodError parsing and field-level error display
- Errors show in notifications with field path and message

---

## AdminShell Overflow Constraint

**Problem:** AdminShell sets `overflow: hidden` on Paper container, clipping content

**Solution in ConfigShell:**
```tsx
// Root: flex layout with height
<div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

  {/* Header: sticky, doesn't shrink */}
  <div style={{ flexShrink: 0, position: "sticky", top: 0, zIndex: 10, backgroundColor: "white" }}>

  {/* Content: scrollable with horizontal scroll */}
  <div style={{ flex: 1, overflow: "auto", overflowX: "auto" }}>
```

---

## CRUD Flow in ConfigShell

### Create
1. User clicks "Create New" button
2. ConfigShellCardNew form renders (dashed border card)
3. User fills fields and clicks Create
4. `handleCreate` validates using Zod schema
5. Data transformed via `transformOnCreate` if provided
6. API called via `onCreateApi`
7. Success notification shown
8. Form cleared and hidden
9. Data refetched after 300ms delay

### Edit
1. User clicks three-dot menu → Edit
2. Card switches to edit mode
3. Fields display with input controls (TextInput/Textarea)
4. User modifies and clicks Save
5. `handleEdit` validates using Zod schema
6. Data transformed via `transformOnEdit` if provided
7. API called via `onEditApi(id, data)`
8. Success notification shown
9. Card reverts to view mode
10. Data refetched after 300ms delay

### Delete
1. User clicks three-dot menu → Delete
2. Browser confirmation dialog appears
3. User confirms deletion
4. `handleDelete` calls `onDeleteApi(id)`
5. Success notification shown
6. Data refetched after 300ms delay

---

## Type Definitions

### PropConfigShell
```typescript
type PropConfigShell = {
  // Display info
  moduleInfo: { label: string; description?: string };
  bread?: PropConfigBread[];

  // Data & fields
  fields: PropConfigField[];
  idAccessor?: string; // default: "id"

  // API functions (modern approach)
  onCreateApi?: (data: any) => Promise<any>;
  onEditApi?: (id: string | number, data: any) => Promise<any>;
  onDeleteApi?: (id: string | number) => Promise<any>;

  // Legacy callbacks (backwards compatible)
  onEdit?: (item: any) => void;
  onDelete?: (id: string | number) => void;
  onCreate?: (data: any) => void;

  // Data transformation (optional)
  transformOnCreate?: (data: any) => any;
  transformOnEdit?: (data: any) => any;
  transformOnDelete?: (id: string | number) => string | number;

  // Custom rendering (optional)
  renderCard?: React.ComponentType<CardProps>;
  renderNewCard?: React.ComponentType<NewCardProps>;

  // UI customization
  searchPlaceholder?: string; // default: "Search..."
  createButtonLabel?: string; // default: "Create New"
  emptyStateMessage?: string; // default: "No items found"

  // Validation
  validator?: ZodSchema;
};
```

### PropConfigField
```typescript
type PropConfigField = {
  name: string;              // Data key
  label: string;             // Field label
  placeholder?: string;
  type?: "text" | "email" | "number" | "textarea";
  required?: boolean;
};
```

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Hydration mismatch | Missing `"use client"` | Add at top of page |
| Infinite Zustand loop | Destructured selector | Split into separate calls |
| Content hidden by overflow | AdminShell constraint | ConfigShell handles internally |
| Sticky header doesn't stick | position: relative parent | Use position: sticky with absolute positioning |
| Type mismatch on renderCard | Union type incompatibility | Make props optional or use `as any` |
| Zod validation not working | Schema not passed | Ensure `validator` prop is set |
| Data not refetching | Missing timeout | Default 300ms delay in handlers |

---

## Git & Build

**Current Branch:** master

**Build Command:** `npm run build`

**Key Build Scripts:**
- settle-admin: Next.js Turbopack
- vapp: Next.js webpack
- Both use TypeScript compilation

**Modified Files (typically):**
- .claude/settings.local.json (user settings)
- packages/admin/src/layouts/**
- packages/core/src/**
- apps/settle-admin/modules/**

---

## Future Enhancement Ideas

1. **ConfigShell Improvements:**
   - Batch operations (select multiple, bulk delete)
   - Column sorting/filtering
   - Export functionality
   - Customizable item height

2. **Module Pattern:**
   - Auto-generate module files from CLI
   - Shared module templates
   - Module composition

3. **Admin Features:**
   - User role-based access control
   - Audit logging for CRUD operations
   - Search across all fields

---

## Notes for Next Session

- ConfigShell is production-ready for simple config pages
- Module pattern is minimal (48 lines for list page) and scalable
- All CRUD logic centralized in ConfigShell reduces boilerplate
- Sticky header + overflow handling work around AdminShell constraints
- Zustand selector pattern is critical for performance
- Always validate with Zod schemas provided in module.config.ts