import {
	Button,
	Divider,
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	List,
	ListItem,
	NativeSelect,
	TextField,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as React from "react";
import { container } from "../ioc/inversify.config";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { IUser } from "../models/IUser";
import { Types } from "../repository/Symbols";
import Extender from "../util/Extender";
import Localization from "../util/Localization";
import { logComponent } from "../util/Logging";
import { OAuth2Format } from "../util/OAuth2Format";

interface IConfigurationFormState {
	showToken: boolean;
	configuration: IGitRepositoryConfiguration;
	user: IUser;
}

interface IConfigurationFormProps {
	loadCallback: () => void;
}

class ConfigurationForm extends React.Component<IConfigurationFormProps, IConfigurationFormState> {
	private l10n: any;
	private cb: () => void;

	constructor(props: IConfigurationFormProps) {
		super(props);
		this.cb = props.loadCallback;

		this.handleClickShowToken = this.handleClickShowToken.bind(this);
		this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.initContext = this.initContext.bind(this);

		this.l10n = container
			.get<Localization>(Types.LOCALIZATION)
			.t("app.configuration_form", { returnObjects: true });
		logComponent.trace(JSON.stringify(this.l10n));

		this.state = {
			showToken: false,
			configuration: {
				type: "git",
				dir: "wash-ideas",
				url: "https://github.com/kLeZ/wash-ideas",
				oauth2format: OAuth2Format.GitHub,
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

	public handleConfigurationChange(name: string) {
		return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			if (event.target != null) {
				const prev = JSON.stringify(this.state.configuration);
				logComponent.debug(`configuration change :: [${name}]: ${event.target.value} :: prev: ${prev}`);
				this.setState({
					configuration: Extender.extends(Extender.Default, {}, this.state.configuration, {
						[name]: event.target.value,
					}),
				});
			}
		};
	}

	public handleUserChange(name: string) {
		return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			if (event.target != null) {
				const prev = JSON.stringify(this.state.user);
				logComponent.debug(`user change :: [${name}]: ${event.target.value} :: prev: ${prev}`);
				this.setState({
					user: Extender.extends(Extender.Default, {}, this.state.user, { [name]: event.target.value }),
				});
			}
		};
	}

	public initContext(): void {
		const ctx: IContext = {
			user: this.state.user,
			configuration: this.state.configuration,
		};
		logComponent.debug(`Binding Context :: ${JSON.stringify(ctx)}`);
		container.bind<IContext>(Types.CONTEXT).toConstantValue(ctx);
		this.cb();
	}

	public render() {
		return (
			<List className="configuration-form-list">
				<ListItem>
					<TextField
						id="name"
						label={this.l10n.name_label}
						defaultValue={this.state.user.name}
						onChange={this.handleUserChange("name")}
						fullWidth
					/>
				</ListItem>
				<ListItem>
					<TextField
						id="email"
						label={this.l10n.email_label}
						defaultValue={this.state.user.email}
						onChange={this.handleUserChange("email")}
						fullWidth
					/>
				</ListItem>
				<Divider />
				<ListItem>
					<TextField
						id="url"
						label={this.l10n.url_label}
						defaultValue={this.state.configuration.url}
						onChange={this.handleConfigurationChange("url")}
						fullWidth
					/>
				</ListItem>
				<ListItem>
					<FormControl fullWidth>
						<InputLabel shrink htmlFor="oauth2format-compo">
							{this.l10n.oauth2format_label}
						</InputLabel>
						<NativeSelect
							value={this.state.configuration.oauth2format}
							onChange={this.handleConfigurationChange("oauth2format")}
							inputProps={{
								id: "oauth2format-compo",
								name: "oauth2format",
							}}
							fullWidth
						>
							{/* proper names of services, no need to l6e */}
							<option value="github">GitHub</option>
							<option value="test">Test</option>
							{/* FIXME: not supported yet
							<option value="bitbucket">BitBucket</option>
							<option value="gitlab">GitLab</option>
							*/}
						</NativeSelect>
					</FormControl>
				</ListItem>
				<ListItem>
					<FormControl fullWidth>
						<InputLabel shrink htmlFor="token-compo">
							{this.l10n.token_label}
						</InputLabel>
						<Input
							id="token-compo"
							name="token"
							type={this.state.showToken ? "text" : "password"}
							defaultValue={this.state.configuration.token}
							onChange={this.handleConfigurationChange("token")}
							placeholder={this.l10n.token_label}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label={this.l10n.token_visibility_label}
										onClick={this.handleClickShowToken}
									>
										{this.state.showToken ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</ListItem>
				<Divider />
				<Button variant="contained" onClick={this.initContext} className="cta-ok">
					{this.l10n.load_button_text}
				</Button>
			</List>
		);
	}
}
export default ConfigurationForm;
