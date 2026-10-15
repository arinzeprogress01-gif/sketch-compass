<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the FolioPro workspace shell in the `/dashboard` layout and isolate preview data in `src/data/dashboard.ts` so a future data service can replace it cleanly.

- Keep workspace edits in a shared, session-only preview provider until a real data service is connected; this makes lists, profile, CV and portfolio reflect the same data without implying persistence.
- Generate CV downloads in the browser from structured CV data with a dynamically imported PDF library; private documents must not require an external service.
