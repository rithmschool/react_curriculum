from project import app
import os

debug = os.environ.get('DEBUG') or True

if __name__ == '__main__':
    app.run(debug=debug)