from flask.views import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash import pbkdf2_sha256


from db import db
from schemas import UserSchema
from schemas import UserUpdateSchema
from models import UserModel

blp = Blueprint("users", __name__, description="Operations on users")

@blp.route("/register")
class UserRegister(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        if UserModel.query.filter(UserModel.email == user_data["email"]).first():
            abort(409, message="A user with that email already exists.")

        user = UserModel(
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            fullname=user_data["fullname"],
        )
        db.session.add(user)
        db.session.commit()

        return {"message": "User created successfully."}, 201
    
    
    
@blp.route("/user/<int:user_id>")
class user(MethodView):
    @blp.response(200, UserSchema)
    def get(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        return user
    
    
    @blp.arguments(UserUpdateSchema)
    @blp.response(200, UserSchema)
    def put(self, user_data, user_id):
        user = UserModel.query.get_or_404(user_id)
        user.email = user_data["email"]
        user.fullname = user_data["fullname"]
        db.session.commit() 
        return user
    
    @blp.response(204)
    def delete(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        
        return {"message": "User deleted successfully."}, 201