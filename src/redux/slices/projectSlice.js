import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectList: [
   
  ],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      const newProject = {
        ...action.payload,
        src: action.payload.src || "/placeholder.jpg", // Use placeholder if no image
        alt: action.payload.alt || `${action.payload.tool} Project`,
        state: action.payload.state || "In Progress",
        color: action.payload.state === "Completed" ? "bg-green-500" : "bg-yellow-500",
        width: action.payload.width || 250,
        height: action.payload.height || 251
      };

      // Validate required fields
      if (!newProject.tool || !newProject.link) {
        console.error("Invalid project data:", newProject);
        return;
      }

      state.projectList.push(newProject);
    },
    removeProject: (state, action) => {
      state.projectList = state.projectList.filter(
        (project, index) => index !== action.payload
      );
    },
    resetProjects: (state) => {
      state.projectList = [];
    },
  },
});

export const { addProject, removeProject, resetProjects } = projectSlice.actions;
export default projectSlice.reducer;
