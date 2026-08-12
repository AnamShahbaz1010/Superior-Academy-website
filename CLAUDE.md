# Project Rules
1. When asked to add validation to an existing form, only modify the existing fields and structure -- never add new fields (e.g. password) or new elements (e.g. duplicate login buttons) that weren't part of the original form or explicitly requested.
2. Form validation must show inline error messages below the relevant field using custom JavaScript -- never rely on browser-default required popups or alert() dialogs.
3. Any validation logic must be accompanied by automated tests (valid and invalid cases for each field) that are run and shown passing before the work is considered complete.
