import React from 'react'
import autobind from 'autobind-decorator'
import getHeight from './getHeight'

export default class Textarea extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    fieldType: React.PropTypes.string,
    passProps: React.PropTypes.object,
    placeholder: React.PropTypes.node,
    errorMessage: React.PropTypes.node,
    autoResize: React.PropTypes.bool
  }

  static defaultProps = {
    autoResize: true
  }

  state = {height: 41}

  @autobind
  autoResize (event) {
    if (!this.props.autoResize) return
    const {height} = getHeight(this.refs.input)
    if (this.state.height !== height) {
      this.setState({height})
    }
  }

  @autobind
  onChange (event) {
    this.props.onChange(event.target.value)
    this.autoResize(event)
  }

  render () {
    return (
      <div>
        <div className='os-input-container'>
          <textarea
            ref='input'
            className='os-input-text'
            rows={1}
            style={{height: this.state.height}}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.onChange}
            {...this.props.passProps} />
        </div>
        <div className='os-input-error'>{this.props.errorMessage}</div>
      </div>
    )
  }

}
