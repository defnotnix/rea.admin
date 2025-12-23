# REA Admin - Quick Start Guide

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
```

### Environment Configuration

Add to `.env.local`:
```env
NEXT_PUBLIC_API_BASE=http://localhost:3001
```

### Start Development Server

```bash
# From rea-admin directory
pnpm dev

# Or from project root
pnpm -F rea-admin dev
```

Visit: http://localhost:3000

---

## 📋 Available Modules

### 1. Districts (📍)
- **Route**: `/admin/districts`
- **Type**: Sustained (View Only)
- **Features**: List districts, filter by status, view population metrics

### 2. Users (👥)
- **Route**: `/admin/users`
- **Type**: Full (CRUD)
- **Features**: Create/Edit users, assign roles, filter by verification/role status

### 3. Problems (🚨)
- **Route**: `/admin/problems`
- **Type**: Full (CRUD)
- **Features**: Create problems, moderate (approve/reject), track status
- **Sub-routes**:
  - `/admin/problems/new` - Create problem
  - `/admin/problems?status=pending` - Pending review
  - `/admin/problems?status=approved` - Approved

### 4. Chat (💬)
- **Route**: `/admin/chat`
- **Type**: Sustained (View Only)
- **Features**: View messages, filter by type, monitor discussions

### 5. Approved Solutions (✅)
- **Route**: `/admin/approved-solutions`
- **Type**: Sustained (View Only)
- **Features**: View solutions, filter by publication status

---

## 🔧 Basic Operations

### View a List

```typescript
import { _List as DistrictsList } from "@/modules/districts";

export default function Page() {
  return <DistrictsList />;
}
```

### Create a New Record

```typescript
import { _New as UserForm } from "@/modules/users";

export default function Page() {
  return <UserForm />;
}
```

### Call an API

```typescript
import { getDistricts, createUser } from "@/modules";

// Get all districts
const districts = await getDistricts();

// Create new user
const newUser = await createUser({
  full_name: "John Doe",
  email: "john@example.com",
  // ... other fields
});
```

### Use React Query

```typescript
import { useApiQuery } from "@/modules/api";

export function MyComponent() {
  const { data, isLoading, error } = useApiQuery(
    ["districts"],
    "/districts"
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.length} districts</div>;
}
```

---

## 🎨 UI Components Used

### From Mantine
- `TextInput`, `PasswordInput`, `Textarea` - Form inputs
- `Select` - Dropdown selection
- `Checkbox` - Boolean selection
- `Badge` - Status indicators
- `Group`, `Stack` - Layout
- `Table`, `Avatar` - Data display
- `Button`, `ActionIcon` - Actions

### From Settle Admin
- `DataTableShell` - Main table wrapper
- `AdminShell` - Admin layout

### From Settle Core
- `DataTableWrapper` - Query wrapper
- `FormHandler` - Form wrapper
- `ListHandler`, `FormHandler` - State handlers

### Icons
- `@phosphor-icons/react` - All icons

---

## 📝 Common Tasks

### Add a New Column to Table

Edit `pages/list/list.columns.tsx`:

```typescript
{
  accessor: "new_field",
  title: "New Column",
  width: 150,
  render: (record) => <Text>{record.new_field}</Text>,
  sortable: true,
}
```

### Add a Form Field

Edit `pages/new/index.tsx`:

```typescript
<TextInput
  label="Field Name"
  placeholder="Enter value"
  name="field_name"
  required
/>
```

### Add Form Validation

Edit `forms/main/form.config.ts`:

```typescript
validation: [
  {
    field: "new_field",
    message: "This field is required",
    type: "required",
  },
  {
    field: "email",
    message: "Valid email required",
    type: "email",
  },
  {
    field: "password",
    message: "Minimum 8 characters",
    type: "minLength",
    value: 8,
  },
]
```

### Add a New Filter

Edit `pages/list/index.tsx`:

```typescript
filterList={[
  {
    label: "New Filter",
    type: "select", // or "text" or "date"
    options: ["Option 1", "Option 2", "Option 3"],
  },
]}
```

### Call a Custom API Endpoint

In `module.api.ts`:

```typescript
export const customAction = async (id: string, data: any) => {
  const res = await apiClient.put(`/resource/${id}/custom`, data);
  return res.data;
};
```

---

## 🐛 Debugging

### Check API Calls
1. Open DevTools Network tab
2. Look for requests to `/api/*`
3. Check response status and body

### Check Form Validation
1. Look at console for validation errors
2. Check `form.config.ts` for rules
3. Verify field `name` attributes match config

### Check Module Exports
1. Verify `index.ts` exports exist
2. Check import paths are correct
3. Look for typos in import statements

### Enable Logging

Add to `apiClient.ts`:

```typescript
this.client.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  // ...
);
```

---

## 🔌 Connecting to Backend

### Update API Endpoints

Each module has a `module.api.ts` file. Update the endpoints:

```typescript
// Before
const res = await axios.get(`${API_BASE}/districts`);

// After (if needed)
const res = await axios.get(`${API_BASE}/api/v1/districts`);
```

### Test API Connection

```bash
# Check if backend is running
curl http://localhost:3001/districts

# Check status codes
curl -i http://localhost:3001/districts
```

### Handle API Errors

The API client automatically handles:
- ❌ 401 (Unauthorized) → Redirect to login
- ❌ 500 (Server Error) → Reject promise
- ✅ 200-299 → Return data

For custom handling:

```typescript
try {
  const result = await getDistricts();
  // Handle success
} catch (error) {
  console.error("Failed to fetch:", error);
  // Handle error
}
```

---

## 🧪 Testing

### Test Form Submission

1. Fill out form with valid data
2. Click submit
3. Check console for API call
4. Verify success message

### Test Data Table

1. Navigate to list view
2. Click column headers to sort
3. Use filters to narrow results
4. Check pagination works

### Test Status Workflows

**For Problems:**
1. Create problem (status = "pending")
2. Click approve → status = "approved"
3. Check if chat is created
4. View in problems list

---

## 📚 Documentation Files

- **[modules/README.md](./modules/README.md)** - Comprehensive guide
- **[MODULES_SUMMARY.md](./MODULES_SUMMARY.md)** - Module reference
- **[MODULES_STRUCTURE.md](./MODULES_STRUCTURE.md)** - Architecture & patterns

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page | Check browser console for errors |
| API 404 | Verify `NEXT_PUBLIC_API_BASE` env var |
| Form not submitting | Check form validation in console |
| Columns not showing | Verify `accessor` matches data field |
| Auth token not sent | Check localStorage has 'authToken' |
| Dropdown empty | Load options data dynamically |

---

## 📞 Getting Help

1. Check the documentation files above
2. Search through existing module implementations
3. Check browser console for error messages
4. Review API responses in Network tab
5. Check env variables are set correctly

---

## 🚀 Production Checklist

- [ ] Update API_BASE to production URL
- [ ] Test all workflows
- [ ] Implement proper error handling
- [ ] Add success/error notifications
- [ ] Set up monitoring/logging
- [ ] Enable CORS on backend
- [ ] Test authentication flow
- [ ] Verify role-based access works
- [ ] Check responsive design
- [ ] Load test with realistic data
- [ ] Set up backups
- [ ] Document deployment process

---

## 💡 Tips & Tricks

### Use snippets for faster development
Copy-paste module templates to quickly scaffold new features

### Leverage React Query cache
```typescript
queryClient.invalidateQueries(["districts"]);
```

### Type your API responses
```typescript
interface District {
  district_id: string;
  district_name: string;
  // ...
}

const { data } = useApiQuery<District[]>(["districts"], "/districts");
```

### Create custom hooks for complex logic
```typescript
export function useDistrictOperations() {
  return useMutation({
    mutationFn: (data) => createDistrict(data),
  });
}
```

---

Happy coding! 🎉
