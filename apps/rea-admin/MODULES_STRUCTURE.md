# REA Admin Modules - Complete Structure

## Module Breakdown

### 📊 Module Types & Characteristics

| Module | Type | CRUD | Forms | Purpose |
|--------|------|------|-------|---------|
| **Districts** | Sustained | List, View | ❌ | Geographic management |
| **Users** | Full | CRUD | ✅ | Citizen & moderator management |
| **Problems** | Full | CRUD | ✅ | Issue tracking & moderation |
| **Chat** | Sustained | List, View | ❌ | Discussion monitoring |
| **Approved Solutions** | Sustained | List, View | ❌ | Solution publishing |

---

## Directory Structure

```
apps/rea-admin/
├── app/
│   ├── (admin)/
│   │   └── layout.tsx              # Admin layout wrapper
│   ├── page.tsx                    # Main page
│   └── layout.tsx                  # App layout
├── config/
│   ├── nav/
│   │   ├── index.tsx               # Nav exports
│   │   └── navs/
│   │       ├── sample.tsx          # ✨ UPDATED: Main nav config
│   │       └── modules.tsx         # Module category nav
│   └── theme/
│       └── (theme configuration)
├── layouts/
│   ├── app/
│   │   └── index.tsx               # App layout
│   └── admin/
│       └── index.tsx               # Admin shell wrapper
├── modules/                         # 🎯 NEW: Main modules directory
│   ├── api/
│   │   ├── api.config.ts           # API configuration
│   │   ├── apiClient.ts            # Axios client with interceptors
│   │   ├── useApi.ts               # React Query hooks
│   │   └── index.ts                # Exports
│   ├── districts/
│   │   ├── module.config.ts        # Module metadata
│   │   ├── module.api.ts           # API functions
│   │   ├── pages/
│   │   │   └── list/
│   │   │       ├── index.tsx       # List component
│   │   │       └── list.columns.tsx # Table columns
│   │   └── index.ts                # Exports
│   ├── users/
│   │   ├── module.config.ts
│   │   ├── module.api.ts
│   │   ├── forms/
│   │   │   └── main/
│   │   │       ├── form.config.ts  # Form validation
│   │   │       └── form.module.ts  # Form logic
│   │   ├── pages/
│   │   │   ├── list/
│   │   │   │   ├── index.tsx
│   │   │   │   └── list.columns.tsx
│   │   │   └── new/
│   │   │       └── index.tsx       # Create/Edit form
│   │   └── index.ts
│   ├── problems/
│   │   ├── module.config.ts
│   │   ├── module.api.ts
│   │   ├── forms/
│   │   │   └── main/
│   │   │       ├── form.config.ts
│   │   │       └── form.module.ts
│   │   ├── pages/
│   │   │   ├── list/
│   │   │   │   ├── index.tsx
│   │   │   │   └── list.columns.tsx
│   │   │   └── new/
│   │   │       └── index.tsx
│   │   └── index.ts
│   ├── chat/
│   │   ├── module.config.ts
│   │   ├── module.api.ts
│   │   ├── pages/
│   │   │   └── list/
│   │   │       ├── index.tsx
│   │   │       └── list.columns.tsx
│   │   └── index.ts
│   ├── approved-solutions/
│   │   ├── module.config.ts
│   │   ├── module.api.ts
│   │   ├── pages/
│   │   │   └── list/
│   │   │       ├── index.tsx
│   │   │       └── list.columns.tsx
│   │   └── index.ts
│   ├── README.md                   # Comprehensive guide
│   └── (other files)
├── public/
├── MODULES_SUMMARY.md              # Quick reference
├── MODULES_STRUCTURE.md            # This file
├── package.json
├── tsconfig.json
└── (other config files)
```

---

## Navigation Hierarchy

```
🏠 Home Dashboard
│
├─ 📋 System Configuration (Group)
│  ├─ 📍 Districts (Sustained)
│  │  └─ View/Filter all districts
│  │
│  └─ 👥 Users & Roles (Full)
│     ├─ List users
│     ├─ Create new user
│     └─ Assign roles
│
├─ 📄 Content Management (Group)
│  ├─ 🚨 Problems (Full)
│  │  ├─ All Problems (Main)
│  │  ├─ Create Problem
│  │  ├─ Pending Review (Filter)
│  │  └─ Approved (Filter)
│  │
│  ├─ 💬 Chat & Discussion (Sustained)
│  │  └─ View all messages
│  │
│  └─ ✅ Approved Solutions (Sustained)
│     └─ View/Publish solutions
│
└─ ⚙️ Administration (Group)
   ├─ 📝 Activity Logs
   ├─ ⚙️ System Settings
   └─ ℹ️ About
```

---

## API Integration Pattern

### Centralized API Client

All modules connect through a shared API layer:

```
┌─────────────────────────────────────────────────┐
│         React Component (Module Page)           │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│      React Query Hooks / Direct Calls           │
│  (useApiQuery, useApiCreate, etc.)              │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│    modules/api/apiClient.ts                     │
│  ├─ Request Interceptors                       │
│  │  └─ Add auth token                          │
│  ├─ Response Interceptors                      │
│  │  └─ Handle errors, 401 redirects            │
│  └─ Generic CRUD methods                       │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│         Axios Instance                          │
│  baseURL: process.env.NEXT_PUBLIC_API_BASE      │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│       Backend API Server                        │
│  (http://localhost:3001 or production)          │
└─────────────────────────────────────────────────┘
```

---

## Form Architecture

### Form Config Pattern

Each full module has a standardized form structure:

```typescript
// form.config.ts
export const formConfig = {
  initial: {
    field1: "",
    field2: false,
    // ...
  },
  validation: [
    {
      field: "field1",
      message: "Error message",
      type: "required|email|minLength|phoneNumber",
      value: 10, // For length validation
    },
    // ...
  ],
};

// form.module.ts
export const formModule = {
  onSubmit: async (data, formType, id) => {
    if (formType === "create") {
      return await createResource(data);
    } else if (formType === "update") {
      return await updateResource(id, data);
    }
  },
};
```

### Form Submission Flow

```
User Input
    ↓
Form Validation (form.config.ts)
    ├─ ✓ Valid
    │   ↓
    │ Form Submission (form.module.ts)
    │   ↓
    │ API Call (module.api.ts)
    │   ↓
    │ Backend Processing
    │   ↓
    │ ✓ Success → Redirect/Refresh
    │
    └─ ✗ Invalid
        ↓
        Display Error Messages
```

---

## Data Flow in List Views

```
┌──────────────────────────────────┐
│   Component Mount (_List)        │
└──────────────────┬───────────────┘
                   │
┌──────────────────▼───────────────┐
│   DataTableWrapper               │
│  (React Query wrapper)           │
└──────────────────┬───────────────┘
                   │
┌──────────────────▼───────────────┐
│   queryGetFn: getRecords()       │
│   (from module.api.ts)           │
└──────────────────┬───────────────┘
                   │
┌──────────────────▼───────────────┐
│   apiClient.get(endpoint)        │
│   (with auth token)              │
└──────────────────┬───────────────┘
                   │
┌──────────────────▼───────────────┐
│   Backend API Response           │
└──────────────────┬───────────────┘
                   │
┌──────────────────▼───────────────┐
│   DataTableShell Component       │
│  ├─ Render columns               │
│  ├─ Apply filters               │
│  ├─ Handle sorting              │
│  └─ Paginate results            │
└──────────────────┬───────────────┘
                   │
┌──────────────────▼───────────────┐
│   User sees Data Table           │
└──────────────────────────────────┘
```

---

## Column Definition Pattern

Each list view uses a consistent column structure:

```typescript
export const columns = [
  {
    accessor: "field_name",              // Data field to display
    title: "Display Title",              // Column header
    width: 200,                          // Optional width
    render: (record) => (                // Custom rendering
      <Component>{record.field_name}</Component>
    ),
    sortable: true,                      // Enable sorting
  },
  // ...
];
```

---

## Module Instantiation Checklist

When creating a new module, follow this order:

- [ ] Create directory structure
- [ ] Create `module.config.ts` with metadata
- [ ] Create `module.api.ts` with API functions
- [ ] Create `pages/list/list.columns.tsx` with column definitions
- [ ] Create `pages/list/index.tsx` with DataTableShell
- [ ] (Full modules) Create `forms/main/form.config.ts`
- [ ] (Full modules) Create `forms/main/form.module.ts`
- [ ] (Full modules) Create `pages/new/index.tsx` with form
- [ ] Create `index.ts` with exports
- [ ] Add to navigation in `config/nav/navs/sample.tsx`
- [ ] Update documentation

---

## Key Technologies & Libraries

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI** | Mantine | Component library |
| **Form** | React Hook Form | Form state management |
| **Data Fetch** | React Query + Axios | Server state management |
| **Icons** | Phosphor Icons | Icon library |
| **Styling** | Tailwind/Mantine CSS | Styling |
| **Layout** | AdminShell (custom) | Admin layout |
| **HTTP** | Axios | HTTP client |

---

## File Statistics

```
Total Files Created: 37
├── Module Files: 30
│   ├── Config Files: 5
│   ├── API Files: 5
│   ├── Pages: 10
│   ├── Forms: 4
│   └── Index Files: 5
├── API Infrastructure: 4
├── Documentation: 2
└── Updated Files: 1
    └── config/nav/navs/sample.tsx
```

---

## Next Steps for Implementation

1. **🔌 API Integration**
   - Replace API endpoints with actual backend URLs
   - Test all CRUD operations
   - Handle error responses

2. **📊 Data Population**
   - Load district options in dropdowns
   - Populate status selections
   - Configure pagination defaults

3. **🛡️ Authentication**
   - Implement login flow
   - Store auth token in localStorage
   - Test 401 redirect flow

4. **🎨 UI/UX Polish**
   - Add success/error notifications
   - Implement loading states
   - Add confirmation dialogs for destructive actions

5. **✅ Testing**
   - Unit test form validation
   - Integration test API calls
   - E2E test workflows

6. **📈 Monitoring**
   - Add analytics tracking
   - Implement error logging
   - Set up performance monitoring

---

## Common Import Paths

```typescript
// API calls
import { getDistricts, createProblem } from "@/modules/districts/module.api";
import { getUsers, updateUser } from "@/modules/users/module.api";

// API infrastructure
import { apiClient } from "@/modules/api";
import { useApiQuery } from "@/modules/api";

// Module components
import { _List as DistrictsList } from "@/modules/districts";
import { _List as UsersList, _New as UsersNew } from "@/modules/users";

// Configurations
import { moduleInfo as districtInfo } from "@/modules/districts/module.config";
import { formConfig as userFormConfig } from "@/modules/users/forms/main/form.config";
```

---

## Important Notes

⚠️ **Before Going Live:**
1. Update all API endpoints to production URLs
2. Configure authentication properly
3. Add input sanitization for security
4. Implement role-based access control
5. Add comprehensive error handling
6. Test all workflows thoroughly
7. Set up proper logging and monitoring

✅ **Ready for Development:**
- All module scaffolding is complete
- Navigation structure is in place
- API layer is configured
- Form validation is set up
- Table columns are defined
- Documentation is comprehensive
