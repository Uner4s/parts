import React from 'react'
import autobind from 'autobind-decorator'
import Loading from '../../Loading'

const styles = {
  inputContainer: {
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: 5,
    padding: 8,
    fontSize: 18,
    color: '#a9a9a9',
    backgroundColor: '#fff',
    border: '1px solid #c2c2c2'
  },
  input: {
    cursor: 'pointer',
    display: 'block',
    fontSize: 20,
    filter: 'alpha(opacity=0)',
    minHeight: '100%',
    minWidth: '100%',
    opacity: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    top: 0
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    padding: 10
  }
}

export default class Component extends React.Component {

  static propTypes = {
    placeholder: React.PropTypes.node,
    upload: React.PropTypes.func,
    onChange: React.PropTypes.func
  }

  state = {}

  @autobind
  onChange (event) {
    const file = event.target.files[0]
    if (!file) return
    this.setState({uploading: true, fileName: file.name})
    this.props.upload({
      file,
      onProgress: (progress) => {
        this.setState({progress})
      },
      onReady: (file) => {
        this.props.onChange(file)
      },
      onError: (message) => {
        console.log(message)
        this.setState({uploading: false, errorMessage: message})
      }
    })
  }

  renderInput () {
    return <input type='file' style={styles.input} onChange={this.onChange} />
  }

  renderPlaceholderOrName () {
    if (!this.state.fileName) {
      return this.props.placeholder
    } else {
      const style = this.state.uploading ? {color: '#a9a9a9'} : {color: '#000'}
      return (
        <div style={{...style, ...styles.fileNameContainer}}>
          <div>
            {this.state.fileName}
          </div>
          <div style={styles.loading}>
            <Loading
              size={25}
              mode='determinate'
              color='#0069ff'
              value={this.state.progress * 0.95 * 100 + 5} />
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        <div style={styles.inputContainer}>
          {this.renderPlaceholderOrName()}
          {this.renderInput()}
        </div>
      </div>
    )
  }

}
