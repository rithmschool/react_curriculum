from project import app
import os

debug = os.environ.get('DEBUG') or True
port = os.environ.get('PORT') or 3001

if __name__ == '__main__':
    app.run(debug=debug, port=port)