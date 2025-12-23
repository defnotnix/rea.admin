# REA Admin Modules

This directory contains all the admin modules for the REA (Regional Equity Administration) platform. The modules are organized by functionality and follow a consistent structure based on the database schema.

## Module Structure

### **Sustained Modules** (List-only views)
These modules provide read-only views of data with filtering and sorting capabilities.

- **Districts** - View and manage all districts
- **Chat** - View all chat messages and discussions
- **Approved Solutions** - View published and draft solutions

### **Full Modules** (CRUD operations)
These modules provide complete Create, Read, Update, Delete operations.

- **Users** - Manage citizens and moderators with role assignment
- **Problems** - Manage reported issues with approval workflows

## Navigation Structure

The admin panel is organized into three main sections:

### 1. System Configuration
- **Districts** - Geographic area management
- **Users & Roles** - User and moderator management

### 2. Content Management
- **Problems** - Issue management and moderation
  - All Problems
  - Create Problem
  - Pending Review
  - Approved
- **Chat & Discussion** - View all chat threads
- **Approved Solutions** - Manage final solutions

### 3. Administration
- **Activity Logs** - Audit trail
- **System Settings** - Configuration
- **About** - System information

## Module Anatomy

Each module follows this standard structure:

```
module-name/
├── module.config.ts          # Module metadata and breadcrumbs
├── module.api.ts             # API integration functions
├── index.ts                  # Module exports
├── forms/                    # (Full modules only)
│   └── main/
│       ├── form.config.ts    # Form schema and validation
│       └── form.module.ts    # Form submission logic
└── pages/
    ├── list/
    │   ├── index.tsx         # List view component
    │   └── list.columns.tsx   # Table column definitions
    └── new/                  # (Full modules only)
        └── index.tsx         # Create/Edit form component
```

## API Integration

All modules use a centralized API client with interceptors for:
- Authentication token injection
- Error handling
- Response transformation

### Shared API Client

Located in `api/` directory:
- `api.config.ts` - Configuration and endpoints
- `apiClient.ts` - Axios client with interceptors
- `useApi.ts` - React Query hooks

### Usage Example

```typescript
import { apiClient } from "@/modules/api";

// Direct API calls
const data = await apiClient.get('/districts');

// Or with React Query hooks
import { useApiQuery } from "@/modules/api";

const { data, isLoading } = useApiQuery(
  ['districts'],
  '/districts'
);
```

## Module-Specific Features

### Districts Module
- **Type**: Sustained
- **Features**: List, filter by status, view population metrics
- **Key Fields**: Name, Code, Population, Status

### Users Module
- **Type**: Full
- **Features**: Create, list, filter by role/verification status
- **Key Fields**: Full Name, Email, Phone, Profession, Role (Citizen/Moderator)
- **Validation**: Email, phone number, required fields

### Problems Module
- **Type**: Full
- **Features**: Create, list, filter by status/district
- **Status Workflow**: Pending → Approved/Rejected → Solved
- **Key Fields**: Title, Description, District, Status, View Count

### Chat Module
- **Type**: Sustained
- **Features**: List all messages, filter by type/status
- **Message Types**: Regular comments, Solutions
- **Key Fields**: Author, Content, Vote Count, Status

### Approved Solutions Module
- **Type**: Sustained
- **Features**: View solutions, publish/unpublish, filter by status
- **Key Fields**: Problem Title, Solution Content, Author, Publication Status

## Form Validation

Forms use a configuration-based validation system:

```typescript
export const formConfig = {
  initial: {
    field_name: "",
    // ... other fields
  },
  validation: [
    {
      field: "field_name",
      message: "Error message",
      type: "required" | "email" | "minLength" | "maxLength" | "phoneNumber",
      value: 10, // For minLength/maxLength
    },
  ],
};
```

## Status Workflows

### Problem Status Lifecycle
1. **Pending** - Awaiting moderator review
2. **Approved** - Visible on public dashboard, chat created
3. **Rejected** - Rejected by moderator with reason
4. **Solved** - Solution approved and published

### Solution Publication
- Draft (unpublished) → Published (visible to public)
- AI-generated and moderator-approved before publication

## Data Table Features

All list views support:
- **Tabs** - Filter by status/category
- **Sorting** - Click column headers
- **Filters** - Multiple filter options
- **Pagination** - Configurable page size
- **Search** - Quick text search

## Adding a New Module

1. Create module directory: `modules/new-module/`
2. Create required files:
   - `module.config.ts` - Module metadata
   - `module.api.ts` - API functions
   - `pages/list/index.tsx` and `list.columns.tsx`
3. For full modules, add `forms/main/form.config.ts`
4. Export from `pages/list/index.tsx` in `index.ts`
5. Add to navigation in `config/nav/navs/sample.tsx`

## Authentication & Authorization

- All API calls include auth token from localStorage
- 401 responses trigger logout and redirect to login
- Role-based access control via `roles` field in nav config

## Environment Variables

```env
NEXT_PUBLIC_API_BASE=http://localhost:3001
```

## Dependencies

- **UI**: Mantine components
- **Data Fetching**: React Query + Axios
- **Forms**: React Hook Form
- **Icons**: Phosphor Icons
- **Layout**: Custom AdminShell component

## Best Practices

1. Always use the centralized API client
2. Keep form configs in separate files
3. Use table columns for consistent rendering
4. Add proper error handling in API calls
5. Use React Query for caching and state management
6. Follow the breadcrumb structure in module.config
7. Test filters and pagination before deployment

## Common Tasks

### Creating a new filter
In `pages/list/index.tsx`, add to `filterList`:
```typescript
{
  label: "Filter Name",
  type: "select" | "text" | "date",
  options: ["Option 1", "Option 2"],
}
```

### Adding a new column
In `pages/list/list.columns.tsx`:
```typescript
{
  accessor: "field_name",
  title: "Display Title",
  width: 200,
  render: (record) => <Text>{record.field_name}</Text>,
  sortable: true,
}
```

### Creating a new form field
In `pages/new/index.tsx`:
```typescript
<TextInput
  label="Field Label"
  placeholder="Enter value"
  name="field_name"
  required
/>
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API calls failing | Check NEXT_PUBLIC_API_BASE env var |
| Auth token not sent | Verify localStorage key is 'authToken' |
| Form not submitting | Check validation rules in form.config |
| Columns not rendering | Ensure column accessor matches data field |
