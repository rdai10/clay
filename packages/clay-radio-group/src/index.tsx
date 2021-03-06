/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

import classNames from 'classnames';
import Radio, {IRadioProps} from './Radio';
import React from 'react';

interface IGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactElement<IRadioProps>[];

	/**
	 * Flag to indicate if radio elements should display inline.
	 */
	inline?: boolean;

	/**
	 * Form element `name` that is applied to each radio element.
	 */
	name?: string;

	/**
	 * Callback function for whenever a radio element is selected.
	 */
	onSelectedValueChange: (val: React.ReactText) => void;

	/**
	 * The value that corresponds to the selected radio element. Leave
	 * undefined if no option is selected.
	 */
	selectedValue?: React.ReactText;
}

const ClayRadioGroup: React.FunctionComponent<IGroupProps> & {
	Radio: typeof Radio;
} = ({
	children,
	className,
	inline,
	name,
	onSelectedValueChange,
	selectedValue,
	...otherProps
}: IGroupProps) => {
	return (
		<div {...otherProps} className={classNames(className)}>
			{React.Children.map(
				children,
				(child: React.ReactElement<IRadioProps>, i) => {
					return React.cloneElement(child, {
						...child.props,
						checked: selectedValue === child.props.value,
						inline,
						key: i,
						name,
						onChange: () =>
							onSelectedValueChange(child.props.value),
					});
				}
			)}
		</div>
	);
};

ClayRadioGroup.Radio = Radio;

export default ClayRadioGroup;
