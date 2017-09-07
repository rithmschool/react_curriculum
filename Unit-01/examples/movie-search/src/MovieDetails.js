import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getRandomMovie } from './actions'

class MovieDetails extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount () {
    this.props.dispatch(getRandomMovie())
  }

  render () {
    const { Title, Plot, Year, Poster } = this.props
    return (
      <div>
        <section>
          <h1>{Title}</h1>
          <h2>{Year}</h2>
          <p>{Plot}</p>
          <img src={Poster} alt=""/>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.omdbData
}

export default connect(mapStateToProps)(MovieDetails)