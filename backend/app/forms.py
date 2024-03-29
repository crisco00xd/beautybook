from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Email

class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember_me = BooleanField("Remember Me")  # Add this line
    submit = SubmitField("Login")

    class Meta:
        csrf = False

    @classmethod
    def from_json(cls, data):
        form = cls()
        for field_name, field in form._fields.items():
            field.data = data.get(field_name)
        return form

class RegisterForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    phone = StringField("Phone", validators=[DataRequired()])
    submit = SubmitField("Register")

    class Meta:
        csrf = False

    @classmethod
    def from_json(cls, data):
        form = cls()
        for field_name, field in form._fields.items():
            field.data = data.get(field_name)
        return form
