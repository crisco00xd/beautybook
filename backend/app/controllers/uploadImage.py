import os
from werkzeug.utils import secure_filename
from flask import request, jsonify


def save_image(file, filename):
    assets_folder = 'assets'
    if not os.path.exists(assets_folder):
        os.makedirs(assets_folder)

    filepath = os.path.join(assets_folder, secure_filename(filename))
    file.save(filepath)
    return filepath
