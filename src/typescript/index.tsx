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

import * as React from "react";
import { render } from "react-dom";
import "typeface-roboto";
import "../scss/main.scss";
import App from "./components/App";
import { container } from "./ioc/inversify.config";
import { IPersistible } from "./models/IPersistible";
import { GitHubRepository } from "./repository/GithubRepository";
import { IRepository } from "./repository/IRepository";
import { Types } from "./repository/Symbols";
import { TestRepository } from "./repository/TestRepository";
import { GitClient } from "./util/GitClient";
import { IGitClient } from "./util/IGitClient";
import { resources } from "./util/Locales";
import Localization from "./util/Localization";
import { logUtils } from "./util/Logging";

container.bind<IGitClient>(Types.GIT_CLIENT).to(GitClient);
container.bind<IRepository<IPersistible>>("test").to(TestRepository).inSingletonScope();
container.bind<IRepository<IPersistible>>("github").to(GitHubRepository);
container.bind<Localization>(Types.LOCALIZATION).toConstantValue(new Localization(resources));

const i18n = container.get<Localization>(Types.LOCALIZATION);
logUtils.debug(i18n.t("main.test"));
logUtils.debug(JSON.stringify(i18n.t("app.configuration_form", { returnObjects: true })));

render(<App />, document.getElementById("root"));
