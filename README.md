# Task Tracker

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

This is a simple command-line interface (CLI) application for managing tasks.

## Features

- Add new tasks with a unique ID and store it in `JSON` format.
- List tasks by their status: `todo`, `in-progress`, or `done`.
- Update the description of an existing task.
- Delete tasks by their ID.
- Mark tasks as `in-progress` or `done`.

## Prerequisites

- Node.js installed on your system.

## Installation

**Clone the Repository**

```bash
git clone https://github.com/Blagabo/TaskTrackerCLI.git

# Navigate to the project Directory
cd TaskTrackerCLI
```

## Usage

- **Add a Task**

```bash
node task_tracker.js add "Drink a Coffee"
```

- **List all Tasks**

```bash
node task_tracker.js list
```

- **or by list the tasks by status**

```bash
# To list the tasks that are marked as in-progess
node task_tracker.js list in-progress

# To list the tasks that are marked as done
node task_tracker.js list done
```

- **Update a Task**

```bash
node task_tracker.js update 1 "Drink a Coffee and Do Coding"
```

- **Mark Task Status**

```bash
# Mark as `in-progress` with containing task ID as 1
node task_tracker.js mark-in-progress 1

# Mark as `done` with containing task ID as 1
node task_tracker.js mark-done 1
```

- **Delete a Task (alias: delete, del, remove)**

```bash
# Delete the task by containing its ID 1
node task_tracker.js delete 1

# Delete all tasks
node task_tracker.js delete all
```

### Sample JSON structure

```JSON
[
  {
    "id": "1732-140",
    "description": "test",
    "status": "todo",
    "createdAt": "2024-11-19T11:46:10.950Z",
    "updatedAt": "2024-11-19T11:46:10.950Z"
  }
]
```
