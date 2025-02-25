import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./DetailTabs.module.scss";
import {
  getTMPGeneralDescription,
  updateTMPGeneralDescription,
  updateGeneralDescription,
} from "../../services/api";

// Компонент для вкладених табів
const BlockTabs = ({ level, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("А");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className={styles.tabHeader}>
        <p>Блок:</p>
        <button onClick={() => handleTabClick("А")}>A</button>
        <button onClick={() => handleTabClick("С")}>С</button>
        <button onClick={() => handleTabClick("Пі")}>Пі</button>
        <button onClick={() => handleTabClick("Р")}>Р</button>
        <button onClick={() => handleTabClick("Ін")}>Ін</button>
      </div>
      <div className={styles.tabContent}>
        <h3>Блок {activeTab}</h3>
        <QuestionForm tab={activeTab} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

// Компонент для заповнення інпутів запитань
const QuestionForm = ({tab, onSubmit }) => {
  const { projectId } = useParams();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getTMPGeneralDescription(projectId).then((data) => reset(data));
  }, [projectId, reset, tab]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {(tab === "А") && (<><div className={styles.input_wrapper}>
        <label htmlFor="detail2a_1">Хто ви?</label>
        <input id="detail2a_1" type="text" {...register("detail2a_1")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2a_2">Яка ваша мета?</label>
        <input id="detail2a_2" type="text" {...register("detail2a_2")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2a_3">Які існують можливості?</label>
        <input id="detail2a_3" type="text" {...register("detail2a_3")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2a_4">Які у вас сильні сторони?</label>
        <input id="detail2a_4" type="text" {...register("detail2a_4")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2a_5">Які у вас слабкі сторони?</label>
        <input id="detail2a_5" type="text" {...register("detail2a_5")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2a_6">Які є загрози?</label>
        <input id="detail2a_6" type="text" {...register("detail2a_6")} />
      </div></>)}
      {(tab === "С") && (<><div className={styles.input_wrapper}>
        <label htmlFor="detail2c_1">Яка місія?</label>
        <input id="detail2c_1" type="text" {...register("detail2c_1")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2c_2">Яка візія?</label>
        <input id="detail2c_2" type="text" {...register("detail2c_2")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2c_3">Які цінності?</label>
        <input id="detail2c_3" type="text" {...register("detail2c_3")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2c_4">Яка дорожня мапа?</label>
        <input id="detail2c_4" type="text" {...register("detail2c_4")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2c_5">Яка найближча мета?</label>
        <input id="detail2c_5" type="text" {...register("detail2c_5")} />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="detail2c_6">Які є поточні актуальні задачі?</label>
        <input id="detail2c_6" type="text" {...register("detail2c_6")} />
      </div></>)}

      <button type="submit">Зберегти</button>
    </form>
  );
};

// Компонент для заповнення інпутів першого рівня
const LevelForm = ({ onSubmit }) => {
  const { projectId } = useParams();
  const { register, handleSubmit, reset, getValues } = useForm();

  useEffect(() => {
    getTMPGeneralDescription(projectId).then((data) => reset(data));
  }, [projectId, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleSingleInputSubmit = async (key) => {
    const value = getValues(key);
    try {
      await updateGeneralDescription(projectId, { [key]: value });
    } catch (error) {
      console.error("Error updating input:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.input_wrapper}>
        <label htmlFor="analysis">Який бажаний напрям діяльності?</label>
        <input id="analysis" type="text" {...register("analysis")} />
        <button
          type="button"
          onClick={() => handleSingleInputSubmit("analysis")}
        >
          Відправити
        </button>
      </div>

      <div className={styles.input_wrapper}>
        <label htmlFor="strategy">
          Який результат ви бажаєте отримати в найближчий час в чому?
        </label>
        <input id="strategy" type="text" {...register("strategy")} />
        <button
          type="button"
          onClick={() => handleSingleInputSubmit("strategy")}
        >
          Відправити
        </button>
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="product">Яку цінність в кому ви несете?</label>
        <input id="product" type="text" {...register("product")} />
        <button
          type="button"
          onClick={() => handleSingleInputSubmit("product")}
        >
          Відправити
        </button>
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="resource">
          Які ресурси потрібні для створення та донесення цінності?
        </label>
        <input id="resource" type="text" {...register("resource")} />
        <button
          type="button"
          onClick={() => handleSingleInputSubmit("resource")}
        >
          Відправити
        </button>
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="indication">
          Які індикатори необхідно контролювати для забезпечення результату?
        </label>
        <input id="indication" type="text" {...register("indication")} />
        <button
          type="button"
          onClick={() => handleSingleInputSubmit("indication")}
        >
          Відправити
        </button>
      </div>

      <button type="submit">Зберегти</button>
    </form>
  );
};

// Головний компонент з табами "Рівні деталізації"
const DetailTabs = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [levelData, setLevelData] = useState(null);
  const [blockData, setBlockData] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLevelSubmit = (data) => {
    updateTMPGeneralDescription(projectId, data);
    setLevelData(data);
  };

  const handleBlockSubmit = (data) => {
    updateTMPGeneralDescription(projectId, data);
    setBlockData(data);
  };

  return (
    <div>
      <div className={styles.tabHeader}>
        <p>Рівень деталізації:</p>
        <button onClick={() => handleTabClick(1)}>1</button>
        <button onClick={() => handleTabClick(2)}>2</button>
        <button onClick={() => handleTabClick(3)}>3</button>
        <button onClick={() => handleTabClick(4)}>4</button>
        <button onClick={() => handleTabClick(5)}>5</button>
      </div>

      {activeTab === 1 && (
        <div className={styles.tabContent}>
          <h3 className={styles.subTitle}>Рівень 1</h3>
          <LevelForm onSubmit={handleLevelSubmit} />
        </div>
      )}

      {activeTab === 2 && (
        <div className={styles.tabContent}>
          <h3 className={styles.subTitle}>Рівень 2</h3>
          <BlockTabs onSubmit={handleBlockSubmit} />
        </div>
      )}

      {activeTab === 3 && <div>Рівень 3</div>}
      {activeTab === 4 && <div>Рівень 4</div>}
      {activeTab === 5 && <div>Рівень 5</div>}
    </div>
  );
};

export default DetailTabs;
