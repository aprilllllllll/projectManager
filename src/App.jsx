import NewProject from "./components/NewProject";
import ProjectsSideBar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  }
  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }
  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }
  function handleSelectedProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    });
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          project => project.id !== prevState.selectedProjectId
        )
      };
    });
  }
  function handleAddTask(text) {
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      };
    });
  }
  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      };
    });
  }
  const selectedProject = projectState.projects.find(
    project => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === undefined)
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  else if (projectState.selectedProjectId === null)
    content = (
      <NewProject onAdd={handleAddProject} onCancle={handleCancelAddProject} />
    );

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar
        projects={projectState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectedProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
