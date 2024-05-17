the authentication state (token and user information) is not being persisted across app reloads. To solve this, you need to persist the authentication state in local storage and retrieve it when the app loads.

AppWrapper: Load the token and user data when the app starts.

InitialRouteName: Set the initial route based on whether the token is present.