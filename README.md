# 📒ADDRESS BOOK

A simple address book application to store and manage contact information

# 🔗Link

- URL Deployment
- Repository

# 📱Features

- Add
- Edit
- Delete
- Search by name

# 🛠️Tech Stack

- HTML
- CSS
- JavaScript

# FlowChart

```mermaid
flowchart TD
    A[Start] --> B[Display Contact List]
    B --> C{User Action}
    C -->|Add Contact| D[Show Add Contact Form]
    C -->|Edit Contact| E[Show Edit Contact Form]
    C -->|Delete Contact| F[Confirm Deletion]
    D --> G[Save New Contact]
    E --> H[Update Contact]
    F --> I[Remove Contact]
    G --> B
    H --> B
    I --> B
    B --> J[End]
```
