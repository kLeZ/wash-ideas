import { SwipeableDrawer } from "@material-ui/core";
import * as React from "react";

export interface ISideBarState {
	open: boolean;
	side: "left" | "top" | "right" | "bottom";
	children?: JSX.Element | JSX.Element[];
}

class SideBar extends React.Component<ISideBarState, ISideBarState> {
	constructor(props: ISideBarState) {
		super(props);
		this.state = {
			open: props.open,
			side: props.side,
			children: props.children,
		};
	}

	public toggleSideBar(open?: boolean): void {
		this.setState(s => ({ open: open || !s.open }));
	}

	public render(): JSX.Element {
		return (
			<SwipeableDrawer
				anchor={this.state.side}
				open={this.state.open}
				onClose={() => this.toggleSideBar(false)}
				onOpen={() => this.toggleSideBar(true)}
			>
				{this.state.children}
			</SwipeableDrawer>
		);
	}
}
export default SideBar;
