import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getMakeup, getBackgroundColor } from './actions'

class MakeupDetails extends Component {
  // make our AJAX call when the component mounts
  componentDidMount () {
    // debugger;
    // when we call dispatch on getRandomMakeup, we get action(dispatch, getState, extraArgument)
    this.props.getMakeup()
  }

  componentDidUpdate () {
    const { product_colors } = this.props;
    // product_colors is an array of 6 objects, each with key hex_value

    if(product_colors) {
      var itemColors = product_colors.map((color) => color.hex_value);
      // itemColors = ["#ba0000", "#ff6ab6", "#ff3b00", "#ff4a62", "#ff2e8c", "#f9005b"]
    }

    setTimeout(() => {
      this.props.getBackgroundColor(itemColors);
    }, 5000);
  }

  render () {
    // debugger;
    const { name, brand, price, description, image_link, backgroundColor} = this.props
    console.log("rendering", this.props);
    
    return (
      <div style={{"backgroundColor": backgroundColor}}>
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
  return {...state.makeupData, ...state.backgroundColor, ...ownProps}
}

// make sure we connect this component with redux and export it out
// the second argument is mapDispatchToProps
export default connect(mapStateToProps, { getMakeup, getBackgroundColor })(MakeupDetails)
