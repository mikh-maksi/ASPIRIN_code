import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ProjectDetail.module.scss";
import { getGeneralDescription, updateGeneralDescription  } from "../../services/api";
import DetailTabs from "../../components/DetailTabs/DetailTabs";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [description, setDescription] = useState(null);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    try {
    
      getGeneralDescription(projectId).then((description) => setDescription(description)).catch((error) => {console.log(error)});
     
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }, [projectId]);

 
  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>Назад</button>
      <h1 className={styles.title}>Проєкт: {description?.project?.name}</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Аналіз</th>
            <th>Стратегія</th>
            <th>Продукт</th>
            <th>Ресурси</th>
            <th>Індикація</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{description?.general_description?.analysis}</td>
            <td>{description?.general_description?.strategy}</td>
            <td>{description?.general_description?.product}</td>
            <td>{description?.general_description?.resource}</td>
            <td>{description?.general_description?.indication}</td>
          </tr>
        </tbody>
      </table>

      <DetailTabs />
    </div>
  );
};

export default ProjectDetail;
