from sqlalchemy import *
from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os
from dotenv import load_dotenv

load_dotenv()

db = create_engine(os.getenv('DATABASE_URL'))
base = declarative_base()

Session = sessionmaker(db)
session = Session()

class Projects(base):
    __tablename__ = 'projects'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    detail_level = Column(Integer, default=1)
    
    
    general_description = relationship("GeneralDescription", back_populates="project", uselist=False, cascade="all, delete-orphan")
    tmp_general_description = relationship("TMPGeneralDescription", back_populates="project", uselist=False, cascade="all, delete-orphan")

class GeneralDescription(base):
    __tablename__ = 'general_descriptions'
    
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False, unique=True)
    analysis = Column(Text, nullable=True)
    strategy = Column(Text, nullable=True)
    product = Column(Text, nullable=True)
    resource = Column(Text, nullable=True)
    indication = Column(Text, nullable=True)
    
    
    project = relationship("Projects", back_populates="general_description")

class TMPGeneralDescription(base):
    __tablename__ = 'tmp_general_descriptions'
    
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False, unique=True)
    analysis = Column(Text, nullable=True)
    strategy = Column(Text, nullable=True)
    product = Column(Text, nullable=True)
    resource = Column(Text, nullable=True)
    indication = Column(Text, nullable=True)
    detail2a_1 = Column(Text, nullable=True)
    detail2a_2 = Column(Text, nullable=True)
    detail2a_3 = Column(Text, nullable=True)
    detail2a_4 = Column(Text, nullable=True)
    detail2a_5 = Column(Text, nullable=True)
    detail2a_6 = Column(Text, nullable=True)
    detail2c_1 = Column(Text, nullable=True)
    detail2c_2 = Column(Text, nullable=True)
    detail2c_3 = Column(Text, nullable=True)
    detail2c_4 = Column(Text, nullable=True)
    detail2c_5 = Column(Text, nullable=True)
    detail2c_6 = Column(Text, nullable=True)
    
    
    project = relationship("Projects", back_populates="tmp_general_description")