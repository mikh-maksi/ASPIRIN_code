from app import app
from models import *
from flask_marshmallow import Marshmallow

ma = Marshmallow(app)

class ProjectsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Projects
        fields = (
            'id', 
            'name', 
            'description', 
            'detail_level',
            'general_description'
        )

    general_description = ma.Nested(lambda: GeneralDescriptionSchema())

class GeneralDescriptionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = GeneralDescription
        fields = (
            'id',
            'project_id',
            'analysis',
            'strategy',
            'product',
            'resource',
            'indication'
        )

class TMPGeneralDescriptionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TMPGeneralDescription
        fields = (
            'id',
            'project_id',
            'analysis',
            'strategy',
            'product',
            'resource',
            'indication',
            'detail2a_1',
            'detail2a_2',
            'detail2a_3',
            'detail2a_4',
            'detail2a_5',
            'detail2a_6',
            'detail2c_1',
            'detail2c_2',
            'detail2c_3',
            'detail2c_4',
            'detail2c_5',
            'detail2c_6'
        )

projects_schema = ProjectsSchema()
projects_schema = ProjectsSchema(many=True)

