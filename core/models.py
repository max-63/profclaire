from peewee import (
    Model,
    CharField,
    ForeignKeyField,
    BooleanField,
    SqliteDatabase,
)

db = SqliteDatabase("ma_base.db")


class BaseModel(Model):
    class Meta:
        database = db


class Proffesseurs_Users(BaseModel):
    username = CharField(unique=True)
    password = CharField()
    email = CharField(unique=True)
    first_name = CharField()
    last_name = CharField()
    is_admin = BooleanField(default=False)


class Anee_scolaire(BaseModel):
    annee = CharField(unique=True)
    debut = CharField()
    fin = CharField()
    is_active = BooleanField(default=False)


class Classes(BaseModel):
    name = CharField()
    user = ForeignKeyField(Proffesseurs_Users, backref="classes")
    annee = ForeignKeyField(Anee_scolaire, backref="classes")


class Eleves(BaseModel):
    first_name = CharField()
    last_name = CharField()
    classe = ForeignKeyField(Classes, backref="eleves")
    photo = CharField(null=True)
