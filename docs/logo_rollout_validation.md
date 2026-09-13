# Supplied Moon-Badge Logo Rollout Validation

## Visual placement findings

The supplied transparent moon-badge asset is now rendered from `/assets/images/brand/breathe-better-tonight-moon-badge.webp` through the shared public layout. Review of representative canonical, legacy, and outcome pages confirms the mark is anchored at the upper-left edge **within each page header**. Some legacy designs intentionally inset the complete header from the browser edge; the logo remains upper-left within that designed header rather than being artificially detached from it.

The white background panels were removed from both the header and footer treatments. The public header uses only the supplied transparent mark with a restrained drop shadow for contrast on dark hero and header surfaces. The footer keeps its existing textual brand treatment without an extra logo panel.

## Focused responsive check

The focused Playwright check passed on desktop and mobile for a canonical new copy LP, a preserved legacy LP, and a matched outcome page. It verified that the supplied asset is present, the logo frame is transparent and borderless, the mark starts within 24 pixels of the header’s left edge, no horizontal overflow occurs, and the new copy LP retains its open-guide icon.

