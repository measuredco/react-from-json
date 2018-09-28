import React, { Component } from "react";

import ReactFromJSON from "react-from-json";
import { Pane, Button, Text, Heading } from "evergreen-ui";
import SyntaxHighlighter from "react-syntax-highlighter";

const entry = {
  type: "Pane",
  props: {
    background: "tint2",
    padding: 16,
    children: [
      {
        type: "Heading",
        props: {
          size: 600,
          children: "react-from-json Demo Page"
        }
      },
      {
        type: "Text",
        props: {
          children:
            "This page is being rendered by `react-from-json` using evergreen-ui and the following JSON"
        }
      },
      {
        type: "SyntaxHighlighter",
        props: {
          language: "json",
          children:
            '{\n  "type":"Pane",\n  "props":{\n    "background":"tint2",\n    "padding":16,\n    "children":[\n      {\n        "type":"Heading",\n        "props":{\n          "size":600,\n          "children":"react-from-json Demo Page"\n        }\n      },\n      {\n        "type":"Text",\n        "props":{\n          "children":"This page is being rendered by `react-from-json` using evergreen-ui and the following JSON"\n        }\n      },\n      {\n        "type":"SyntaxHighlighter",\n        "props":{\n          "language":"json",\n          "children":\'{\\n  "type":"Pane",\\n  "props":{\\n    "background":"tint2",\\n    "padding":16,\\n    "children":[\\n      {\\n        "type":"Heading",\\n        "props":{\\n          "size":600,\\n          "children":"react-from-json Demo Page"\\n        }\\n      },\\n      {\\n        "type":"Text",\\n        "props":{\\n          "children":"This page is being rendered by `react-from-json` using evergreen-ui and the following JSON"\\n        }\\n      },\\n      {\\n        "type":"SyntaxHighlighter",\\n        "props":{\\n          "language":"json",\\n          "children":""\\n        }\\n      },\\n      {\\n        "type":"Button",\\n        "props":{\\n          "children":"That\'s awesome!"\\n        }\\n      }\\n    ]\\n  }\\n}\'\n        }\n      },\n      {\n        "type":"Button",\n        "props":{\n          "children":"That\'s awesome!"\n        }\n      }\n    ]\n  }\n}'
        }
      },
      {
        type: "Button",
        props: {
          children: "That's awesome!"
        }
      }
    ]
  }
};

const mapping = {
  Pane,
  Text,
  Button,
  Heading,
  SyntaxHighlighter
};

export default class App extends Component {
  render() {
    return (
      <div>
        <ReactFromJSON entry={entry} mapping={mapping} />
      </div>
    );
  }
}
