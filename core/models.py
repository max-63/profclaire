from peewee import Model, CharField, DateTimeField, ForeignKeyField, TextField, IntegerField, BooleanField, DecimalField, BlobField, DateField, TimeField, FloatField, UUIDField, BigIntegerField, SqliteDatabase

db = SqliteDatabase('ma_base.db')

class BaseModel(Model):
    class Meta:
        database = db

class Proffesseurs_Users(BaseModel):
    id = IntegerField(primary_key=True)
    username = CharField()
    password = CharField()
    email = CharField()
    first_name = CharField()
    last_name = CharField()
    is_admin = BooleanField(default=False)
    hash = CharField()

    class Meta:
        table_name = 'proffesseurs_users'
    
class Eleves(BaseModel):
    id = IntegerField(primary_key=True)
    first_name = CharField()
    last_name = CharField()
    email = CharField()
    class_id = IntegerField()
    
    class Meta:
        table_name = 'eleves'

class Classes(BaseModel):
    id = IntegerField(primary_key=True)
    name = CharField()
    user = ForeignKeyField(Proffesseurs_Users, backref='classes')

    class Meta:
        table_name = 'classes'