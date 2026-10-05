# FolioX Dashboard Build Plan

## Goal
Extend the current polished site and authentication experience into a complete, frontend-only FolioX professional workspace. Keep the existing visual language intact, rename product-facing branding to FolioX, and treat the uploaded AlphaFolio brief as the functional specification.

## What will be built

### 1. FolioX application shell
- Add a responsive dashboard shell with a collapsible desktop sidebar and mobile drawer.
- Add grouped navigation, active states, breadcrumbs, search interface, notifications panel, help access, and account menu.
- Preserve the current Sora/Manrope typography, color tokens, shadows, spacing, and premium layered visual style.

### 2. Command center
- Build `/dashboard` with a professional greeting, profile-completion journey, restrained overview metrics, quick actions, portfolio status, and recent activity.
- Use clearly isolated preview data because no account backend is connected; never present mock interactions as persisted or live.

### 3. Professional identity and work pages
- Build consistent page experiences for Profile, Experience, Education, Skills, Projects, Certifications, Awards, Publications, Services, Testimonials, Links, and Media/Documents.
- Include polished lists, intentional empty states, add/edit forms, validation, visibility controls, evidence attachments, and destructive-action confirmations.
- Keep labels profession-neutral and adaptable across industries.

### 4. Portfolio workflow
- Build portfolio overview, full-page desktop/mobile preview, publishing controls, public URL tools, and portfolio settings.
- Make the relationship between editing, previewing, and publishing obvious.
- Keep customization focused instead of adding a large theme editor.

### 5. Settings and support
- Build Account, Security, Profile, Portfolio, Notifications, Privacy, Appearance, and Danger Zone settings.
- Add a polished Help & Support page and confirmation-based logout experience.

### 6. Brand consistency
- Replace user-facing PROVEN/AlphaFolio naming with FolioX across the existing landing page, authentication pages, metadata, and new workspace.
- Do not redesign or regress the current landing and authentication layouts.

### 7. Quality checks
- Verify all routes and primary interactions at desktop and mobile sizes.
- Check drawers, menus, dialogs, forms, preview modes, keyboard focus, overflow, metadata, console output, and current build status.

## Technical approach
- Use TanStack Router file routes with a `/dashboard` layout that always renders an `Outlet`, plus dedicated route files for every linked page.
- Keep reusable workspace UI in focused dashboard components and keep demonstration data in one replaceable data module.
- Use existing UI components and semantic design tokens; add no new dependency unless required.
- This phase remains frontend-only. Real account sessions, uploads, notifications, publishing, and saved edits require a later Lovable Cloud connection.
