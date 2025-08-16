from peewee import Model, CharField, DateTimeField, ForeignKeyField, TextField, IntegerField, BooleanField, DecimalField, BlobField, DateField, TimeField, FloatField, UUIDField, BigIntegerField, SqliteDatabase

db = SqliteDatabase('ma_base.db')

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


class Classes(BaseModel):
    name = CharField()
    user = ForeignKeyField(Proffesseurs_Users, backref='classes')


class Eleves(BaseModel):

    first_name = CharField()
    last_name = CharField()
    email = CharField()
    classe = ForeignKeyField(Classes, backref='eleves')
    
