# Code Review Challenge

**The task here is to imagine that the files in this repository are part of a new pull request and to leave a code review as you normally would. A few assumptions can be made:**
- All of the other files needed for the imaginary app to actually "work" already exist
- All of the necessary endpoints, actions, methods referenced in these files already exist, even if they aren't in the files (for example, a POST request to `/wishlist_items`)
- Although typically these would probably be split into multiple pull requests, for the sake of this exercise they can be grouped into one

<br />

**Instructions:**
- Clone this repository
- Review each file (aside from README.md), leaving comments in the code where you would normally do so in Github
- When you are done, upload the files to a folder in Google Drive and email the link ("Viewer"/read-only is fine) to andrew@halo.science
- After reviewing your submission, we will get in touch with you about next steps. Good luck!

<br />

**The "changes" being made in this pull request are:**
- `Wishlist.jsx`
  - Creates a Wishlist view that fetches and displays a user's saved wishlist items
  - Each row displays two buttons giving the option to remove an item from the wishlist or to mark it as "owned", which also removes it from the list
  - There are two input fields for a user to enter a new item's title and author.  If both of these fields contain strings consisting entirely of spaces, a hint message should appear, informing the user that pressing the "Escape" key will clear both fields
- `Stats.jsx`
  - Creates a Stats view that displays information about a user's collection of owned books, including:
    - The total number of books owned by the user
    - The total number of reads across all of the user's owned books
    - The author whose books have been read most by the user
    - The book most-read by the user
- `styles.css`
  - Contains the CSS classes for both `Wishlist.jsx` and `Stats.jsx`
- `reducer.js` and `actions.js`
  - Contain the Redux logic used by both `Wishlist.jsx` and `Stats.jsx`
- `/backend`
  - This folder contains Rails files with a handful of actions/methods.  Each one includes a comment explaining the intended functionality
