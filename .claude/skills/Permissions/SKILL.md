---
name: "Permissions"
description: "Manages Claude Code tool permissions and settings configuration"
---

# Permission Management Skill

## Purpose
This skill helps you add, modify, or remove permissions in Claude Code settings without making syntax errors.

## When to Invoke
Automatically invoke this skill when the user asks to:
- Add permissions for a tool/command
- Allow a bash command
- Stop getting permission prompts for something
- Configure WebSearch/WebFetch permissions
- Add dangerous operations to the "ask" list
- Debug why a permission prompt appeared (user says "I was asked for permission" and pastes command)
- Troubleshoot permission issues

## Critical Syntax Rules

### ⚠️ MOST IMPORTANT: Use `:*` for prefix matching, NOT ` *` (space+asterisk)

**WRONG:**
```json
"Bash(gh *)"
"Bash(npm *)"
```

**CORRECT:**
```json
"Bash(gh:*)"
"Bash(npm:*)"
```

### WebFetch Format
```json
"WebFetch(domain:*)"          // All domains
"WebFetch(domain:github.com)" // Specific domain
```

### WebSearch Format
```json
"WebSearch"  // No wildcards supported
```

### MCP Servers
```json
"mcp__*"           // All MCP servers
"mcp__godot__*"    // Specific MCP server prefix
```

## Settings File Locations

1. **Project settings**: `.claude/settings.json` (current project only)
2. **Global settings**: `~/.claude/settings.json` or `C:\Users\<USERNAME>\.claude\settings.json` (all projects)
3. **Local cache**: `.claude/settings.local.json` (auto-generated, delete if causing issues)

## Common Permission Patterns

### Allow all commands for a tool
```json
"Bash(gh:*)",       // All GitHub CLI commands
"Bash(git:*)",      // All git commands
"Bash(npm:*)",      // All npm commands
"Bash(docker:*)",   // All docker commands
"Bash(python:*)"    // All python commands
```

### Repository-specific permissions
```json
"Bash(gh issue create:*--repo AlexZan/*)"  // Only allow on user's repos
```

### Dangerous operations (put in "ask" array)
```json
"Bash(rm -rf:*)",
"Bash(git push --force:*)",
"Bash(gh repo delete:*)",
"Bash(docker system prune:*)"
```

## Workflow

### When the user asks to add a permission:

1. **Read the appropriate settings file**:
   - For project-specific: `.claude/settings.json`
   - For global: `~/.claude/settings.json`

2. **Check existing permissions** to avoid duplicates

3. **Add the permission** using the correct syntax:
   - Use `:*` for wildcards (NOT ` *`)
   - Use proper format for WebFetch/WebSearch
   - Add to "allow" for safe operations
   - Add to "ask" for dangerous operations

4. **Validate the JSON** is correct

5. **Remind the user** to restart VS Code for changes to take effect

6. **Delete `.claude/settings.local.json`** if it exists (it caches specific commands and can interfere)

### When the user reports a permission prompt (DEBUG MODE):

User says: "I was asked for permission" and pastes a command like:
```
tree docs/ -L 2 -d 2>/dev/null || find docs/ -type d -maxdepth 2 | sort
```

**Debug Process:**

1. **Parse the command** to identify:
   - Tool name (e.g., `tree`, `find`, `gh`, `WebSearch`)
   - Arguments and flags
   - Whether it's a bash command, WebFetch, WebSearch, or MCP call

2. **Read BOTH settings files**:
   - `.claude/settings.json` (project)
   - `~/.claude/settings.json` (global)

3. **Search for existing permissions**:
   - Look for exact matches
   - Look for wildcard patterns that should match
   - Check in "allow", "ask", and "deny" arrays

4. **Analyze the situation**:

   **Case A: Permission is missing**
   - Simply add the correct permission
   - Example: No `"Bash(tree:*)"` found → add it

   **Case B: Permission exists but uses wrong syntax**
   - Found: `"Bash(tree *)"` (space+asterisk)
   - Should be: `"Bash(tree:*)"` (colon+asterisk)
   - Fix the syntax

   **Case C: Permission exists with correct syntax but still not working**
   - This is a deeper issue - investigate:
     a. Check if `.claude/settings.local.json` exists (caching issue)
     b. Check if the command format doesn't match the pattern
     c. Search Claude Code documentation online for known issues

   **How to search docs:**
   - Use WebSearch or WebFetch to check: https://docs.claude.com/en/docs/claude-code/settings
   - Search for the specific tool having issues
   - Look for permission syntax examples in official docs

5. **Implement the fix**:
   - Add missing permission
   - Fix syntax errors
   - Delete `.claude/settings.local.json` if it exists
   - Report findings to user

6. **Verify the fix**:
   - Show the user what was wrong
   - Show what was changed
   - Explain why it wasn't working
   - Remind to restart VS Code

### Debug Example:

**User:** "I was asked for permission for: `tree docs/ -L 2 -d`"

**Skill Actions:**
1. Parse: Tool is `tree`, it's a bash command
2. Read `.claude/settings.json` and `~/.claude/settings.json`
3. Search for `tree` in both files
4. **Found:** `"Bash(tree *)"` in project settings ❌
5. **Issue:** Wrong syntax! Should be `"Bash(tree:*)"` not `"Bash(tree *)"`
6. Fix: Replace with correct syntax
7. Report: "Found the issue! Your permission had the wrong syntax. I changed `Bash(tree *)` to `Bash(tree:*)`. Restart VS Code for it to work."

**User:** "I was asked for permission for: `WebSearch`"

**Skill Actions:**
1. Parse: Tool is `WebSearch`
2. Read both settings files
3. Search for `WebSearch` in both files
4. **Found:** `"WebSearch"` in project settings ✅
5. **Not Found:** `"WebSearch"` in global settings ❌
6. **Issue:** Global settings is missing it! Both files must have the permission.
7. Fix: Add `"WebSearch"` to global settings
8. Report: "Found the issue! WebSearch was in your project settings but not in your global settings. Both need to have it. I added it to `~/.claude/settings.json`. Restart VS Code."

**User:** "I was asked for permission for: `gh project item-edit --project-id ABC --id XYZ`"

**Skill Actions:**
1. Parse: Tool is `gh`, specifically `gh project item-edit`
2. Read both settings files
3. Search for `gh` patterns
4. **Found:** `"Bash(gh:*)"` in both files ✅
5. **Issue:** Permission exists with correct syntax but still asking!
6. **Deep Investigation:**
   a. Check for `.claude/settings.local.json` → Found it! This is caching old permissions
   b. Delete the cache file
   c. Also search online docs for any known issues with `gh` permissions
7. Fix: Delete `.claude/settings.local.json`
8. Report: "Found the issue! You had a `.claude/settings.local.json` file caching old permission decisions. This was interfering with your wildcard pattern. I deleted it. Restart VS Code and it should work."

## Examples

### User asks: "Stop asking me for npm permission"

**Action:**
1. Read `.claude/settings.json`
2. Add `"Bash(npm:*)"` to the "allow" array
3. Save the file
4. Tell user to restart VS Code

### User asks: "Allow all web searches"

**Action:**
1. Read `.claude/settings.json`
2. Add `"WebSearch"` to the "allow" array (no wildcards)
3. Save the file
4. Tell user to restart VS Code

### User asks: "Make git force push ask for confirmation"

**Action:**
1. Read `.claude/settings.json`
2. Add `"Bash(git push --force:*)"` and `"Bash(git push -f:*)"` to the "ask" array
3. Save the file
4. Tell user to restart VS Code

## Troubleshooting

### Permission still asking after adding
1. Verify syntax is correct (`:*` not ` *`)
2. Check if `.claude/settings.local.json` exists and delete it
3. Ensure user has fully restarted VS Code (not just reloaded window)
4. Check both global and project settings files

### Validation errors
- Read the error message - it shows the correct syntax
- Most common: using ` *` instead of `:*`
- WebFetch: must use `domain:` format
- WebSearch: no wildcards allowed

## Important Notes

- Changes require **full VS Code restart** to take effect
- Both global and project settings merge together
- More specific patterns override general ones
- Always use `:*` for bash command wildcards
- Delete `.claude/settings.local.json` if wildcards aren't working
