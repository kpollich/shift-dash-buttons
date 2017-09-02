# Shift Dash Buttons

Sign on/Sign off Slack messages using the power of Amazon Dash Buttons.

## Requirements

* Node 6+
* yarn

## Installation

Fetch dependencies with `yarn`

```sh
$ git clone https://github.com/kpollich/shift-dash-buttons
$ cd shift-dash-buttons
$ yarn
```

Create a `.env` file and provide a JSON string containing MAC addresses for your dash buttons and corresponding names as well as a Slack "Incoming Webhooks" endpoint.

```
IDENTITIES={"68:37:e9:6a:c2:4b": "Jason"}
SLACK_ENDPOINT=https://hooks.slack.com/services/some-url
```

## Usage

Run `index.js` as sudo for access to your default network interface. 

```sh
sudo node index.js
```
