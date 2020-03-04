import React, { Component } from "react"

class TimerForm extends Component {
  state = {
    title: this.props.title || "",
    project: this.props.project || "",
  }

  onChangeInput = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  onCreateFormHandle = () => {
    const { addTimer } = this.props

    addTimer(this.state)
    this.setState({ title: "", project: "" })
    this.onCancelFormHandle()
  }

  onUpdateFormHandle = () => {
    const { updateTimer, onOpenTimer, id } = this.props

    updateTimer(id, this.state)
    this.setState({ title: "", project: "" })
    onOpenTimer()
  }

  onCancelFormHandle = () => {
    const { onOpenTimer, closeForm } = this.props

    onOpenTimer && onOpenTimer()
    closeForm && closeForm()
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
                onChange={this.onChangeInput}
                value={title}
              />
            </div>
            <div className="field">
              <label htmlFor="project">Project</label>
              <input
                name="project"
                type="text"
                onChange={this.onChangeInput}
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
