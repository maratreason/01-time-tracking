import React, { Component } from "react"

class TimerForm extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    title: this.props.title || "",
    // eslint-disable-next-line react/destructuring-assignment
    project: this.props.project || "",
  }

  onChangeInput = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onCreateFormHandle = () => {
    const { onAddTimerHandle } = this.props

    onAddTimerHandle(this.state)
    this.setState({ title: "", project: "" })
    this.onCancelFormHandle()
  }

  onUpdateFormHandle = () => {
    const { onUpdateTimerHandle, onOpenTimer, id } = this.props

    onUpdateTimerHandle(id, this.state)
    this.setState({ title: "", project: "" })
    onOpenTimer()
  }

  onCancelFormHandle = () => {
    const { onOpenTimer, isCloseFormHandle } = this.props

    onOpenTimer && onOpenTimer()
    isCloseFormHandle && isCloseFormHandle()
  }

  render() {
    const { title, project } = this.state
    const { title: propsTitle, project: propsProject } = this.props

    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label htmlFor="title">Title</label>
              <input
                name="title"
                type="text"
                onChange={e => this.onChangeInput(e)}
                value={title}
              />
            </div>
            <div className="field">
              <label htmlFor="project">Project</label>
              <input
                name="project"
                type="text"
                onChange={e => this.onChangeInput(e)}
                value={project}
              />
            </div>
            <div className="ui two bottom attached buttons">
              {propsTitle || propsProject ? (
                <button
                  type="button"
                  className="ui basic blue button"
                  onClick={this.onUpdateFormHandle}
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  className="ui basic blue button"
                  onClick={this.onCreateFormHandle}
                >
                  Create
                </button>
              )}

              <button
                type="button"
                className="ui basic red button"
                onClick={this.onCancelFormHandle}
              >
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
