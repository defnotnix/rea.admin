# FormShell Updates - Complete Button Integration

## Problem Solved

**Before**: You had to manually add Submit, Cancel, Next, and Back buttons to every form.

```tsx
// Old Way - Repetitive button code everywhere
<Modal>
  <FormHandler {...config}>
    <Stack gap="md">
      <TextInput name="title" />
      <Group justify="flex-end">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit</Button>  {/* Manual */}
      </Group>
    </Stack>
  </FormHandler>
</Modal>
```

**After**: Buttons are now built into `FormShell` - just use the component!

```tsx
// New Way - Cleaner, no manual buttons
<FormShell onCancel={onCancel}>
  <FormHandler {...config}>
    <Stack gap="md">
      <TextInput name="title" />
      {/* Submit button is automatic! */}
    </Stack>
  </FormHandler>
</FormShell>
```

## What's New

### 1. FormShellFooter Component
**Location**: `packages/admin/src/layouts/FormShell/components/Footer/`

Automatically renders:
- ✅ **Submit Button** - Submits the form
- ✅ **Cancel Button** - Optional, for navigation
- ✅ **Previous Step** - For multi-step forms (disabled on first step)
- ✅ **Next Step** - For multi-step forms (hidden on last step)

### 2. FormShell Now Includes Footer
**Location**: `packages/admin/src/layouts/FormShell/FormShell.tsx`

Updated to:
- Include `<FormShellFooter />` at the bottom
- Accept new props for button callbacks
- Handle stepper navigation automatically
- Support loading state for buttons

### 3. Updated Type Definitions
**Location**: `packages/admin/src/layouts/FormShell/FormShell.type.ts`

New props:
```tsx
type PropFormShell = {
  onCancel?: () => void;        // Cancel button callback
  onStepBack?: () => void;      // Previous step callback
  onStepNext?: () => void;      // Next step callback
  isLoading?: boolean;          // Loading state for buttons
  // ... existing props
}
```

## File Structure

```
packages/admin/src/layouts/FormShell/
├── FormShell.tsx                    (Updated - added footer)
├── FormShell.type.ts                (Updated - new props)
├── FormShell.context.tsx            (Unchanged)
├── FORMSHELL_USAGE.md               (New - documentation)
├── components/
│   ├── Header/
│   ├── Stepper/
│   └── Footer/                      (New)
│       ├── Footer.tsx               (New - button component)
│       └── index.ts                 (New - export)
```

## Usage Examples

### Simple Form
```tsx
<FormShell
  bread={breadcrumbs}
  moduleInfo={moduleInfo}
  title="Create Item"
  onCancel={() => router.back()}
>
  <FormHandler {...config}>
    <TextInput name="title" />
    {/* Submit and Cancel buttons automatic */}
  </FormHandler>
</FormShell>
```

### Multi-Step Form
```tsx
<FormShell
  bread={breadcrumbs}
  moduleInfo={moduleInfo}
  title="Create Item"
  steps={["Step 1", "Step 2", "Step 3"]}
  showStepper={true}
  isLoading={isLoading}
  onCancel={handleCancel}
>
  <FormHandler {...config}>
    {/* Form content renders based on current step */}
    {/* Previous, Next, Submit buttons automatic */}
  </FormHandler>
</FormShell>
```

## Button Behavior

| Scenario | Buttons Shown |
|----------|---------------|
| Simple form | Submit, Cancel |
| Multi-step (step 1) | Previous (disabled), Next, Cancel |
| Multi-step (middle) | Previous, Next, Cancel |
| Multi-step (last step) | Previous, Submit, Cancel |

## Button States

- **Disabled**: Previous button on step 0
- **Loading**: All buttons show loading state when `isLoading={true}`
- **Hidden**: Next button on last step (Submit shown instead)

## Migration Guide

To update existing forms:

### Before
```tsx
<Modal>
  <FormHandler {...config}>
    <Stack gap="md">
      <TextInput name="title" />
      <Group justify="flex-end">
        <Button variant="default" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </Group>
    </Stack>
  </FormHandler>
</Modal>
```

### After
```tsx
<FormShell
  bread={breadcrumbs}
  moduleInfo={moduleInfo}
  onCancel={onCancel}
>
  <FormHandler {...config}>
    <Stack gap="md">
      <TextInput name="title" />
      {/* No more manual buttons! */}
    </Stack>
  </FormHandler>
</FormShell>
```

## Benefits

✅ **Consistency**: All forms use the same button styling and behavior
✅ **DRY**: No more repeating button code
✅ **Maintainability**: Single source of truth for button logic
✅ **Accessibility**: Built-in button states and disabled states
✅ **Stepper Support**: Automatic Next/Previous handling
✅ **Loading States**: Easy loading state management

## For Agenda Detail Page

The components already use inline modals. Consider using FormShell in the future:

```tsx
// Current approach
<Modal>
  <FormHandler {...threadFormConfig} formType="new">
    <Stack>
      <TextInput name="title" />
      <Group justify="flex-end">
        <Button>Cancel</Button>
        <Button type="submit">Create</Button>
      </Group>
    </Stack>
  </FormHandler>
</Modal>

// Future approach
<FormShell onCancel={closeModal}>
  <FormHandler {...threadFormConfig} formType="new">
    <Stack>
      <TextInput name="title" />
      {/* Buttons automatic */}
    </Stack>
  </FormHandler>
</FormShell>
```

## Documentation

Full usage guide: `packages/admin/src/layouts/FormShell/FORMSHELL_USAGE.md`

Example: `apps/admin-test/modules/agenda/pages/detail/FormShellExample.tsx`
