# Workflow Comparison: Vague vs Precise AI Prompting
## The Task
Add client-side validation to the registration form in contact.html. Built twice on separate branches: round1-vague (single-line prompt) and round2-precise (detailed prompt with constraints and a verification step).
## Round 1: Vague Prompt
Prompt: "Add validation to my registration form"
Time: ~5 minutes, prompt to acceptance (no review).
Result: Instead of adding validation to my existing form, the AI built an entirely new, duplicate form on top of it -- a separate Email field, a Password field, and a Login button, plus a new Register button -- while my original form (with the fields I had already added) stayed underneath, still active. The page ended up with two overlapping forms stacked on each other. It also made Password required, even though my form never had a password field in the first place. Email format errors did display correctly, but the structural mistake made the whole thing unusable -- a real reviewer would reject this immediately.
## Round 2: Precise Prompt
Prompt specified: exact file (contact.html), field-by-field rules (Full Name, Email only -- no password field, since my form doesn't have one), inline red error text instead of alert() popups, no external libraries, and a required verification step ("write tests, run them, fix failures").
Time: ~15 minutes including testing.
Result: The AI did not touch or duplicate my original form. It replaced the native required attribute on Name and Email with custom validation, showing an inline red error message under each field for empty or invalid input, and clearing the message once corrected. It wrote 4 unit tests (valid/invalid name, valid/invalid email) in a separate test file and ran them with Node -- all 4 passed. In manual browser testing, the form worked as expected: empty submission blocked with errors, invalid email format caught, valid input submits cleanly.
## Correctness
Round 1 failed on the most basic level -- it changed the form's structure instead of extending it, and added an unrequested password requirement. Round 2 only touched what was asked and matched my form's actual fields.
## Accessibility
Neither round explicitly handled ARIA attributes or screen-reader announcements for errors -- this is a gap worth fixing in a future pass, and now a rule.
## Edge Cases
Round 1 gave no visibility into edge cases since it wasn't tested. Round 2's tests covered valid/invalid name and email; it did not test extremely long input or special characters, which is a limitation.
## Review Effort
Round 1 needed a full rebuild -- the duplicate form made it unusable, essentially zero net value despite being "done" first. Round 2 took 3x longer end-to-end (15 min vs 5 min), but needed almost no manual fixing since the AI reviewed and verified its own output before I did. The extra upfront time in round 2 replaced what would have been much longer manual debugging time on round 1's output.
## Key Takeaway
The AI mistake I caught: in round 1, the AI added an entire unrequested duplicate login/password form on top of my existing one instead of modifying it -- a mistake I would have missed if I'd copied the code straight into my real project without checking it in the browser first.
