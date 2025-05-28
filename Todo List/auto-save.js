// Helper: Auto-save new task input, description, and tags to localStorage

// Save current input to localStorage when typing
textInputBox.addEventListener("input", () => {
    localStorage.setItem("newTaskInput", textInputBox.value);
});
taskDescriptionInput.addEventListener("input", () => {
    localStorage.setItem("taskDescriptionInput", taskDescriptionInput.value);
});
tagsInput.addEventListener("input", () => {
    localStorage.setItem("tagsInput", tagsInput.value);
});

// Restore input on page load
window.addEventListener("DOMContentLoaded", () => {
    textInputBox.value = localStorage.getItem("newTaskInput") || "";
    taskDescriptionInput.value = localStorage.getItem("taskDescriptionInput") || "";
    tagsInput.value = localStorage.getItem("tagsInput") || "";
});

// Optional: Clear saved draft on task submission or clearing inputs
addBtn.addEventListener("click", () => {
    localStorage.removeItem("newTaskInput");
    localStorage.removeItem("taskDescriptionInput");
    localStorage.removeItem("tagsInput");
});
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("newTaskInput");
    localStorage.removeItem("taskDescriptionInput");
    localStorage.removeItem("tagsInput");
});
