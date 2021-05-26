# openvpn3-linux-client-wrapper
A tiny wrapper for the official openvpn3 Linux client. It provides a few
user-friendly commands to start a session, stop a session, and get status
of an active session.

![jest style autocomplete prompt in action](./media/script_in_action.gif)

## Prerequisites
* Make sure you have [openvpn3 Linux client](https://github.com/OpenVPN/openvpn3-linux) installed.
* Make sure you have `Node.js` installed.
* openvpn connection profile file. i.e `client.ovpn`

## Setup
1. Navigate to the [release page](https://github.com/m-sureshraj/openvpn3-client-wrapper/releases) and download the latest version of the source code.
2. Extract the source and copy the `dist/client.js` to wherever you want.
3. Add the following commands to the shell profile. 
   i.e `~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`

    ```shell
    export VPN_PROFILE_PATH=</path/to/openvpn/connection/profile>
    alias vpn='/path/to/downloaded/client.js'
    ```
   
   `VPN_PROFILE_PATH` - Absolute path to the openvpn connection profile file.
   
   `alias vpn` - The entry point to the script. By default, the alias name is `vpn` 
   but, you can name it whatever you want. The value should be an absolute path 
   to the downloaded `client.js`. **(step 2)**

4. Source the modified shell profile. e.g. `source .zshrc`

Optionally, you can provide auth credentials (username & password) to the above 
script to autofill when the start command (to start a new VPN session) prompts 
for credentials.

```shell
alias vpn='/path/to/downloaded/client.js username=foo password="abc123"'
```

**Note** - If the username or password contains special characters, then you 
should escape it to prevent parameter expansion. e.g.

`password=foo$d` => `password=foo\$d`

## Usage
```
Usage: vpn [options]

options:
start   -   start a new session
stop    -   stop the current session
status  -   print the session status
```

## License
MIT License © [Sureshraj](https://github.com/m-sureshraj)
