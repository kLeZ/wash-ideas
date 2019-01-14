// Copyright (C) 2019 Alessandro Accardo a.k.a. kLeZ & Fabio Scotto di Santolo a.k.a. Plague
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

import * as React from "react";

interface IRatingProps {
	disabled: boolean;
	rating: number;
	count?: number;
}

interface IRatingState {
	count: number;
	rating: number;
	temp_rating: number;
}

class Rating extends React.Component<IRatingProps, IRatingState> {
	constructor(props: IRatingProps) {
		super(props);
		this.state = {
			count: this.props.count || 5,
			rating: this.props.rating || null,
			temp_rating: null,
		};
	}

	public render() {
		const stars = [];

		for (let i = 0; i < this.state.count; i++) {
			stars.push(this.getStar(this.props.disabled, i, this.getClassName(i)));
		}
		return <div className="star-rating">{stars}</div>;
	}

	public rate(rating: number): void {
		this.setState({
			rating,
			temp_rating: rating,
		});
	}

	private getClassName(value: number): string {
		let className = "star-rating__star";
		if (this.state.rating >= value && this.state.rating != null) {
			className += " is-selected";
		}
		if (this.props.disabled === true) {
			className += " is-disabled";
		}
		return className;
	}

	private getStar(disabled: boolean, key: number, className: string) {
		if (disabled === true) {
			return this.getDisabledStar(key, className);
		} else {
			return this.getEnabledStar(key, className);
		}
	}

	private getDisabledStar(key: number, className: string) {
		return (
			<label key={key} className={className}>
				★
			</label>
		);
	}

	private getEnabledStar(key: number, className: string) {
		return (
			<label
				key={key}
				className={className}
				onClick={this.rate.bind(this, key)}
				onMouseOver={this.starOver.bind(this, key)}
				onMouseOut={this.starOut.bind(this)}
			>
				★
			</label>
		);
	}

	private starOver(rating: number): void {
		const tempRating = this.state.rating;
		this.setState({
			rating,
			temp_rating: tempRating,
		});
	}

	private starOut() {
		this.setState({
			rating: this.state.temp_rating,
		});
	}
}
export default Rating;
