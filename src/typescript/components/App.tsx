// Copyright (C) 2018 Alessandro Accardo a.k.a. kLeZ & Fabio Scotto di Santolo a.k.a. Plague
//
// This file is part of Wash Ideas.
//
// Wash Ideas is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Wash Ideas is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Wash Ideas.  If not, see <http://www.gnu.org/licenses/>.
//

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
	createMuiTheme,
	MuiThemeProvider,
	Theme
} from "@material-ui/core/styles";
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
