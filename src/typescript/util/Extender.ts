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

export interface IExtenderOptions {
	OverwriteValue?: boolean;
	OverwriteObject?: boolean;
}

class Extender {
	public static Force: IExtenderOptions = {
		OverwriteObject: true,
		OverwriteValue: true,
	};
	public static Conservative: IExtenderOptions = {
		OverwriteObject: false,
		OverwriteValue: false
	};
	public static Default: IExtenderOptions = {
		OverwriteObject: false,
		OverwriteValue: true,
	};

	public static extends(...srcObjs: any[]): any;
	public static extends(options: IExtenderOptions, ...srcObjs: any[]): any;
	public static extends(dest: any, ...srcObjs: any[]): any;
	public static extends(options: IExtenderOptions, dest: any, ...srcObjs: any[]): any;

	public static extends(options?: IExtenderOptions | {}, dest: any = {}, ...srcObjs: any[]): any {
		const opt = this.extendSingle(this.Force, options, this.Default);
		for (const obj of srcObjs) {
			Extender.extendSingle(opt, dest, obj);
		}
		return dest;
	}

	private static extendSingle(options: IExtenderOptions, dst: any, src: any): any {
		for (const prop in src) {
			if (typeof src[prop] === "object") {
				if (typeof dst[prop] === "undefined" || options.OverwriteObject) {
					dst[prop] = src[prop];
				}
				Extender.extendSingle(options, src[prop], dst[prop]);
			} else {
				if (typeof dst[prop] === "undefined" || options.OverwriteValue) {
					dst[prop] = src[prop];
				}
			}
		}
		return dst;
	}
}
export default Extender;
