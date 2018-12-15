import {
	Button,
	Divider,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	List,
	ListItem,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as React from "react";
import { container } from "../../../test/typescript/ioc/inversify.config";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { IUser } from "../models/IUser";
import { Types } from "../repository/Symbols";
import Extender from "../util/Extender";
import Localization from "../util/Localization";

interface IFormState {
	showToken: boolean;
	configuration: IGitRepositoryConfiguration;
	user: IUser;
}

class ConfigurationForm extends React.Component<any, IFormState> {
	constructor(props: any) {
		super(props);
		this.handleClickShowToken = this.handleClickShowToken.bind(this);
		this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.initContext = this.initContext.bind(this);

		this.state = {
			showToken: false,
			configuration: {
				type: "git",
				dir: "wash-ideas",
				url: "https://github.com/kLeZ/wash-ideas",
				oauth2format: "github",
				token: "",
				branch: "data",
				fsconf: { fs: "IndexedDB", options: {} },
			},
			user: {
				name: "kLeZ",
				email: "julius8774@gmail.com",
			},
		};
	}

	public handleClickShowToken() {
		this.setState(s => ({ showToken: !s.showToken }));
	}

	public handleConfigurationChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) {
		this.setState(s => ({
			configuration: Extender.extends(s.configuration, { [event.target.name]: event.target.value }),
		}));
	}

	public handleUserChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
		this.setState(s => ({
			user: Extender.extends(s.user, { [event.target.name]: event.target.value }),
		}));
	}

	public initContext(): void {
		const ctx: IContext = {
			user: this.state.user,
			configuration: this.state.configuration,
		};
		container.bind<IContext>(Types.CONTEXT).toConstantValue(ctx);
	}

	public render() {
		const l10n = container
			.get<Localization>(Types.LOCALIZATION)
			.t("app.configuration_form", { returnObjects: true });
		return (
			<List style={{ width: 350 }}>
				<ListItem>
					<TextField
						id="name"
						name="name"
						label={l10n.name_label}
						placeholder={l10n.name_label}
						value={this.state.user.name}
						onChange={this.handleUserChange}
						margin="normal"
					/>
				</ListItem>
				<ListItem>
					<TextField
						id="email"
						name="email"
						label={l10n.email_label}
						placeholder={l10n.email_label}
						value={this.state.user.email}
						onChange={this.handleUserChange}
						margin="normal"
					/>
				</ListItem>
				<Divider />
				<ListItem>
					<TextField
						id="url"
						name="url"
						label={l10n.url_label}
						placeholder={l10n.url_label}
						value={this.state.configuration.url}
						onChange={this.handleConfigurationChange}
						margin="normal"
					/>
				</ListItem>
				<ListItem>
					<InputLabel htmlFor="oauth2format">{l10n.oauth2format_label}</InputLabel>
					<Select
						value={this.state.configuration.oauth2format}
						onChange={this.handleConfigurationChange}
						placeholder={l10n.oauth2format_label}
						inputProps={{
							name: "oauth2format",
							id: "oauth2format",
						}}
					>
						{/* proper names of services, no need to l6e */}
						<MenuItem value="github">GitHub</MenuItem>
						<MenuItem value="bitbucket">BitBucket</MenuItem>
						<MenuItem value="gitlab">GitLab</MenuItem>
					</Select>
				</ListItem>
				<ListItem>
					<InputLabel htmlFor="token">{l10n.token_label}</InputLabel>
					<Input
						id="token"
						name="token"
						type={this.state.showToken ? "text" : "password"}
						value={this.state.configuration.token}
						onChange={this.handleConfigurationChange}
						placeholder={l10n.token_label}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label={l10n.token_visibility_label}
									onClick={this.handleClickShowToken}
								>
									{this.state.showToken ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</ListItem>
				<Divider />
				<Button>{l10n.load_button_text}</Button>
			</List>
		);
	}
}
export default ConfigurationForm;
