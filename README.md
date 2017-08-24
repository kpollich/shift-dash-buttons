# Shift Dash Buttons

Sign on/Sign off Slack messages using the power of Amazon Dash Buttons.

## Installation

Fetch dependencies with `yarn`

```sh
$ git clone https://github.com/kpollich/shift-dash-buttons
$ cd shift-dash-buttons
$ yarn
```

Create a `.env` file and provide a comma separated list of MAC addresses for your dash button(s).

```
MAC_ADDRESSES=68:54:fd:e2:c6:0a,12:41:ff:d4:e2:0b
```

## Usage

Run `index.js` as sudo for access to your default network interface. 

```sh
sudo node index.js
```