import React, { Component } from "react"

class TimerForm extends Component {
  state = {
    // you could add this rule in .eslintrc config
    // eslint-disable-next-line react/destructuring-assignment
    title: this.props.title || "",
    // eslint-disable-next-line react/destructuring-assignment
    project: this.props.project || "",
  }

  // don't reduce the name of variable even if it's obvious
  // use event instead of e
  onChangeInput = e => {
    const { name, value } = e.target
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
    // why do you use it here?
    // you already initialize your state with default values
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
                // you always create a new object here
                // better make an extra method and put only the link here
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
