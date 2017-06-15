import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getRandomMakeup, getRandomColor } from './actions'

class MakeupDetails extends Component {
  // make our AJAX call when the component mounts
  componentDidMount () {
    this.props.dispatch(getRandomMakeup())
    setInterval(() => {
      this.props.dispatch(getRandomColor())      
    }, 3000);
  }

  render () {
    const { name, brand, price, description, image_link, color } = this.props;
    const c = color ? color : "red";
    
    return (
      <div className='color' style={{backgroundColor: c}}>
        Let's see a random makeup product!
        <section>
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
  return {...state.makeupData, ...state.randomColor}
}

// make sure we connect this component with redux and export it out
export default connect(mapStateToProps)(MakeupDetails)
