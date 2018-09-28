import { IContext } from "../../../src/typescript/models/IContext";
import { IGitRepositoryConfiguration } from "../../../src/typescript/models/IGitRepositoryConfiguration";
import { Types } from "../../../src/typescript/repository/Symbols";
import { container } from "../ioc/inversify.config";

describe("Test for inversify API generic usage", () => {
	beforeEach(() => {
		container.snapshot();
	});

	afterEach(() => {
		container.restore();
	});

	it("Test context bind on the fly", async () => {
		const configuration: IGitRepositoryConfiguration = {
			type: "git",
			dir: "wash-ideas",
			branch: "data",
			url: "https://github.com/kLeZ/wash-ideas",
			oauth2format: "github",
			token: "",
			fsconf: { fs: "InMemory", options: {} }
		};
		let ctx: IContext = {
			user: {
				name: "Alessandro Accardo",
				email: "julius8774@gmail.com"
			},
			configuration
		};
		container.bind<IContext>(Types.CONTEXT).toConstantValue(ctx);
		ctx = container.get<IContext>(Types.CONTEXT);
		expect(ctx.user.name).toBe("Alessandro Accardo");
		ctx.user.name = "Fabio Scotto di Santolo";
		ctx = container.get<IContext>(Types.CONTEXT);
		expect(ctx.user.name).toBe("Fabio Scotto di Santolo");
	});
});
