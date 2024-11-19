const fs = require("fs");
const path = require("path");
const tasksFilePath = path.join(process.cwd(), "tasks.json");

// Inicializa el archivo JSON si no existe o está vacío
if (!fs.existsSync(tasksFilePath) || fs.readFileSync(tasksFilePath, "utf-8").trim() === "") {
  fs.writeFileSync(tasksFilePath, JSON.stringify([]));
}

// Cargar tareas desde el archivo JSON
function loadTasks() {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Error al cargar las tareas:", error);
    return [];
  }
}

// Guardar tareas en el archivo JSON
function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Generar un ID único para cada tarea
function generateId() {
  return `${Math.floor(Date.now() / 1000000000)}-${Math.floor(Math.random() * 1000)}`;
}

// Función para agregar una tarea
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: generateId(),
    description,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log("Tarea agregada:", description + " (ID: " + newTask.id + ")");
}

const validStatuses = ["todo", "in-progress", "done"];

// Función para actualizar una tarea (descripción y estado)
function updateTask(id, description) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    console.log("Tarea no encontrada:", id);
    return;
  }

  // Actualizar descripción si es proporcionada
  if (description) {
    task.description = description;
  }

  // Actualizar la fecha de modificación
  task.updatedAt = new Date();

  // Guardar las tareas actualizadas
  saveTasks(tasks);
  console.log(`Tarea con ID ${id} actualizada.`);
}

// Función para eliminar una tarea
function deleteTask(id) {
  let tasks = loadTasks();
  if (id === "all") {
    if (tasks.length === 0) {
      console.log("No hay tareas");
      return;
    }
    tasks = [];
    saveTasks(tasks);
    console.log("Todas las tareas han sido eliminadas");
  } else {
    const taskToDelete = tasks.find(t => t.id === id);

    if (!taskToDelete) {
      console.error(`Error: No se encontró la tarea con ID ${id}.`);
      return;
    }

    // Filtrar las tareas para eliminar la que coincida con el ID
    tasks = tasks.filter(t => t.id !== id);
    console.log(`Tarea con ID ${id} eliminada.`);
  }
  saveTasks(tasks);
}

// Función para listar todas las tareas
function listTasks(status) {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No hay tareas");
    return;
  }
  if (status && !validStatuses.includes(status)) {
    console.log(`Error: Estado no válido. Estados permitidos: ${validStatuses.join(", ")}`);
    return;
  }
  if (!status) {
    console.log("Lista de tareas:");
    tasks.forEach(task => {
      console.log(`[${task.id}] ${task.description} - ${task.status} (Creada: ${new Date(task.createdAt).toLocaleString()})`);
    });
  }
  if (status) {
    const filteredTasks = tasks.filter(t => t.status === status);
    if (filteredTasks.length === 0) {
      console.log(`No hay tareas con el estado "${status}"`);
      return;
    }
    console.log(`Lista de tareas con estado "${status}":`);
    filteredTasks.forEach(task => {
      console.log(`[${task.id}] ${task.description} - ${task.status} (Creada: ${new Date(task.createdAt).toLocaleString()})`);
    });
  }
}

function markInProgress(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.log("Tarea no encontrada:", id);
    return;
  }
  task.status = "in-progress";
  task.updatedAt = new Date();
  saveTasks(tasks);
  console.log(`Tarea con ID ${id} marcada como "in-progress".`);
}

function markDone(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.log("Tarea no encontrada:", id);
    return;
  }
  task.status = "done";
  task.updatedAt = new Date();
  saveTasks(tasks);
  console.log(`Tarea con ID ${id} marcada como "done".`);
}

// Comandos CLI
const action = process.argv[2];
const args = process.argv.slice(3);

switch (action) {
  case "add":
    if (!args[0]) {
      console.log("ERROR: Falta la descripción de la tarea");
      console.log("Uso: node task_tracker.js add <descripción>");
      return;
    } else {
      addTask(args[0]);
    }
    break;
  case "update":
    if (!args[0] || !args[1]) {
      console.log("ERROR: Faltan argumentos");
      console.log("Uso: node task_tracker.js update <id> <descripción>");
      return;
    } else {
      updateTask(args[0], args[1]);
    }
    break;
  case "delete":
  case "del":
  case "remove":
    if (!args[0]) {
      console.log("ERROR: Falta el ID de la tarea a eliminar o 'all' para eliminar todas las tareas");
      console.log("Uso: node task_tracker.js delete <id>");
      return;
    } else {
      deleteTask(args[0]);
    }
    break;
  case "list":
    listTasks(args[0]);
    break;
  case "mark-in-progress":
    markInProgress(args[0]);
    break;
  case "mark-done":
    markDone(args[0]);
    break;
  default:
    console.log("Comando no reconocido");
}
