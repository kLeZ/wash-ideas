import { IContext } from "../../../src/typescript/models/IContext";
import { ContextType } from "../../../src/typescript/repository/Symbols";
import { container } from "../ioc/inversify.config";
import { GitHubContextMock } from "../models/RepositoryConfigurationMock";

describe("Test for inversify API generic usage", () => {
	beforeEach(() => {
		container.snapshot();
	});

	afterEach(() => {
		container.restore();
	});

	it("Test context bind on the fly", async () => {
		let ctx: IContext = new GitHubContextMock();
		container.bind<IContext>(ContextType.DEFAULT).toConstantValue(ctx);
		ctx = container.get<IContext>(ContextType.DEFAULT);
		expect(ctx.user.name).toBe("Alessandro Accardo");
		ctx.user.name = "Fabio Scotto di Santolo";
		ctx = container.get<IContext>(ContextType.DEFAULT);
		expect(ctx.user.name).toBe("Fabio Scotto di Santolo");
	});
});
