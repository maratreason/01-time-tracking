import React, { Component } from "react"

class TimerForm extends Component {

  state = {
    title: this.props.title || '',
    project: this.props.project || ''
  }

  onChangeInput = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onCreateFormHandle = () => {
    this.props.onAddTimerHandle({...this.state})
    this.setState({ title: '', project: '' })
    this.onCancelFormHandle()
  }

  onUpdateFormHandle = (id) => {
    this.props.onUpdateTimerHandle({...this.state})
    this.setState({ title: '', project: '' })
    this.props.onToggleFormHandle()
  }

  onCancelFormHandle = () => {
    this.props.onToggleFormHandle()
  }

  render() {
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input
                name='title'
                type='text'
                onChange={(e) => this.onChangeInput(e)}
                value={this.state.title}
              />
            </div>
            <div className='field'>
              <label>Project</label>
              <input
                name='project'
                type='text'
                onChange={(e) => this.onChangeInput(e)}
                value={this.state.project}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              {
                this.props.title || this.props.project
                ? <button className='ui basic blue button' onClick={this.onUpdateFormHandle}>
                    Update
                  </button>
                : <button className='ui basic blue button' onClick={this.onCreateFormHandle}>
                    Create
                  </button>
              }

              <button className='ui basic red button' onClick={this.onCancelFormHandle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TimerForm