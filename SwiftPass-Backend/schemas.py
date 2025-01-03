from marshmallow import Schema, fields
import marshmallow as ma

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username= fields.Str(required=True)
    fullname = fields.Str(required=True)
    password = fields.Str(required=True)
    timestamp = ma.fields.DateTime()

class UserUpdateSchema(Schema):
    username = fields.Str()
    fullname = fields.Str()

class UserLoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)

    
    