// see also: https://dev.to/karan316/build-forms-using-react-the-easy-way-with-typescript-46bh
import React from "react";

export interface Properties {
  name: string;
}

export interface State {
  inputName: string;
  textareaDescription: string;
  selectChoice: string;
  inputEnable: boolean;
  inputNumber: number;
}

export default class FormComponent extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);

    this.state = {
      inputName: "",
      textareaDescription: "",
      selectChoice: "red-pill",
      inputEnable: true,
      inputNumber: 42,
    };
  }

  override render() {
    return (
      <div>
        This is form component: {this.props.name}:
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={this.state.inputName}
                onChange={this.handleInputNameChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                value={this.state.textareaDescription}
                onChange={this.handleTextareaDescriptionChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label>
              Choice:
              <select
                value={this.state.selectChoice}
                onChange={this.handleSelectChoiceChange.bind(this)}
              >
                <option value="red-pill">
                  You stay in Wonderland, and I show you how deep the rabbit
                  hole goes.
                </option>
                <option value="blue-pill">STM32F103C8T6</option>
                <option value="black-pill">STM32F411CEU6</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Number:
              <input
                type="checkbox"
                name="enabled"
                defaultChecked={this.state.inputEnable}
                onChange={this.handleInputMultipleChange.bind(this)}
              />
              <input
                type="number"
                name="number"
                disabled={!this.state.inputEnable}
                value={this.state.inputNumber}
                onChange={this.handleInputMultipleChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }

  private handleInputNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("Input `name` change: `%s`", event.target.value);
    this.setState({ inputName: event.target.value });
  }

  private handleTextareaDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    console.log("Textarea `description` change: `%s`", event.target.value);
    this.setState({ textareaDescription: event.target.value });
  }

  private handleSelectChoiceChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    console.log("Select `choice` change: `%s`", event.target.value);
    this.setState({ selectChoice: event.target.value });
  }

  private handleInputMultipleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    console.log(
      "Input `%s` change: `%s`",
      event.target.name,
      event.target.value,
    );
    if (event.target.type === "checkbox") {
      this.setState({ inputEnable: event.target.checked });
    } else {
      const value = event.target.value as unknown as number;
      this.setState({ inputNumber: value });
    }
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert(
      `The form has been submitted!\n\name: \`${this.state.inputName}\`\n\ndescription:\n${this.state.textareaDescription}\n\nchoice: \`${this.state.selectChoice}\``,
    );
    // prevents taking the default action associated with the (submit) event
    event.preventDefault();
  }
}
