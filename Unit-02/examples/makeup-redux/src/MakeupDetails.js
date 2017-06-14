import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getRandomMakeup } from './actions'

class MakeupDetails extends Component {
  // make our AJAX call when the component mounts
  componentDidMount () {
    debugger;
    this.props.dispatch(getRandomMakeup())
  }

  render () {
    const { name, brand, price, description, image_link } = this.props
    return (
      <div>
        <section>
          blah
          <h1>{name} - {brand}</h1>
          <h2>{price}</h2>
          <p>{description}</p>
          <img src={image_link} alt=""/>
        </section>
      </div>
    )
  }
}

// after actions are dispatched, add the redux state onto props for the component
const mapStateToProps = (state, ownProps) => {
  debugger;
  return state.makeupData
}

// make sure we connect this component with redux and export it out
export default connect(mapStateToProps)(MakeupDetails)
