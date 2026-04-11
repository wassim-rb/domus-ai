# GitHub Autonomous Push Configuration

## Overview
Claude (via Cowork) is configured to autonomously push commits to GitHub using a Personal Access Token (PAT). This enables hands-free deployment workflows without manual git credentials.

---

## Token Details

**Token Name**: `claude-cowork-push`  
**Type**: Personal Access Token (classic)  
**Created**: April 10, 2026  
**Expires**: July 10, 2026 (90 days)  
**Scopes**: `repo` (full control), `workflow` (update GitHub Actions workflows)  

**Storage Location**: `~/.git-credentials` (local, not in repo)  
**Git Config**: `credential.helper=store`

---

## How It Works

1. **Autonomous Commits**: Claude creates commits locally (git commit)
2. **Autonomous Pushes**: Claude pushes to GitHub (git push) using cached token
3. **No Manual Input**: Token is retrieved from `~/.git-credentials` automatically
4. **Automatic Vercel Deploy**: Vercel watches main branch, auto-deploys on push

```mermaid
Claude Code → Git Commit → Git Push (with PAT) → GitHub → Vercel Deploy
```

---

## If Token Expires or Needs Rotation

**Before July 10, 2026**, you'll need to:

1. Go to https://github.com/settings/tokens
2. Generate a new classic PAT with same scopes (`repo`, `workflow`)
3. Copy the new token
4. Tell Claude: "Update GitHub token: `ghp_...`"
5. Claude will:
   ```bash
   git credential approve  # Store new token in ~/.git-credentials
   ```

---

## Troubleshooting

### Error: "authentication failed"
- Token may have expired
- Verify token at: https://github.com/settings/tokens
- Generate new token if needed

### Error: "repository not found"
- Check repo URL: `https://github.com/wassim-rb/domus-ai.git`
- Verify PAT has `repo` scope

### Error: "401 Unauthorized"
- Token scope insufficient
- Generate new PAT with `repo` scope

---

## Security Notes

⚠️ **Do NOT commit the token to the repository**  
✅ Token stored in: `~/.git-credentials` (local machine, not in repo)  
✅ Remote URL uses: `https://github.com/wassim-rb/domus-ai.git` (no token embedded)  
✅ Token retrieved automatically via git credential helper

---

## Workflow Example

```bash
# Claude's autonomous workflow:
cd /path/to/domus-ai
git add DEPLOYMENT.md
git commit -m "Add deployment documentation"
git push origin main

# At "git push" step:
# → Git queries credential helper
# → Credential helper returns token from ~/.git-credentials
# → Push succeeds automatically
```

---

## Commands for Manual Token Updates

If you need to manually update the token:

```bash
git credential-cache exit                    # Clear cached credentials
git credential approve << EOF
protocol=https
host=github.com
username=<token>
password=ghp_<new-token-here>
EOF
```

Or:
```bash
echo "https://ghp_<token>@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
git config credential.helper store
```

---

**Last Updated**: April 10, 2026  
**Maintained By**: Claude (Cowork)  
**Next Action**: Rotate token before July 10, 2026
