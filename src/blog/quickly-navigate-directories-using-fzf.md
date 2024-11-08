---
title: Quickly navigate directories using fzf
draft: true
---

```bash
# Function to interactively change directory using fd and fzf
cc() {
    # Initialize local variables for options and target directory
    local fd_options fzf_options target

    # Set fd command options
    fd_options=(
        # Only show directories
        --type directory
    )

    # Set fzf command options
    fzf_options=(
        # Disable multiple selection
        --no-multi
        # Preview directory contents
        --preview='tree -L 1 {}'
        # Toggle preview with Ctrl+Space
        --bind=ctrl-space:toggle-preview
        # Exit immediately if no match
        --exit-0
    )

    # Find directories using fd and pipe to fzf for selection
    target="$(fd . "${1:-.}" "${fd_options[@]}" | fzf "${fzf_options[@]}")"

    # Change to selected directory or return error if failed
    cd "$target" || return 1
}
```
