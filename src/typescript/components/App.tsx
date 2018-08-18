import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

class App extends React.Component<any, any> {
	public render() {
		const theme: Theme = createMuiTheme();
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="static" color="default">
					<Toolbar>
						<Typography variant="title" color="inherit">
							Wash Ideas - Antani.
						</Typography>
					</Toolbar>
				</AppBar>
			</MuiThemeProvider>
		);
	}
}
export default App;
