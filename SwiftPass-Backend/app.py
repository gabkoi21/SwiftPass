from flask import Flask
from flask_smorest import Api
from flask_migrate import Migrate
import secrets
import os
import models
from flask_jwt_extended import JWTManager
from blocklist import BLOCKLIST
from flask import jsonify

# These are the file from the resources folder
from db import db
# from resources.posts import blp as PostsBlueprint
from resources.user import blp as UsersBlueprint

def create_app(db_url=None):
    app = Flask(__name__)
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config[
        "OPENAPI_SWAGGER_UI_URL"
    ] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or "sqlite:///database.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    db.init_app(app)
    Migrate(app, db)
    api = Api(app)
    
    # This is the configuration for the JWT
    app.config["JWT_SECRET_KEY"] = "jose"
    jwt = JWTManager(app)
    
    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        return jwt_payload["jti"] in BLOCKLIST

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return (
            jsonify(
            {"description": "The token has been revoked.", "error": "token_revoked"}
            ),
            401,
        )
        
    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback(jwt_header, jwt_payload):
            return (
            jsonify(
                {
                "description": "The token is not fresh.",
                "error": "fresh_token_required"
                }
            ),
            401,
            )

    with app.app_context():
        db.create_all()

    api.register_blueprint(UsersBlueprint)
    
    return app
