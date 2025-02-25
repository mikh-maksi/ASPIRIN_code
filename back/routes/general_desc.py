from flask import Blueprint, jsonify, request
from flask_restx import Api, Resource, fields
from models import *
from sqlalchemy.orm.exc import NoResultFound
from datetime import datetime

# Ініціалізація Blueprint та Flask-RESTX API
general_description = Blueprint('general_description', __name__, url_prefix='/api')
api = Api(general_description, doc="/swagger/")

# Опис моделі для GeneralDescription
general_description_model = api.model('GeneralDescription', {
    'id': fields.Integer(readonly=True, description='ID запису'),
    'analysis': fields.String(description='Аналіз'),
    'strategy': fields.String(description='Стратегія'),
    'product': fields.String(description='Продукт'),
    'resource': fields.String(description='Ресурси'),
    'indication': fields.String(description='Індикатори')
})

tmp_general_description_model = api.model('TMPGeneralDescription', {
    'id': fields.Integer(readonly=True, description='ID запису'),
    'analysis': fields.String(description='Аналіз'),
    'strategy': fields.String(description='Стратегія'),
    'product': fields.String(description='Продукт'),
    'resource': fields.String(description='Ресурси'),
    'indication': fields.String(description='Індикатори')
})

# Опис класу для отримання опису проекту за ID
@api.route('/general_description/<int:project_id>')
class GeneralDescriptionResource(Resource):
    @api.doc('get_general_description')
    # @api.marshal_with(general_description_model)
    def get(self, project_id):
        try:
            project = session.query(Projects).filter_by(id=project_id).first()
            if not project:
                return {'message': 'Проект не знайдено'}, 404

            description = session.query(GeneralDescription).filter_by(project_id=project_id).first()
            result = {'project': {
                'id': project.id,
                'name': project.name,
                'description': project.description,
                'detail_level': project.detail_level
            }}

            if description:
                result['general_description'] = {
                    'analysis': description.analysis,
                    'strategy': description.strategy,
                    'product': description.product,
                    'resource': description.resource,
                    'indication': description.indication 
                }

            return result

        except Exception as e:
            return {'message': f'Сталася помилка: {str(e)}'}, 500

    @api.doc('update_general_description')
    @api.expect(general_description_model, validate=True)
    def put(self, project_id):
        try:
            description = session.query(GeneralDescription).filter_by(project_id=project_id).first()
            data = request.json

            if not description:
                description = GeneralDescription(project_id=project_id)
                session.add(description)

            for key, value in data.items():
                if hasattr(description, key) and value is not None:
                    setattr(description, key, value)

            session.commit()

            # Перетворення об'єкта у JSON-формат
            description_dict = {
                "id": description.id,
                "project_id": description.project_id,
                "analysis": description.analysis,
                "strategy": description.strategy,
                "product": description.product,
                "resource": description.resource,
                "indication": description.indication
            }

            return jsonify(description_dict)
        except Exception as e:
            session.rollback()
            return jsonify({'message': f'Сталася помилка: {str(e)}'}), 500


# Опис класу для отримання опису проекту за ID
@api.route('/tmp_general_description/<int:project_id>')
class TMPGeneralDescriptionResource(Resource):
    @api.doc('get_tmp_general_description')
    # @api.marshal_with(tmp_general_description_model)
    def get(self, project_id):
        try:
            description = session.query(TMPGeneralDescription).filter_by(project_id=project_id).first()
            if not description:
                return {'message': 'Опис не знайдено'}, 404

            # project = session.query(Projects).filter_by(id=project_id).first()
            # if not project:
            #     return {'message': 'Проект не знайдено'}, 404

            result = {
                'analysis': description.analysis,
                'strategy': description.strategy,
                'product': description.product,
                'resource': description.resource,
                'indication': description.indication,
                'detail2a_1': description.detail2a_1,
                'detail2a_2': description.detail2a_2,
                'detail2a_3': description.detail2a_3,
                'detail2a_4': description.detail2a_4,
                'detail2a_5': description.detail2a_5,
                'detail2a_6': description.detail2a_6,
                'detail2c_1': description.detail2c_1,
                'detail2c_2': description.detail2c_2,
                'detail2c_3': description.detail2c_3,
                'detail2c_4': description.detail2c_4,
                'detail2c_5': description.detail2c_5,
                'detail2c_6': description.detail2c_6
            }

            return result

        except Exception as e:
            return {'message': f'Сталася помилка: {str(e)}'}, 500

    @api.doc('update_tmp_general_description')
    @api.expect(tmp_general_description_model, validate=True)
    @api.marshal_with(tmp_general_description_model)
    def put(self, project_id):
        try:
            description = session.query(TMPGeneralDescription).filter_by(project_id=project_id).first()
            data = request.json
    
            if not description:
                description = TMPGeneralDescription(project_id=project_id)
                session.add(description)
    
            for key, value in data.items():
                if hasattr(description, key) and value is not None:
                    setattr(description, key, value)
    
            session.commit()
            return description
        except Exception as e:
            session.rollback()
            return {'message': f'Сталася помилка: {str(e)}'}, 500