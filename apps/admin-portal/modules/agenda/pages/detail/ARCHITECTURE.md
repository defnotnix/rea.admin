# Agenda Detail Architecture

## Component Hierarchy

```
AgendaDetail (index-refactored.tsx)
│
├─ Header Section
│  ├─ Back Button
│  ├─ Agenda Status Badge
│  └─ Delete Agenda Button
│
├─ Main Content Grid
│  │
│  ├─ Left Column (4/12)
│  │  └─ AgendaOverviewCard
│  │     ├─ Title
│  │     ├─ Description
│  │     ├─ Created By
│  │     └─ Created Date
│  │
│  └─ Right Column (8/12)
│     └─ Tabs Container
│        ├─ Tabs.List
│        │  ├─ Threads Tab
│        │  ├─ Solutions Tab
│        │  └─ Voting History Tab
│        │
│        └─ Tabs.Panel Container
│           ├─ ThreadsTab Panel
│           │  ├─ useThreadManagement hook
│           │  ├─ Thread Dropdown Menu
│           │  │  └─ Menu Items (each thread)
│           │  ├─ Recent Threads List
│           │  └─ Modals
│           │     ├─ ThreadFormModal
│           │     └─ DeleteThreadModal
│           │
│           ├─ SolutionsTab Panel
│           │  ├─ useSolutionManagement hook
│           │  ├─ Pinned Header
│           │  ├─ Solutions Grid (3 columns)
│           │  │  └─ SolutionCard (repeating)
│           │  │     ├─ Title
│           │  │     ├─ Status Badges
│           │  │     ├─ Feasibility Progress
│           │  │     ├─ Budget & Support
│           │  │     └─ Creator & Date
│           │  └─ Modals
│           │     ├─ SolutionFormModal
│           │     └─ DeleteSolutionModal
│           │
│           └─ VotingTab Panel
│              ├─ useVotingData hook
│              └─ Voting History Placeholder
│
└─ Delete Agenda Modal
   ├─ Confirmation Text
   └─ Cancel/Delete Buttons
```

## Data Flow

### Thread Data Flow
```
ThreadsTab Component
    ↓
useThreadManagement(agendaId)
    ↓
    ├─ getThreadsByAgenda(agendaId)
    │  └─ Returns: { results: Thread[] }
    │
    ├─ createThread({ title, agenda_id })
    │
    ├─ updateThread(id, { title })
    │
    └─ deleteThread(id)

↓ (all functions trigger)

loadThreads() → refreshes ThreadsTab UI
```

### Solution Data Flow
```
SolutionsTab Component
    ↓
useSolutionManagement(agendaId)
    ↓
    ├─ getSolutionsByAgenda(agendaId)
    │  └─ Returns: { results: Solution[] }
    │
    ├─ createSolution({ title, description, agenda_id })
    │
    ├─ updateSolution(id, { title, description })
    │
    └─ (deleteSolution not yet implemented)

↓ (all functions trigger)

loadSolutions() → refreshes SolutionsTab UI
```

### Voting Data Flow
```
VotingTab Component
    ↓
useVotingData(agendaId)
    ↓
    └─ (TODO: implement when backend ready)

Placeholder content displays until API integration
```

## State Management

### Thread Management State
```typescript
// Data State
threads: Thread[]
loading: boolean
error: string | null

// Create/Edit Modal State
modalOpened: boolean
editingId: string | null
editingTitle: string
isSubmitting: boolean

// Delete Modal State
deleteModalOpened: boolean
threadToDelete: string | null
isDeletingThread: boolean
```

### Solution Management State
```typescript
// Data State
solutions: Solution[]
loading: boolean
error: string | null

// Create/Edit Modal State
modalOpened: boolean
editingId: string | null
editingTitle: string
editingDescription: string
isSubmitting: boolean

// Delete Modal State
deleteModalOpened: boolean
solutionToDelete: string | null
isDeletingSolution: boolean
```

### Voting Data State
```typescript
// Data State
votingHistory: VotingHistoryEntry[]
loading: boolean
error: string | null
```

### Parent Component State
```typescript
// Agenda Data
agenda: Agenda | null
loading: boolean
error: string | null

// Delete Modal
deleteModalOpened: boolean
deleting: boolean

// Tab Selection
activeTab: string | null // "threads" | "solutions" | "voting"
```

## API Integration Points

### Module API Calls
```
module.api.ts
├─ Thread Operations
│  ├─ getThreadsByAgenda(agendaId) → GET /api/threads/by_agenda/
│  ├─ createThread(data) → POST /api/threads/
│  ├─ updateThread(id, data) → PATCH /api/threads/{id}/
│  └─ deleteThread(id) → DELETE /api/threads/{id}/
│
├─ Solution Operations
│  ├─ getSolutionsByAgenda(agendaId) → GET /api/solutions/
│  ├─ createSolution(data) → POST /api/solutions/
│  ├─ updateSolution(id, data) → PATCH /api/solutions/{id}/
│  └─ deleteSolution(id) → DELETE /api/solutions/{id}/ (TODO)
│
└─ Voting Operations
   └─ (TODO: implement voting endpoints)
```

## Type Flow

```
types.ts
├─ Agenda
│  ├─ id: string
│  ├─ title: string
│  ├─ description?: string
│  ├─ status?: string
│  ├─ created_at?: string
│  ├─ created_by?: { id, name }
│  └─ [key: string]: any
│
├─ Thread
│  ├─ id: string
│  ├─ title: string
│  ├─ message_count?: number
│  └─ created_by?: { id, name }
│
├─ Solution
│  ├─ id: string
│  ├─ title: string
│  ├─ summary?: string
│  ├─ description?: string
│  ├─ status?: string
│  ├─ priority?: string
│  ├─ estimated_budget?: string | number
│  ├─ feasibility_score?: number
│  ├─ support_count?: number
│  ├─ is_featured?: boolean
│  ├─ proposed_by_name?: string
│  ├─ created_at?: string
│  └─ [key: string]: any
│
└─ VotingHistoryEntry
   ├─ id: string
   ├─ solution_id: string
   ├─ user_id: string
   ├─ vote_type: "support" | "oppose"
   ├─ created_at: string
   └─ [key: string]: any
```

## Component Communication

### Parent to Tab Components
```
AgendaDetail
    ↓
<ThreadsTab agendaId={id} />
<SolutionsTab agendaId={id} />
<VotingTab agendaId={id} />
    ↓
Each tab receives agendaId and is self-contained
(no other props passed)
```

### Tab Components to Modals
```
ThreadsTab
    ↓
<ThreadFormModal
  opened={modalOpened}
  onClose={closeThreadModal}
  onSubmit={handleThreadSubmit}
  isLoading={isSubmitting}
  editingId={editingId}
  title={editingTitle}
  onTitleChange={setEditingTitle}
/>
```

### Modal Composition Pattern
```
Modal Component
├─ Input Fields (controlled)
├─ Button Handlers
└─ Form Submission

Parent Tab Component
├─ Manages modal state (opened, loading, values)
├─ Provides change handlers (onTitleChange, etc)
└─ Provides submit handler (onSubmit)
```

## Responsive Design

### Layout Breakpoints
```
Desktop (lg and above)
├─ Left Column: 4/12 (33%)
└─ Right Column: 8/12 (67%)

Tablet/Medium (md)
├─ Stacked vertically
├─ Left Column: 12/12 (100%)
└─ Right Column: 12/12 (100%)

Mobile (base)
├─ Fully responsive
├─ Solutions Grid: 1 column
├─ Menu dropdowns work on touch
└─ All buttons full-width on small screens
```

### Solutions Grid Responsive
```
Desktop (lg)
└─ 3 columns

Tablet (sm to md)
└─ 2 columns

Mobile (base)
└─ 1 column
```

## Error Handling

### Error Flow
```
API Call
    ↓
try/catch block
    ↓
    ├─ Success: Update state with data
    │
    └─ Error:
       ├─ Set error message in state
       ├─ Display to user in component
       ├─ Log to console
       └─ Maintain previous data (don't clear)
```

### Error Display
```
Hook Level
├─ Captures API errors
├─ Stores in error state
└─ Returns error to component

Component Level
├─ Displays error message if present
└─ Doesn't prevent other operations
```

## Performance Optimization

### Current Optimizations
- ✅ Each tab loads data independently
- ✅ Data cached in component state
- ✅ Tab switching doesn't reload data
- ✅ Parent re-renders don't affect child state

### Potential Optimizations
- [ ] React.memo for tab components
- [ ] useCallback for event handlers
- [ ] Virtual scrolling for 3000+ items
- [ ] Pagination for large lists
- [ ] Request debouncing for search
- [ ] Response caching with time-to-live

## Testing Strategy

### Unit Tests
```
hooks/
├─ useThreadManagement.test.ts
├─ useSolutionManagement.test.ts
└─ useVotingData.test.ts

components/
├─ ThreadsTab.test.tsx
├─ SolutionsTab.test.tsx
├─ VotingTab.test.tsx
├─ ThreadFormModal.test.tsx
├─ DeleteThreadModal.test.tsx
├─ SolutionFormModal.test.tsx
└─ DeleteSolutionModal.test.tsx
```

### Integration Tests
```
Full page flow:
1. Load agenda
2. Switch to each tab
3. Create/Edit/Delete in each tab
4. Verify data consistency
5. Test error scenarios
```

### E2E Tests
```
User flows:
1. Open agenda detail
2. Create thread → Verify in list
3. Edit thread → Verify update
4. Delete thread → Verify removal
5. Create solution → Verify in grid
6. Edit solution → Verify update
7. Delete solution → Verify removal
```

## Scalability Considerations

### Adding New Tab
1. Create `components/tabs/NewTab.tsx`
2. Create `hooks/useNewTabData.ts` (if needed)
3. Export from `components/tabs/index.ts`
4. Add tab to Tabs.List in parent
5. Add Tabs.Panel in parent

### Adding New Modal
1. Create `components/modals/NewModal.tsx`
2. Export from `components/modals/index.ts`
3. Use in appropriate tab component

### Extending Hook Functionality
1. Add new state variable
2. Add new function
3. Export from hook
4. Use in component

No changes needed to parent component or other tabs!

## API Integration Example

### Before (Monolithic)
```
1,061 line component
├─ All state in one place
├─ All API calls mixed in
├─ All modals together
└─ Hard to test/modify
```

### After (Modular)
```
3 focused tabs + hooks
├─ Each manages own state
├─ Each handles own API
├─ Each has own modals
└─ Easy to test/modify
```

## Summary

The refactored architecture provides:

1. **Clear Separation** - Hooks handle logic, components handle UI
2. **Easy Testing** - Each piece can be tested independently
3. **Simple Extension** - Add new features without touching existing code
4. **Better Performance** - Optimized re-renders and state management
5. **Maintainable Code** - Easy to find and understand functionality
6. **Reusable Pieces** - Hooks and components can be used elsewhere

All while maintaining the same user-facing functionality!
