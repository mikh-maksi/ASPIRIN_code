import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { fetchProjects, createProject, updateProject, deleteProject } from "../../services/api";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import styles from "./Home.module.scss";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const onSubmit = async (data) => {
    if (editProject) {
      await updateProject(editProject.id, data);
      setProjects((prev) => prev.map((p) => (p.id === editProject.id ? { ...p, ...data } : p)));
    } else {
      const newProject = await createProject(data);
      setProjects((prev) => [...prev, newProject]);
    }
    setEditProject(null);
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список проєктів</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Назва</th>
            <th>Опис</th>
            <th>Рівень деталізації</th>
            <th>Деталізація</th>
            <th>Редагувати</th>
            <th>Видалити</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.detail_level}</td>
              <td><Link to={`/${project.id}`}>Підвищити</Link></td>
              <td><Button onClick={() => { setEditProject(project); setModalOpen(true); }}>Редагувати</Button></td>
              <td><Button onClick={() => deleteProject(project.id)}>Видалити</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={() => { setEditProject(null); setModalOpen(true); }}>Додати проєкт</Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className={styles.modal_title}>Додати проєкт</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input placeholder="Назва проєкту" {...register("name")} defaultValue={editProject?.name || ""} className={styles.input} />
          <textarea placeholder="Опис" {...register("description")} defaultValue={editProject?.description || ""} className={styles.textarea}></textarea>
          <Button type="submit">{editProject ? "Зберегти" : "Додати проєкт"}</Button>
        </form>
      </Modal>
    </div>
  );
}