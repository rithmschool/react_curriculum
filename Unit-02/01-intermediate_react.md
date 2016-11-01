#### [⇐ Previous](./07-lifecycle.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-unit_1_assessment.md)

# Odds and Ends

### PropTypes

[https://facebook.github.io/react/docs/typechecking-with-proptypes.html](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

```js
import {Component} from 'react'

class App extends Component {
    constructor(name, string){
        super()
        this.name = name
        this.string = string
    }
}

const {string} = React.PropTypes


App.propTypes = {
    name: string.isRequired
    funFact: string.isRequired
}
```

### Structuring Larger React Applications

### Functional Components / Stateless Components


```js
var Component = function (){
    return (
            <div>
                <h1>Hello!</h1>
            </div>
        )
}
```

### Immutability

[https://facebook.github.io/react/docs/optimizing-performance.html#using-immutable-data-structures](https://facebook.github.io/react/docs/optimizing-performance.html#using-immutable-data-structures)

### Context

[https://facebook.github.io/react/docs/context.html](https://facebook.github.io/react/docs/context.html)

#### [⇐ Previous](./07-lifecycle.md) | [Table of Contents](./../readme.md) | [Next ⇒](./09-unit_1_assessment.md)