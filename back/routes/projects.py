from flask import Blueprint, jsonify, request
from flask_restx import Api, Resource, fields
from models import *
from sqlalchemy.orm.exc import NoResultFound
from datetime import datetime

# Ініціалізація Blueprint та Flask-RESTX API
projects = Blueprint('projects', __name__, url_prefix='/api')
api = Api(projects, doc="/swagger/")

# Опис моделі для проекту
project_model = api.model('Project', {
    'id': fields.Integer(readonly=True, description='ID проекту'),
    'name': fields.String(required=True, description='Назва проекту'),
    'description': fields.String(description='Опис проекту'),
    'detail_level': fields.Integer(description='Рівень деталізації проекту', default=1)
})

# Опис класу для отримання всіх проектів
@api.route('/projects')
class ProjectList(Resource):
    @api.doc('get_projects')
    @api.marshal_list_with(project_model)
    def get(self):
        try:
            projects_list = session.query(Projects).all()
            return [{"id": p.id, "name": p.name, "description": p.description, "detail_level": p.detail_level} for p in projects_list], 200
        except Exception as e:
            session.rollback()
            return {"message": f"Сталася помилка: {str(e)}"}, 500

    @api.doc('create_project')
    @api.expect(project_model, validate=True)
    @api.marshal_with(project_model, code=201)
    def post(self):
        try:
            data = request.json
            new_project = Projects(
                name=data["name"],
                description=data.get("description", ""),
                detail_level=data.get("detail_level", 1)
            )
            session.add(new_project)
            session.commit()
            return {"id": new_project.id, "name": new_project.name, "description": new_project.description, "detail_level": new_project.detail_level}, 201
        except Exception as e:
            session.rollback()
            return {"message": f"Сталася помилка: {str(e)}"}, 500

# Опис класу для оновлення проекту
@api.route("/projects/<int:project_id>")
class Project(Resource):
    @api.doc('update_project')
    @api.expect(project_model, validate=True)
    @api.marshal_with(project_model)
    def put(self, project_id):
        try:
            project = session.query(Projects).get(project_id)
            if not project:
                return {"error": "Project not found"}, 404
            data = request.json
            project.name = data.get("name", project.name)
            project.description = data.get("description", project.description)
            project.detail_level = data.get("detail_level", project.detail_level)
            session.commit()
            return {"id": project.id, "name": project.name, "description": project.description, "detail_level": project.detail_level}
        except Exception as e:
            session.rollback()
            return {"message": f"Сталася помилка: {str(e)}"}, 500

    @api.doc('delete_project')
    def delete(self, project_id):
        try:
            project = session.query(Projects).get(project_id)
            if not project:
                return {"error": "Project not found"}, 404
            session.delete(project)
            session.commit()
            return {"message": "Project deleted"}
        except Exception as e:
            session.rollback()
            return {"message": f"Сталася помилка: {str(e)}"}, 500
