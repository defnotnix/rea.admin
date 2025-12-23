# REA Admin - Testing Guide

## Quick Start Testing

### 1. Start the Development Server

```bash
cd apps/rea-admin
pnpm dev
```

Or from project root:
```bash
pnpm -F rea-admin dev
```

Visit: http://localhost:3000

### 2. Login Flow (Currently Skipped)

The app defaults to admin layout. In production, you'll add a login page.

### 3. Test Navigation

The sidebar navigation should be visible with all items. Click through each item to test:

## Testing Checklist

### Home / Dashboard ✓
**Navigate to**: `/home`
- [ ] Dashboard loads with statistics cards
- [ ] Shows 4 stat cards (Districts, Users, Problems, Messages)
- [ ] Recent Activity section displays
- [ ] Quick stats sidebar visible
- [ ] All icons display correctly

**Expected Content:**
- Statistics: "24 Districts", "1,248 Users", "48 Active Problems", "542 Chat Messages"
- Activity feed with recent actions
- Pending review count, moderator count, solved count

### Districts Module ✓
**Navigate to**: `/admin/districts`
- [ ] DataTable shell loads
- [ ] Breadcrumbs show: "Admin Portal > System Configuration > Districts"
- [ ] Tabs visible (All, Active, Inactive)
- [ ] Table displays with columns: District Name, Population, Status, Description, Created Date
- [ ] Filters work (Status, Population Range)
- [ ] Can sort columns

### Users Module ✓
**Navigate to**: `/admin/users`
- [ ] DataTable shell loads
- [ ] Breadcrumbs show: "Admin Portal > User Management > Users"
- [ ] Tabs visible (All, Citizens, Moderators, Active)
- [ ] Table displays with columns: User, Phone, Profession, Role, Verified, Status, Joined Date
- [ ] Filters work (Role, Verification Status, Account Status, Profession)
- [ ] Can sort columns

**Click "Create User"** (button in toolbar or navigate to `/admin/users/new`)
- [ ] Form loads with fields:
  - Full Name
  - Email
  - Phone Number
  - Password
  - Profession
  - District (dropdown)
  - Is Moderator (checkbox)
  - Is Verified (checkbox)
  - Is Active (checkbox - default checked)
- [ ] Submit button works (currently will fail without API)

### Problems Module ✓
**Navigate to**: `/admin/problems`
- [ ] DataTable shell loads
- [ ] Breadcrumbs show: "Admin Portal > Content Management > Problems"
- [ ] Tabs visible (All, Pending Review, Approved, Rejected)
- [ ] Table displays with columns: Problem, Status, Views, Solutions, Submitted By, Submitted Date
- [ ] Filters work (Status, District, Date Range, Views)
- [ ] Can sort columns
- [ ] Status badges color-coded (yellow=pending, blue=approved, red=rejected, green=solved)

**Problems Menu Expansion**
- [ ] Click arrow next to "Problems" to expand submenu
- [ ] Submenu shows:
  - All Problems
  - Create Problem
  - Pending Review
  - Approved

**Click "Create Problem"** or navigate to `/admin/problems/new`
- [ ] Form loads with fields:
  - Problem Title
  - Detailed Description
  - District (dropdown)
  - Status (select: Pending Review, Approved)
- [ ] Submit button works (currently will fail without API)

### Chat Messages Module ✓
**Navigate to**: `/admin/chat`
- [ ] DataTable shell loads
- [ ] Breadcrumbs show: "Admin Portal > Content Management > Chat Messages"
- [ ] Tabs visible (All Messages, Solutions, Comments)
- [ ] Table displays with columns: Author, Message, Votes, Type, Status, Date
- [ ] Filters visible (Message Type, Status, Vote Range)
- [ ] Shows vote counts (👍 upvotes, 👎 downvotes)

### Approved Solutions Module ✓
**Navigate to**: `/admin/approved-solutions`
- [ ] DataTable shell loads
- [ ] Breadcrumbs show: "Admin Portal > Content Management > Approved Solutions"
- [ ] Tabs visible (All, Published, Draft)
- [ ] Table displays with columns: Problem, Solution Title, Solution Author, Published, Approved Date
- [ ] Published status shows as Published/Draft with icon

### Activity Logs (Placeholder) ✓
**Navigate to**: `/admin/activity-logs`
- [ ] Placeholder page loads
- [ ] Shows "Coming Soon" message
- [ ] Describes what this module will do

### System Settings (Placeholder) ✓
**Navigate to**: `/admin/settings`
- [ ] Placeholder page loads
- [ ] Shows "Coming Soon" message
- [ ] Describes what this module will do

### About Page ✓
**Navigate to**: `/about`
- [ ] About page loads
- [ ] Shows REA information
- [ ] Displays system information card with Version, Environment, Last Updated
- [ ] Shows 3 feature cards (Community Driven, Transparent, Inclusive)

## Navigation Testing

### Sidebar Navigation
- [ ] Sidebar visible on left
- [ ] All items visible
- [ ] Icons display correctly
- [ ] Text labels visible
- [ ] Items are clickable

### Menu Expansion
- [ ] "Problems" menu expands/collapses
- [ ] Expanded menu shows 4 sub-items
- [ ] Sub-items are clickable

### Breadcrumbs
- [ ] Home page: No breadcrumbs (or minimal)
- [ ] Module pages: Show navigation path
- [ ] Breadcrumbs are styled appropriately

### Active Indicators
- [ ] Current page is highlighted in sidebar
- [ ] Navigation shows which page you're on

## Layout Testing

### Header
- [ ] Header visible at top
- [ ] Contains logo/branding
- [ ] Contains navigation elements

### Sidebar
- [ ] Sidebar visible on left
- [ ] Can collapse/expand (if button exists)
- [ ] Stays visible when navigating

### Main Content
- [ ] Content area fills available space
- [ ] Scrollable if content exceeds height
- [ ] Responsive on different screen sizes

### Footer (if applicable)
- [ ] Footer visible at bottom
- [ ] Contains useful information

## Responsive Design

### Desktop (1920px+)
- [ ] Sidebar full width
- [ ] All content visible
- [ ] Tables show all columns
- [ ] No horizontal scrolling

### Tablet (768px - 1024px)
- [ ] Layout adapts appropriately
- [ ] Sidebar may collapse
- [ ] Tables stack if needed

### Mobile (320px - 767px)
- [ ] Sidebar collapses to icon
- [ ] Full width content
- [ ] Touch-friendly sizes

## Common Issues to Check

### Routes Not Working
```
ERROR: Module not found
```
- Check `/admin/districts/page.tsx` exists
- Verify import paths are correct
- Check all page files are created

### Modules Not Importing
```
ERROR: Cannot find module '@/modules/districts'
```
- Verify `modules/index.ts` exports the component
- Check `_List` and `_New` exports exist
- Run `pnpm install` if needed

### API Errors
```
NEXT_PUBLIC_API_BASE is not set
```
- Create `.env.local` in rea-admin root
- Add: `NEXT_PUBLIC_API_BASE=http://localhost:3001`
- Or set to your actual API endpoint

### Layout Issues
```
AdminShell not working
```
- Check `(admin)/layout.tsx` imports AdminShell
- Verify navItems are passed correctly
- Check CSS/styling is loaded

## Testing Forms

### Try submitting forms (without API)
**Users Form** (`/admin/users/new`)
1. Fill in all fields
2. Click "Create User"
3. Should show validation errors if fields are empty
4. Network tab shows POST request attempt

**Problems Form** (`/admin/problems/new`)
1. Fill in all fields
2. Click "Create Problem"
3. Should validate title/description lengths
4. Network tab shows POST request attempt

## Performance Checks

- [ ] Pages load quickly (< 2s)
- [ ] No console errors
- [ ] No console warnings
- [ ] Network requests are logged
- [ ] No memory leaks (check DevTools)

## Accessibility Checks

- [ ] Tab navigation works
- [ ] Links have visible focus
- [ ] Form labels associated with inputs
- [ ] Color contrast adequate
- [ ] Images have alt text

## Browser DevTools Checks

### Network Tab
- [ ] Check what requests are being made
- [ ] No 404 errors for resources
- [ ] API requests go to correct endpoint
- [ ] Response headers look correct

### Console Tab
- [ ] No error messages
- [ ] No warning messages
- [ ] API calls show in console (if logging enabled)

### Elements Tab
- [ ] HTML structure is semantic
- [ ] CSS classes applied correctly
- [ ] No duplicate IDs

## Successful Test Summary

When all tests pass, you should be able to:
✅ Navigate to all pages using the sidebar
✅ View data in tables with filtering/sorting
✅ Open form pages
✅ Submit forms (will error without API, but form works)
✅ See proper breadcrumbs
✅ Use sidebar on all pages
✅ View responsive layouts

## Next Steps After Testing

1. **Connect to Real API**
   - Update `NEXT_PUBLIC_API_BASE` to your API
   - Verify API endpoints match module.api.ts

2. **Add Authentication**
   - Create login page
   - Implement session management
   - Add route protection

3. **Implement Forms**
   - Connect form submissions to API
   - Add success/error notifications
   - Add redirect after successful submission

4. **Add Real Data**
   - Load districts for dropdowns
   - Load initial data on page load
   - Implement pagination

5. **Polish UI**
   - Customize colors/themes
   - Add animations
   - Improve layouts

---

**Happy Testing! 🚀**

Start with the navigation test to make sure all routes work, then move on to module-specific testing.
