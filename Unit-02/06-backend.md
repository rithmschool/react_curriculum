#### [⇐ Previous](./05-redux_continued.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-react_native.md)

# Backend with React

### Objectives

By the end of this chapter, you should be able to:

- Build an API that a react front-end can consume
- Connect client side routing with an API

### Folder Structure

### Routing

To connect our flask app let's start with a simple backend application

```py
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
```



### Including react-router browserHistory

### Authentication

### Exercise

#### [⇐ Previous](./05-redux_continued.md) | [Table of Contents](./../readme.md) | [Next ⇒](./07-react_native.md)