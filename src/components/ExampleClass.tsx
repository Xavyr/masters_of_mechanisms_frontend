import * as React from "react";

type Props = {
  compiler: string;
  framework: string;
};

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class ExampleClass extends React.Component<Props, {}> {
  grabData = () => {
    console.log("GOT HERE");
  };

  render() {
    return (
      <h1>
        whateaflsdkjflkasdjfgksajflkj have left to live {this.props.compiler}{" "}
        and {this.props.framework}!<p>hello</p>
        <button onClick={this.grabData}>Click Me</button>
      </h1>
    );
  }
}

//home page-- scroling the about- why tools of the titans exist, scroling thorugh images from kaitlin
//https://www.impactblacksheepagency.com/
//https://webflow.com/blog/19-web-design-trends-for-2018
//https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862
